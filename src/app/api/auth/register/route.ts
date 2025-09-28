import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { hashPassword, createWelcomeCoupon, generateJWT } from '@/lib/auth'

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

    const { email, password, name } = await request.json()

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Check if user already exists
    const { data: existingUser } = await supabaseAdmin
      .from('users')
      .select('id')
      .eq('email', email)
      .single()

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 })
    }

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        name,
        password_hash: passwordHash
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating user:', error)
      return NextResponse.json({
        error: 'Failed to create user',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      }, { status: 500 })
    }

    // Create welcome coupon
    const couponCode = await createWelcomeCoupon(user.id)

    // Generate JWT token
    const token = generateJWT(user.id)

    const response = NextResponse.json({
      message: 'User created successfully',
      user: { id: user.id, email: user.email, name: user.name },
      couponCode
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}