// EdgeOne Pages Function for Alipay Create Order
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 获取请求体
    const { packageId, couponCode } = await request.json();
    
    // 模拟订单创建逻辑
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 模拟价格计算
    const basePrice = 199900; // ¥1999 in cents
    const discount = couponCode ? 5000 : 0; // ¥50 discount if coupon provided
    const finalPrice = Math.max(0, basePrice - discount);
    
    // 模拟支付宝支付URL
    const paymentUrl = `https://openapi.alipaydev.com/gateway.do?app_id=sandbox&method=alipay.trade.page.pay&charset=utf-8&sign_type=RSA2&timestamp=${new Date().toISOString().replace('T', ' ').substring(0, 19)}&version=1.0&notify_url=${encodeURIComponent(env.ALIPAY_NOTIFY_URL || 'https://yourdomain.com/api/alipay/notify')}&return_url=${encodeURIComponent(env.ALIPAY_RETURN_URL || 'https://yourdomain.com/payment/success')}&biz_content=${encodeURIComponent(JSON.stringify({
      out_trade_no: orderId,
      total_amount: (finalPrice / 100).toFixed(2),
      subject: `旅行套餐 - 北美套餐`,
      product_code: 'FAST_INSTANT_TRADE_PAY'
    }))}&sign=sandbox_sign`;
    
    return new Response(JSON.stringify({
      orderId,
      paymentUrl,
      amount: finalPrice,
      originalPrice: basePrice,
      discount: discount,
      paymentMethod: 'alipay'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
    });
    
  } catch (error) {
    console.error('Alipay create order error:', error);
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
    });
  }
}

// 处理 OPTIONS 请求（CORS 预检）
export async function onRequestOptions(context) {
  return new Response(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
