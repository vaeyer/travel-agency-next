// 环境变量配置示例
// 在 EdgeOne Pages 控制台配置这些变量

module.exports = {
  // ===================
  // 必需配置
  // ===================
  
  // Supabase 数据库配置
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://your-project-id.supabase.co',
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key-here',
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || 'your-service-role-key-here'
  },
  
  // JWT 认证密钥
  jwt: {
    secret: process.env.JWT_SECRET || 'your-super-secret-jwt-key-for-production'
  },
  
  // ===================
  // 业务配置
  // ===================
  
  // 价格配置 (单位：分)
  pricing: {
    basePrice: parseInt(process.env.BASE_PRICE || '199900'),
    couponDiscount: parseInt(process.env.COUPON_DISCOUNT || '5000'),
    packages: {
      package1: parseInt(process.env.NEXT_PUBLIC_PACKAGE_1_PRICE || '199900'),
      package2: parseInt(process.env.NEXT_PUBLIC_PACKAGE_2_PRICE || '299900'),
      package3: parseInt(process.env.NEXT_PUBLIC_PACKAGE_3_PRICE || '399900')
    }
  },
  
  // 套餐配置
  packages: {
    name: process.env.PACKAGE_NAME || 'Travel Package'
  },
  
  // ===================
  // 支付配置
  // ===================
  
  // 支付宝
  alipay: {
    notifyUrl: process.env.ALIPAY_NOTIFY_URL || '/api/alipay/notify',
    returnUrl: process.env.ALIPAY_RETURN_URL || '/payment/success'
  },
  
  // 微信支付
  wechat: {
    appId: process.env.WECHAT_APP_ID || 'your_wechat_app_id',
    mchId: process.env.WECHAT_MCH_ID || 'your_merchant_id',
    payKey: process.env.WECHAT_PAY_KEY || 'your_wechat_pay_key',
    notifyUrl: process.env.WECHAT_NOTIFY_URL || '/api/wechat/notify'
  },
  
  // PayPal
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID || 'your_paypal_client_id',
    clientSecret: process.env.PAYPAL_CLIENT_SECRET || 'your_paypal_client_secret',
    mode: process.env.PAYPAL_MODE || 'sandbox'
  },
  
  // ===================
  // 邮件配置
  // ===================
  
  // SMTP 邮件服务配置
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    user: process.env.SMTP_USER || 'your-email@gmail.com',
    pass: process.env.SMTP_PASS || 'your-app-password'
  },
  
  // 网站配置 (可选，系统会自动从请求中获取)
  site: {
    url: process.env.NEXT_PUBLIC_SITE_URL || '' // 留空让系统自动检测
  }
}
