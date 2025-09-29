import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // 直接查询Supabase数据库的表结构
    const tables = ['users', 'coupons', 'travel_packages', 'orders']
    const tableInfo: any = {}

    for (const tableName of tables) {
      try {
        // 获取表数据样本和结构
        const { data: sampleData, error: dataError } = await supabaseAdmin
          .from(tableName)
          .select('*')
          .limit(5)

        if (dataError) {
          tableInfo[tableName] = {
            error: dataError.message,
            code: dataError.code
          }
        } else {
          // 分析数据结构
          const columns = sampleData && sampleData.length > 0 
            ? Object.keys(sampleData[0]).map(key => ({
                column_name: key,
                sample_value: sampleData[0][key],
                data_type: typeof sampleData[0][key]
              }))
            : []

          // 获取总数
          const { count } = await supabaseAdmin
            .from(tableName)
            .select('*', { count: 'exact', head: true })

          tableInfo[tableName] = {
            columns: columns,
            sampleData: sampleData,
            totalCount: count || 0
          }
        }
      } catch (error) {
        tableInfo[tableName] = {
          error: error instanceof Error ? error.message : 'Unknown error'
        }
      }
    }

    return NextResponse.json({
      message: 'Supabase数据库表结构检查完成',
      tables: tableInfo,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Database schema check error:', error)
    return NextResponse.json({ 
      error: 'Internal server error',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
