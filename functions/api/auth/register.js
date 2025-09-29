// EdgeOne Pages Function for User Registration
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 获取请求体
    const { email, password, name } = await request.json();
    
    // 模拟用户验证
    if (!email || !password || !name) {
      return new Response(JSON.stringify({ 
        error: 'Email, password and name are required' 
      }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      });
    }
    
    // 模拟注册成功
    const userId = `user_${Date.now()}`;
    const token = `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const couponCode = `${env.WELCOME_COUPON_PREFIX || 'WELCOME'}${Date.now()}`;
    
    return new Response(JSON.stringify({
      success: true,
      user: {
        id: userId,
        email: email,
        name: name
      },
      token: token,
      couponCode: couponCode,
      message: 'Registration successful! Welcome coupon generated.'
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
      },
    });
    
  } catch (error) {
    console.error('Registration error:', error);
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
