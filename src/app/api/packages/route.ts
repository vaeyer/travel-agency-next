import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // 获取所有活跃的旅行套餐
    const { data: packages, error } = await supabaseAdmin
      .from('travel_packages')
      .select('*')
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Supabase error fetching packages:', error)
      return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
    }

    return NextResponse.json({ packages })

  } catch (error) {
    console.error('Get packages error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { id, name, price, description, image } = await request.json()

    if (!id || !name || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 创建或更新旅行套餐
    const { data: packageData, error } = await supabaseAdmin
      .from('travel_packages')
      .upsert({
        id,
        name,
        price,
        description,
        image,
        is_active: true
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase error creating package:', error)
      return NextResponse.json({ error: 'Failed to create package' }, { status: 500 })
    }

    return NextResponse.json({ package: packageData })

  } catch (error) {
    console.error('Create package error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
