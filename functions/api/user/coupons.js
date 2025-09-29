// EdgeOne Pages Function for User Coupons
export async function onRequestGet(context) {
  try {
    const { request, env } = context;
    
    // 模拟获取用户优惠券
    const coupons = [
      {
        id: 'coupon_1',
        code: 'WELCOME2024',
        discount_amount: 199900, // ¥1999 in cents
        is_used: false,
        expires_at: '2024-12-31T23:59:59Z'
      },
      {
        id: 'coupon_2', 
        code: 'SAVE50',
        discount_amount: 5000, // ¥50 in cents
        is_used: false,
        expires_at: '2024-12-31T23:59:59Z'
      }
    ];
    
    return new Response(JSON.stringify({
      success: true,
      coupons: coupons
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
    });
    
  } catch (error) {
    console.error('Get coupons error:', error);
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}
