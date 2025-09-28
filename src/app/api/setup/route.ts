import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(request: NextRequest) {
  try {
    // 检查是否已经有用户表
    const { data: existingTable, error: checkError } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    if (!checkError) {
      return NextResponse.json({
        message: 'Database already initialized',
        status: 'success'
      })
    }

    // 创建用户表
    const { error: createUsersError } = await supabaseAdmin.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS users (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          name VARCHAR(255) NOT NULL,
          password_hash VARCHAR(255) NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    })

    if (createUsersError) {
      console.error('Error creating users table:', createUsersError)
    }

    // 创建优惠券表
    const { error: createCouponsError } = await supabaseAdmin.rpc('exec', {
      sql: `
        CREATE TABLE IF NOT EXISTS coupons (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          user_id UUID REFERENCES users(id) ON DELETE CASCADE,
          code VARCHAR(50) UNIQUE NOT NULL,
          discount_amount DECIMAL(10,2) NOT NULL,
          is_used BOOLEAN DEFAULT FALSE,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          used_at TIMESTAMP WITH TIME ZONE,
          expires_at TIMESTAMP WITH TIME ZONE
        );
      `
    })

    if (createCouponsError) {
      console.error('Error creating coupons table:', createCouponsError)
    }

    return NextResponse.json({
      message: 'Database setup attempted',
      usersTableError: createUsersError?.message,
      couponsTableError: createCouponsError?.message,
      status: 'completed'
    })

  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json({
      error: 'Setup failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}