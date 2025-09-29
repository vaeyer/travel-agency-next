import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyPassword, generateJWT } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check if environment variables are set
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
      console.error('Missing Supabase environment variables')
      return NextResponse.json({
        error: 'Server configuration error',
        details: 'Missing database configuration'
      }, { status: 500 })
    }

    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing email or password' }, { status: 400 })
    }

    // Find user by email
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('id, email, name, password_hash')
      .eq('email', email)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Verify password
    const isValidPassword = await verifyPassword(password, user.password_hash)

    if (!isValidPassword) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 })
    }

    // Generate JWT token
    const token = generateJWT(user.id)

    const response = NextResponse.json({
      message: 'Login successful',
      user: { id: user.id, email: user.email, name: user.name }
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}