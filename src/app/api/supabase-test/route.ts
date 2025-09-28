import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
  try {
    // 检查环境变量
    const envCheck = {
      NEXT_PUBLIC_SUPABASE_URL: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      SUPABASE_SERVICE_ROLE_KEY: !!process.env.SUPABASE_SERVICE_ROLE_KEY,
      JWT_SECRET: !!process.env.JWT_SECRET,
      NODE_ENV: process.env.NODE_ENV,
      SUPABASE_URL_LAST_10: process.env.NEXT_PUBLIC_SUPABASE_URL?.slice(-10),
      ANON_KEY_LAST_10: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.slice(-10),
      SERVICE_KEY_LAST_10: process.env.SUPABASE_SERVICE_ROLE_KEY?.slice(-10)
    }

    // 使用环境变量或硬编码的凭据
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ushkxsxbnuurusvrfqvc.supabase.co'
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGt4c3hibnV1cnVzdnJmcXZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA2MzE5OCwiZXhwIjoyMDc0NjM5MTk4fQ.vgaBY4ri9ZY_Osa_mJeGFm7u0LZYqFJBdRI7kyWVsBQ'

    // Create a direct connection
    const supabase = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    // Test connection with a simple query
    const { data, error } = await supabase
      .from('information_schema.tables')
      .select('table_name')
      .eq('table_schema', 'public')
      .limit(5)

    return NextResponse.json({
      message: 'Test API working',
      environment: envCheck,
      databaseConnection: error ? {
        error: error.message,
        code: error.code,
        details: error.details
      } : {
        success: true,
        tablesFound: data?.length || 0,
        tables: data?.map(t => t.table_name) || []
      },
      timestamp: new Date().toISOString(),
      buildVersion: 'v2-env-fix'
    })

  } catch (error) {
    return NextResponse.json({
      error: 'Test failed',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}