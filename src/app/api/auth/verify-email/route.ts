import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { createWelcomeCoupon, generateJWT } from '@/lib/auth'
import { sendWelcomeEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { email, code } = await request.json()

    if (!email || !code) {
      return NextResponse.json({ error: 'Missing email or verification code' }, { status: 400 })
    }

    // Find user with verification code
    const { data: user, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('verification_code', code)
      .single()

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid verification code' }, { status: 400 })
    }

    // Check if verification code is expired
    const now = new Date()
    const expiresAt = new Date(user.verification_expires)
    
    if (now > expiresAt) {
      return NextResponse.json({ error: 'Verification code has expired' }, { status: 400 })
    }

    // Check if already verified
    if (user.email_verified) {
      return NextResponse.json({ error: 'Email already verified' }, { status: 400 })
    }

    // Update user as verified
    const { error: updateError } = await supabaseAdmin
      .from('users')
      .update({
        email_verified: true,
        verification_code: null,
        verification_expires: null
      })
      .eq('id', user.id)

    if (updateError) {
      console.error('Error updating user verification status:', updateError)
      return NextResponse.json({ error: 'Failed to verify email' }, { status: 500 })
    }

    // Create welcome coupon
    const couponCode = await createWelcomeCoupon(user.id)

    // Generate JWT token
    const token = generateJWT(user.id)

    // Send welcome email
    const emailResult = await sendWelcomeEmail(user.email, user.name, couponCode, request.url)
    
    if (!emailResult.success) {
      console.error('Failed to send welcome email:', emailResult.error)
      // Don't fail verification if welcome email fails
    }

    const response = NextResponse.json({
      message: 'Email verified successfully',
      user: { id: user.id, email: user.email, name: user.name },
      couponCode,
      emailSent: emailResult.success
    })

    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 // 7 days
    })

    return response
  } catch (error) {
    console.error('Email verification error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
