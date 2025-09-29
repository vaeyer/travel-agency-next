// 项目配置文件
// 统一管理所有环境变量和配置

const config = {
  // ===================
  // 数据库配置
  // ===================
  
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    anonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY
  },
  
  // ===================
  // 认证配置
  // ===================
  
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'fallback-secret-for-development'
  },
  
  // ===================
  // 业务配置
  // ===================
  
  pricing: {
    basePrice: parseInt(process.env.BASE_PRICE || '199900'),
    couponDiscount: parseInt(process.env.COUPON_DISCOUNT || '5000'),
    packages: {
      package1: parseInt(process.env.NEXT_PUBLIC_PACKAGE_1_PRICE || '199900'),
      package2: parseInt(process.env.NEXT_PUBLIC_PACKAGE_2_PRICE || '299900'),
      package3: parseInt(process.env.NEXT_PUBLIC_PACKAGE_3_PRICE || '399900')
    }
  },
  
  packages: {
    name: process.env.PACKAGE_NAME || 'Travel Package'
  },
  
  // ===================
  // 支付配置
  // ===================
  
  alipay: {
    notifyUrl: process.env.ALIPAY_NOTIFY_URL || '/api/alipay/notify',
    returnUrl: process.env.ALIPAY_RETURN_URL || '/payment/success'
  },
  
  wechat: {
    appId: process.env.WECHAT_APP_ID,
    mchId: process.env.WECHAT_MCH_ID,
    payKey: process.env.WECHAT_PAY_KEY,
    notifyUrl: process.env.WECHAT_NOTIFY_URL || '/api/wechat/notify'
  },
  
  paypal: {
    clientId: process.env.PAYPAL_CLIENT_ID,
    clientSecret: process.env.PAYPAL_CLIENT_SECRET,
    mode: process.env.PAYPAL_MODE || 'sandbox'
  }
}

// 验证必需配置
const requiredConfigs = [
  'supabase.url',
  'supabase.anonKey',
  'auth.jwtSecret'
]

for (const configPath of requiredConfigs) {
  const keys = configPath.split('.')
  let value = config
  for (const key of keys) {
    value = value[key]
  }
  
  if (!value) {
    console.warn(`警告: 缺少必需配置 ${configPath}`)
  }
}

module.exports = config
