import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { supabaseAdmin } from './supabase'

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12)
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword)
}

export function generateJWT(userId: string): string {
  return jwt.sign({ userId }, process.env.JWT_SECRET!, { expiresIn: '7d' })
}

export function verifyJWT(token: string): { userId: string } | null {
  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as { userId: string }
  } catch {
    return null
  }
}

export async function createWelcomeCoupon(userId: string): Promise<string> {
  const couponCode = `WELCOME${Date.now()}`

  const { error } = await supabaseAdmin
    .from('coupons')
    .insert({
      user_id: userId,
      amount: 199900, // ¥1999
      code: couponCode,
      used: false
    })

  if (error) {
    throw new Error('Failed to create welcome coupon')
  }

  return couponCode
}