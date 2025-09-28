import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { verifyJWT } from '@/lib/auth'

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
        .eq('user_id', payload.userId)
        .eq('used', false)
        .single()

      if (!couponError && coupon) {
        couponDiscount = coupon.amount
        couponId = coupon.id
      }
    }

    const finalPrice = Math.max(0, packageData.price - couponDiscount)

    // Create order in database
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    const { data: order, error: orderError } = await supabaseAdmin
      .from('orders')
      .insert({
        id: orderId,
        user_id: payload.userId,
        package_id: packageId,
        package_name: packageData.name,
        original_price: packageData.price,
        coupon_discount: couponDiscount,
        final_price: finalPrice,
        payment_status: 'pending'
      })
      .select()
      .single()

    if (orderError) {
      return NextResponse.json({ error: 'Failed to create order' }, { status: 500 })
    }

    // PayPal沙箱模拟模式
    console.log('PayPal沙箱模拟模式 - 创建订单:', {
      orderId,
      packageName: packageData.name,
      originalPrice: packageData.price,
      discount: couponDiscount,
      finalPrice: finalPrice
    })

    // 模拟PayPal支付URL（沙箱环境）
    const paymentUrl = `https://www.sandbox.paypal.com/checkoutnow?token=sandbox_token_${orderId}`

    return NextResponse.json({
      orderId,
      paypalOrderId: `sandbox_${orderId}`,
      paymentUrl,
      amount: finalPrice,
      originalPrice: packageData.price,
      discount: couponDiscount,
      paymentMethod: 'paypal'
    })

  } catch (error) {
    console.error('Create PayPal order error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

