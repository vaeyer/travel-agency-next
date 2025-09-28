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

    // Update order status to paid
    const { data: order, error } = await supabaseAdmin
      .from('orders')
      .update({
        payment_status: 'paid',
        wechat_order_id: `WX_${Date.now()}_SIMULATED`
      })
      .eq('id', orderId)
      .eq('user_id', payload.userId)
      .select()
      .single()

    if (error || !order) {
      return NextResponse.json({ error: 'Order not found or update failed' }, { status: 404 })
    }

    return NextResponse.json({
      message: 'Payment successful',
      order: {
        id: order.id,
        status: order.payment_status,
        amount: order.final_price
      }
    })

  } catch (error) {
    console.error('Simulate payment error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}