# EdgeOne Pages 方案2：修改配置支持 API 路由

## 🎯 解决方案概述

通过修改 `edgeone.config.js` 配置文件，将 Next.js API 路由明确映射为 EdgeOne Pages 的 Edge Functions。

## 🔧 配置修改

### 修改前的问题
```javascript
// 函数配置
functions: {
  // API 路由作为 Edge Functions
  'api/**': {
    runtime: 'edge'
  }
}
```

### 修改后的解决方案
```javascript
// 函数配置 - 将 Next.js API 路由映射为 Edge Functions
functions: {
  'api/alipay/create-order': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/alipay/create-order/route.js'
  },
  'api/auth/login': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/auth/login/route.js'
  },
  'api/auth/register': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/auth/register/route.js'
  },
  'api/check-fields': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/check-fields/route.js'
  },
  'api/db-schema': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/db-schema/route.js'
  },
  'api/payment/simulate': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/payment/simulate/route.js'
  },
  'api/paypal/create-order': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/paypal/create-order/route.js'
  },
  'api/setup': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/setup/route.js'
  },
  'api/supabase-test': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/supabase-test/route.js'
  },
  'api/user/coupons': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/user/coupons/route.js'
  },
  'api/wechat/create-order': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/wechat/create-order/route.js'
  },
  'api/wechat/notify': {
    runtime: 'nodejs18.x',
    handler: 'src/app/api/wechat/notify/route.js'
  }
}
```

## 📋 配置说明

### 关键配置项
- **runtime**: `nodejs18.x` - 使用 Node.js 18.x 运行时
- **handler**: 指向构建后的 JavaScript 文件路径
- **路径映射**: 将 API 路由路径映射到对应的处理函数

### 路径映射规则
- `api/alipay/create-order` → `src/app/api/alipay/create-order/route.js`
- `api/auth/login` → `src/app/api/auth/login/route.js`
- 其他路由遵循相同模式

## 🚀 部署步骤

1. **保存配置文件**
   - 确保 `edgeone.config.js` 已更新
   - 提交更改到 Git 仓库

2. **重新部署**
   - 在 EdgeOne Pages 控制台触发重新部署
   - 等待构建完成

3. **验证 API 路由**
   - 测试各个 API 端点
   - 确认不再返回 404 错误

## 🔍 验证方法

### 测试 API 端点
```bash
# 支付宝创建订单
POST https://yourdomain.edgeone.com/api/alipay/create-order

# 用户登录
POST https://yourdomain.edgeone.com/api/auth/login

# 用户注册
POST https://yourdomain.edgeone.com/api/auth/register

# 数据库架构检查
GET https://yourdomain.edgeone.com/api/db-schema

# Supabase 测试
GET https://yourdomain.edgeone.com/api/supabase-test
```

### 预期结果
- 所有 API 端点返回正确的响应
- 不再出现 404 Not Found 错误
- 功能正常工作

## ⚠️ 注意事项

1. **运行时选择**: 使用 `nodejs18.x` 而不是 `edge` 运行时
2. **文件路径**: 确保 handler 路径指向正确的构建文件
3. **环境变量**: 仍需在 EdgeOne Pages 控制台配置必要的环境变量
4. **重新部署**: 配置更改后必须重新部署才能生效

## 🔧 故障排除

### 问题 1: 仍然返回 404
**可能原因**: 路径映射错误
**解决方案**: 检查 handler 路径是否正确

### 问题 2: 运行时错误
**可能原因**: 运行时版本不兼容
**解决方案**: 确认使用 `nodejs18.x` 运行时

### 问题 3: 环境变量问题
**可能原因**: 缺少必要的环境变量
**解决方案**: 在 EdgeOne Pages 控制台配置环境变量

## 📞 支持

如果按照此方案配置后仍有问题：
1. 检查 EdgeOne Pages 构建日志
2. 验证配置文件语法
3. 确认所有 API 路由都已映射
4. 联系技术支持团队

---

**重要**: 此方案通过明确映射每个 API 路由来解决 404 问题，确保 EdgeOne Pages 能正确识别和处理所有 API 端点。
