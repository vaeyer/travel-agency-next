import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // 检查travel_packages表是否有数据
    const { data: packages, error } = await supabaseAdmin
      .from('travel_packages')
      .select('*')
      .limit(10)

    if (error) {
      return NextResponse.json({
        error: 'Database error',
        details: error.message
      }, { status: 500 })
    }

    return NextResponse.json({
      message: 'Travel packages check',
      packages: packages || [],
      count: packages?.length || 0,
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
