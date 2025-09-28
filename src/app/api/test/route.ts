import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // Test environment variables
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      JWT_SECRET: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
      // Show partial values to verify they're updated
      SUPABASE_URL_LAST_10: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(-10),
      ANON_KEY_LAST_10: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(-10),
      SERVICE_KEY_LAST_10: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-10)
    }

    // Test database connection
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('count')
      .limit(1)

    return NextResponse.json({
      message: 'Test API working',
      environment: envCheck,
      databaseConnection: error ? { error: error.message } : { success: true },
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}