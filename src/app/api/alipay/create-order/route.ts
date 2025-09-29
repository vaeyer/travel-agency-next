import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyJWT } from '@/lib/auth'
import crypto from 'crypto'

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const payload = verifyJWT(token)
    if (!payload) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 })
    }

    const { packageId, couponCode } = await request.json()

    // Get package details
    const { data: packageData, error: packageError } = await supabaseAdmin
      .from('travel_packages')
      .select('*')
      .eq('id', packageId)
      .single()

    if (packageError || !packageData) {
      return NextResponse.json({ error: 'Package not found' }, { status: 404 })
    }

    let couponDiscount = 0
    let couponId = null

    // Check and validate coupon if provided
    if (couponCode) {
      const { data: coupon, error: couponError } = await supabaseAdmin
        .from('coupons')
        .select('*')
        .eq('code', couponCode)
        .or(`user_id.eq.${payload.userId},user_id.is.null`)
        .eq('is_used', false)
        .single()

      if (!couponError && coupon) {
        couponDiscount = coupon.discount_amount
        couponId = coupon.id
      }
    }

    const finalPrice = Math.max(0, Math.round(parseFloat(packageData.price) * 100) - couponDiscount)

    // Create order in database
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        id: orderId,
        user_id: payload.userId,
        package_id: packageId,
        package_name: packageData.name,
        original_price: Math.round(parseFloat(packageData.price) * 100),
        coupon_discount: couponDiscount,
        final_price: finalPrice,
        payment_status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // Mark coupon as used if applied
    if (couponId) {
      await supabaseAdmin
        .from('coupons')
        .update({ is_used: true, used_at: new Date().toISOString() })
        .eq('id', couponId)
    }

    // 支付宝沙箱模拟模式
    console.log('支付宝沙箱模拟模式 - 创建订单:', {
      orderId,
      packageName: packageData.name,
      originalPrice: packageData.price,
      discount: couponDiscount,
      finalPrice: finalPrice
    })

    // 模拟支付宝支付URL（沙箱环境）
    const paymentUrl = `https://openapi.alipaydev.com/gateway.do?app_id=sandbox&method=alipay.trade.page.pay&charset=utf-8&sign_type=RSA2&timestamp=${new Date().toISOString().replace('T', ' ').substring(0, 19)}&version=1.0&notify_url=${encodeURIComponent(process.env.ALIPAY_NOTIFY_URL || 'https://yourdomain.com/api/alipay/notify')}&return_url=${encodeURIComponent(process.env.ALIPAY_RETURN_URL || 'https://yourdomain.com/payment/success')}&biz_content=${encodeURIComponent(JSON.stringify({
      out_trade_no: orderId,
      total_amount: (finalPrice / 100).toFixed(2),
      subject: `旅行套餐 - ${packageData.name}`,
      product_code: 'FAST_INSTANT_TRADE_PAY'
    }))}&sign=sandbox_sign`

    return NextResponse.json({
      orderId,
      paymentUrl,
      amount: finalPrice,
      originalPrice: packageData.price,
      discount: couponDiscount,
      paymentMethod: 'alipay'
    })

  } catch (error) {
    console.error('Create alipay order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

