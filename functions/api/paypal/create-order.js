// EdgeOne Pages Function for PayPal Create Order
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 获取请求体
    const { packageId, couponCode } = await request.json();
    
    // 模拟订单创建逻辑
    const orderId = `PAYPAL_ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 模拟价格计算
    const basePrice = 199900; // ¥1999 in cents
    const discount = couponCode ? 5000 : 0; // ¥50 discount if coupon provided
    const finalPrice = Math.max(0, basePrice - discount);
    
    // 使用相对路径，让 EdgeOne Pages 自动处理域名
    const paymentUrl = `/payment?orderId=${orderId}&amount=${finalPrice}&packageName=${encodeURIComponent('北美套餐')}`;
    
    return new Response(JSON.stringify({
      orderId,
      paymentUrl,
      amount: finalPrice,
      originalPrice: basePrice,
      discount: discount,
      paymentMethod: 'paypal'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
    });
    
  } catch (error) {
    console.error('PayPal create order error:', error);
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