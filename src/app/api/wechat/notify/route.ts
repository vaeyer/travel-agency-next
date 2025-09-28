import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { parseXML, buildXML, generateSign } from '@/lib/wechat'

export async function POST(request: NextRequest) {
  try {
    const xmlData = await request.text()
    const data = parseXML(xmlData)

    // Verify signature (in real implementation)
    // const sign = generateSign(data)
    // if (sign !== data.sign) {
    //   return new NextResponse(buildXML({ return_code: 'FAIL', return_msg: 'Invalid signature' }))
    // }

    if (data.return_code === 'SUCCESS' && data.result_code === 'SUCCESS') {
      // Update order status
      const { error } = await supabaseAdmin
        .from('orders')
        .update({
          payment_status: 'paid',
          wechat_order_id: data.transaction_id
        })
        .eq('id', data.out_trade_no)

      if (error) {
        console.error('Failed to update order:', error)
        return new NextResponse(
          buildXML({ return_code: 'FAIL', return_msg: 'Database error' }),
          { headers: { 'Content-Type': 'application/xml' } }
        )
      }

      return new NextResponse(
        buildXML({ return_code: 'SUCCESS', return_msg: 'OK' }),
        { headers: { 'Content-Type': 'application/xml' } }
      )
    }

    return new NextResponse(
      buildXML({ return_code: 'FAIL', return_msg: 'Payment failed' }),
      { headers: { 'Content-Type': 'application/xml' } }
    )

  } catch (error) {
    console.error('WeChat notify error:', error)
    return new NextResponse(
      buildXML({ return_code: 'FAIL', return_msg: 'Internal error' }),
      { headers: { 'Content-Type': 'application/xml' } }
    )
  }
}