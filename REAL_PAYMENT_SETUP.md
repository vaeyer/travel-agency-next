# 真实支付环境变量配置指南

## 🎯 **支付方式选择**

### **1. 支付宝开放平台（推荐）**
- ✅ 个人开发者可申请
- ✅ 审核通过率高
- ✅ 支持国内用户
- ✅ 费率较低

### **2. PayPal**
- ✅ 国际支付
- ✅ 支持多币种
- ✅ 个人可申请
- ⚠️ 主要面向海外用户

## 🔧 **环境变量配置**

### **支付宝配置**
```bash
# 支付宝开放平台
ALIPAY_APP_ID=your_app_id
ALIPAY_PRIVATE_KEY=your_private_key
ALIPAY_PUBLIC_KEY=alipay_public_key
ALIPAY_NOTIFY_URL=https://yourdomain.com/api/alipay/notify
ALIPAY_RETURN_URL=https://yourdomain.com/payment/success
```

### **PayPal配置**
```bash
# PayPal开发者平台
PAYPAL_CLIENT_ID=your_client_id
PAYPAL_CLIENT_SECRET=your_client_secret
PAYPAL_RETURN_URL=https://yourdomain.com/payment/success
PAYPAL_CANCEL_URL=https://yourdomain.com/payment/cancel
PAYPAL_MODE=sandbox  # 或 live
```

## 📋 **申请步骤**

### **支付宝开放平台**
1. 访问：https://open.alipay.com
2. 注册开发者账号
3. 创建应用
4. 配置应用信息
5. 提交审核
6. 获取密钥和证书

### **PayPal开发者平台**
1. 访问：https://developer.paypal.com
2. 注册PayPal账号
3. 创建应用
4. 获取Client ID和Secret
5. 配置Webhook

## 🚀 **部署配置**

### **EdgeOne Pages环境变量**
在EdgeOne Pages控制台中添加上述环境变量：

1. 登录EdgeOne Pages控制台
2. 选择你的项目
3. 进入"环境变量"设置
4. 添加对应的支付平台环境变量

### **本地开发配置**
创建 `.env.local` 文件：
```bash
# 复制上述环境变量到 .env.local
# 注意：不要提交到Git仓库
```

## 🔒 **安全注意事项**

1. **密钥安全**：
   - 不要将密钥提交到Git仓库
   - 使用环境变量存储敏感信息
   - 定期轮换密钥

2. **HTTPS要求**：
   - 生产环境必须使用HTTPS
   - 支付回调URL必须是HTTPS

3. **Webhook验证**：
   - 验证支付回调的真实性
   - 检查签名和参数

## 📞 **技术支持**

### **支付宝技术支持**
- 官方文档：https://opendocs.alipay.com
- 技术支持：https://cschannel.alipay.com

### **PayPal技术支持**
- 官方文档：https://developer.paypal.com/docs
- 社区支持：https://developer.paypal.com/community

## 🎯 **建议**

1. **国内用户**：优先选择支付宝
2. **国际用户**：选择PayPal
3. **多地区**：可以同时集成两种支付方式
4. **测试环境**：先在沙箱环境测试
5. **生产环境**：确保所有配置正确后再上线
