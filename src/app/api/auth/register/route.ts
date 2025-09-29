import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { hashPassword, createWelcomeCoupon, generateJWT } from '@/lib/auth'
import { sendVerificationEmail, generateVerificationCode } from '@/lib/email'

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

    // Generate verification code
    const verificationCode = generateVerificationCode()

    // Hash password
    const passwordHash = await hashPassword(password)

    // Create user with unverified status
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .insert({
        email,
        name,
        password_hash: passwordHash,
        email_verified: false,
        verification_code: verificationCode,
        verification_expires: new Date(Date.now() + 10 * 60 * 1000).toISOString() // 10 minutes
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

    // Send verification email
    const emailResult = await sendVerificationEmail(email, verificationCode, name)
    
    if (!emailResult.success) {
      console.error('Failed to send verification email:', emailResult.error)
      // Don't fail registration if email fails, but log the error
    }

    return NextResponse.json({
      message: 'User created successfully. Please check your email for verification.',
      user: { id: user.id, email: user.email, name: user.name },
      emailSent: emailResult.success,
      requiresVerification: true
    })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}