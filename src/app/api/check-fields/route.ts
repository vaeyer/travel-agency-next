import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
  try {
    // 查询所有表的字段信息
    const tables = ['users', 'coupons', 'travel_packages', 'orders']
    const results: any = {}

    for (const tableName of tables) {
      try {
        // 获取表的前1条数据来分析字段结构
        const { data, error } = await supabaseAdmin
          .from(tableName)
          .select('*')
          .limit(1)

        if (error) {
          results[tableName] = { error: error.message }
        } else if (data && data.length > 0) {
          // 分析字段
          const fields = Object.keys(data[0]).map(field => ({
            fieldName: field,
            sampleValue: data[0][field],
            dataType: typeof data[0][field]
          }))
          
          results[tableName] = {
            fields: fields,
            totalFields: fields.length
          }
        } else {
          results[tableName] = { message: 'Table is empty' }
        }
      } catch (err) {
        results[tableName] = { error: err instanceof Error ? err.message : 'Unknown error' }
      }
    }

    return NextResponse.json({
      message: 'Supabase数据库字段检查完成',
      database: results,
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    return NextResponse.json({ 
      error: 'Failed to check database',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}




