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

    const { orderId } = await request.json()

    if (!orderId) {
      return NextResponse.json({ error: 'Order ID is required' }, { status: 400 })
    }

    // 更新订单状态为已支付
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update({ 
        payment_status: 'paid',
        updated_at: new Date().toISOString()
      })
      .eq('id', orderId)
      .eq('user_id', payload.userId)
      .select()
      .single()

    if (error) {
      console.error('Update order error:', error)
      return NextResponse.json({ error: 'Failed to update order' }, { status: 500 })
    }

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Payment completed successfully',
      order: {
        id: order.id,
        package_name: order.package_name,
        final_price: order.final_price,
        payment_status: order.payment_status
      }
    })

  } catch (error) {
    console.error('Simulate payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}