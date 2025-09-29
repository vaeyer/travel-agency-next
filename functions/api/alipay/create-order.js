// EdgeOne Pages Function for Alipay Create Order
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 获取请求体
    const { packageId, couponCode } = await request.json();
    
    // 模拟订单创建逻辑
    const orderId = `ORDER_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    // 从环境变量获取价格配置
    const basePrice = parseInt(env.BASE_PRICE || '199900');
    
    // 优惠券扣减逻辑 - 根据优惠券代码确定扣减金额
    let discount = 0;
    if (couponCode) {
      // 根据优惠券代码确定扣减金额
      if (couponCode.startsWith('WELCOME')) {
        discount = parseInt(env.WELCOME_COUPON_AMOUNT || '199900'); // 新用户优惠券
      } else if (couponCode.startsWith('SAVE')) {
        discount = parseInt(env.SAVE_COUPON_AMOUNT || '5000'); // 普通优惠券
      } else {
        discount = parseInt(env.COUPON_DISCOUNT || '5000'); // 默认优惠券
      }
    }
    
    const finalPrice = Math.max(0, basePrice - discount);
    
    // 从环境变量获取套餐名称
    const packageName = env.PACKAGE_NAME || 'Travel Package';
    
    // 使用相对路径，让 EdgeOne Pages 自动处理域名
    const paymentUrl = `/payment?orderId=${orderId}&amount=${finalPrice}&packageName=${encodeURIComponent(packageName)}`;
    
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
