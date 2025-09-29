# EdgeOne Pages 部署环境变量配置

## 📋 必需环境变量

### 1. 数据库配置 (Supabase)
```bash
# Supabase 项目配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### 2. 认证配置
```bash
# JWT 密钥 (请使用强密码)
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### 3. 邮件服务配置 (SMTP)
```bash
# SMTP 邮件服务配置
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-16-digit-app-password
```

### 4. 网站配置 (可选)
```bash
# 网站域名 (可选，系统会自动从请求中获取)
# NEXT_PUBLIC_SITE_URL=https://your-domain.edgeone.com
```

## 🔧 可选环境变量

### 5. 业务配置
```bash
# 价格配置 (单位：分)
BASE_PRICE=199900
PACKAGE_NAME=Travel Package

# 优惠券配置
WELCOME_COUPON_AMOUNT=199900  # 新用户优惠券金额
SAVE_COUPON_AMOUNT=5000       # 普通优惠券金额
COUPON_DISCOUNT=5000          # 默认优惠券金额

# 前端套餐价格
NEXT_PUBLIC_PACKAGE_1_PRICE=199900
NEXT_PUBLIC_PACKAGE_2_PRICE=299900
NEXT_PUBLIC_PACKAGE_3_PRICE=399900
```

### 6. 支付配置
```bash
# 支付宝
ALIPAY_NOTIFY_URL=/api/alipay/notify
ALIPAY_RETURN_URL=/payment/success

# 微信支付
WECHAT_APP_ID=your_wechat_app_id
WECHAT_MCH_ID=your_merchant_id
WECHAT_PAY_KEY=your_wechat_pay_key
WECHAT_NOTIFY_URL=/api/wechat/notify
WECHAT_SPBILL_CREATE_IP=your-server-ip

# PayPal
PAYPAL_CLIENT_ID=your_paypal_client_id
PAYPAL_CLIENT_SECRET=your_paypal_client_secret
PAYPAL_MODE=sandbox
```

### 7. 图片配置
```bash
# 图片域名配置 (多个域名用逗号分隔)
NEXT_PUBLIC_IMAGE_DOMAINS=your-domain.com,cdn.example.com
```

### 8. 系统配置
```bash
# 环境
NODE_ENV=production
```

## 🚀 部署步骤

### 1. 在 EdgeOne Pages 控制台配置环境变量
1. 登录 EdgeOne Pages 控制台
2. 选择您的项目
3. 进入 "环境变量" 页面
4. 添加上述环境变量

### 2. 必需变量优先级
**必须配置的变量：**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`
- `JWT_SECRET`
- `SMTP_HOST`
- `SMTP_USER`
- `SMTP_PASS`

**可选配置的变量：**
- `NEXT_PUBLIC_SITE_URL` (系统会自动从请求中获取)

### 3. 邮件服务配置说明

#### Gmail 配置
1. 启用两步验证
2. 生成应用专用密码
3. 使用以下配置：
   ```bash
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_SECURE=false
   SMTP_USER=yourname@gmail.com
   SMTP_PASS=your-16-digit-app-password
   ```

#### 其他邮件服务
- **QQ 邮箱**: `smtp.qq.com:587`
- **163 邮箱**: `smtp.163.com:465` (SMTP_SECURE=true)
- **Outlook**: `smtp-mail.outlook.com:587`

### 4. 验证部署
1. 访问网站首页
2. 测试用户注册
3. 检查邮箱验证功能
4. 测试套餐购买流程

## ⚠️ 注意事项

1. **安全性**：
   - 不要在生产环境使用默认值
   - JWT_SECRET 必须使用强密码
   - 定期轮换敏感密钥

2. **邮件服务**：
   - 确保 SMTP 服务支持
   - 检查邮件发送限制
   - 监控邮件发送状态

3. **域名配置**：
   - 系统会自动从请求中获取域名
   - 配置 CORS 策略
   - 检查 SSL 证书

4. **数据库**：
   - 确保 Supabase 项目已正确配置
   - 检查数据库连接
   - 验证表结构

## 🔍 故障排除

### 常见问题
1. **邮件发送失败**：检查 SMTP 配置和网络连接
2. **数据库连接失败**：验证 Supabase 配置
3. **图片加载失败**：检查图片域名配置
4. **支付功能异常**：验证支付服务商配置

### 日志查看
在 EdgeOne Pages 控制台查看：
- 应用日志
- 错误日志
- 性能监控

## 📞 支持

如有问题，请检查：
1. 环境变量配置是否正确
2. 服务商账户状态
3. 网络连接状态
4. 日志错误信息
