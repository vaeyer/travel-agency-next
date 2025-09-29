# EdgeOne Pages 方案1：Functions 目录结构

## 🎯 解决方案概述

通过创建 `functions` 目录结构，将 API 路由转换为 EdgeOne Pages 的 Edge Functions 格式。

## 📁 目录结构

```
functions/
├── api/
│   ├── alipay/
│   │   └── create-order.js
│   ├── auth/
│   │   ├── login.js
│   │   └── register.js
│   └── user/
│       └── coupons.js
```

## 🔧 函数格式

### 基本结构
```javascript
// functions/api/alipay/create-order.js
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    
    // 处理 POST 请求
    const data = await request.json();
    
    // 业务逻辑
    const result = { success: true, data: data };
    
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
    
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

// 处理 CORS 预检请求
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
```

### 支持的 HTTP 方法
- `onRequestGet` - GET 请求
- `onRequestPost` - POST 请求
- `onRequestPut` - PUT 请求
- `onRequestDelete` - DELETE 请求
- `onRequestOptions` - OPTIONS 请求（CORS 预检）

## 📋 已实现的 API 路由

### 1. 支付宝创建订单
- **路径**: `functions/api/alipay/create-order.js`
- **URL**: `/api/alipay/create-order`
- **方法**: POST
- **功能**: 创建支付宝订单，返回支付URL

### 2. 用户登录
- **路径**: `functions/api/auth/login.js`
- **URL**: `/api/auth/login`
- **方法**: POST
- **功能**: 用户登录验证

### 3. 用户注册
- **路径**: `functions/api/auth/register.js`
- **URL**: `/api/auth/register`
- **方法**: POST
- **功能**: 用户注册，生成欢迎优惠券

### 4. 用户优惠券
- **路径**: `functions/api/user/coupons.js`
- **URL**: `/api/user/coupons`
- **方法**: GET
- **功能**: 获取用户优惠券列表

## 🚀 部署步骤

1. **保存所有文件**
   - 确保 `functions` 目录结构完整
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
POST /api/alipay/create-order
Content-Type: application/json
{
  "packageId": "1",
  "couponCode": "WELCOME2024"
}

# 用户登录
POST /api/auth/login
Content-Type: application/json
{
  "email": "test@example.com",
  "password": "password123"
}

# 用户注册
POST /api/auth/register
Content-Type: application/json
{
  "email": "newuser@example.com",
  "password": "password123",
  "name": "New User"
}

# 获取优惠券
GET /api/user/coupons
```

### 预期响应
```json
{
  "success": true,
  "data": {
    "orderId": "ORDER_1234567890_abc123",
    "paymentUrl": "https://openapi.alipaydev.com/gateway.do?...",
    "amount": 194900,
    "originalPrice": 199900,
    "discount": 5000,
    "paymentMethod": "alipay"
  }
}
```

## ⚠️ 注意事项

1. **文件命名**: 函数文件必须使用 `.js` 扩展名
2. **目录结构**: 目录结构直接映射到 URL 路径
3. **CORS 支持**: 所有函数都包含 CORS 支持
4. **错误处理**: 统一的错误处理格式
5. **环境变量**: 通过 `context.env` 访问环境变量

## 🔧 故障排除

### 问题 1: 仍然返回 404
**可能原因**: 文件路径或命名错误
**解决方案**: 检查 `functions` 目录结构是否正确

### 问题 2: CORS 错误
**可能原因**: 缺少 CORS 头部
**解决方案**: 确保包含 `onRequestOptions` 函数

### 问题 3: 环境变量访问失败
**可能原因**: 环境变量未配置
**解决方案**: 在 EdgeOne Pages 控制台配置环境变量

## 📞 支持

如果按照此方案配置后仍有问题：
1. 检查 EdgeOne Pages 构建日志
2. 验证 `functions` 目录结构
3. 确认函数文件语法正确
4. 联系技术支持团队

---

**重要**: 此方案通过创建标准的 Functions 目录结构来解决 404 问题，确保 EdgeOne Pages 能正确识别和处理所有 API 端点。
