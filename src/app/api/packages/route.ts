import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET(request: NextRequest) {
  try {
    // 获取所有活跃的旅行套餐
    const { data: packages, error } = await supabaseAdmin
      .from('travel_packages')
      .select('id, name, price, description, image_url, destination, duration_days, included_services')
      .eq('is_active', true)
      .order('price', { ascending: true })

    if (error) {
      console.error('Supabase error fetching packages:', error)
      return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 })
    }

    // 转换数据格式以匹配前端期望的结构
    const formattedPackages = packages.map(pkg => {
      // 根据套餐名称确定正确的图片路径
      let imagePath = pkg.image_url
      
      if (!imagePath) {
        // 如果数据库中没有图片路径，根据套餐名称设置默认路径
        switch (pkg.name) {
          case 'North American':
            imagePath = '/pic/北美.jpeg'
            break
          case 'Romantic Europe':
            imagePath = '/pic/欧洲.jpeg'
            break
          case 'Wild Africa':
            imagePath = '/pic/非洲.jpeg'
            break
          case 'Asian Adventure':
          case 'Tokyo Cherry Blossom':
          case '东京樱花之旅':
            imagePath = '/pic/东京樱花.jpeg'
            break
          case 'Bali Paradise':
          case '巴厘岛度假套餐':
            imagePath = '/pic/巴厘岛.jpeg'
            break
          case 'European Castles':
          case '欧洲古堡探索':
            imagePath = '/pic/欧洲古堡.jpeg'
            break
          default:
            imagePath = '/pic/北美.jpeg' // 默认图片
        }
      } else if (imagePath === '/pic/asia.jpg') {
        // 修复错误的图片路径
        imagePath = '/pic/东京樱花.jpeg'
      }

      return {
        id: pkg.id,
        name: pkg.name,
        price: Math.round(parseFloat(pkg.price) * 100), // 转换为分
        description: pkg.description,
        image: imagePath,
        destination: pkg.destination,
        duration_days: pkg.duration_days,
        included_services: pkg.included_services
      }
    })

    return NextResponse.json({ packages: formattedPackages })

  } catch (error) {
    console.error('Get packages error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, price, description, image_url, destination, duration_days, included_services } = await request.json()

    if (!name || !price) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // 创建或更新旅行套餐
    const { data: packageData, error } = await supabaseAdmin
      .from('travel_packages')
      .insert({
        name,
        price: price / 100, // 转换为元
        description,
        image_url,
        destination,
        duration_days,
        included_services,
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
