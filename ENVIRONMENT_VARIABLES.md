# EdgeOne Pages 环境变量配置指南

## 🔐 必需的环境变量

在 EdgeOne Pages 控制台中，您需要配置以下环境变量：

### Supabase 配置
```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

### 认证配置
```bash
JWT_SECRET=your-super-secret-jwt-key-for-production
```

### 环境配置
```bash
NODE_ENV=production
```

## 📋 配置步骤

1. **登录 EdgeOne Pages 控制台**
   - 访问：https://console.cloud.tencent.com/edgeone/pages
   - 选择您的项目

2. **进入环境变量设置**
   - 点击项目设置
   - 找到"环境变量"或"Environment Variables"选项

3. **添加环境变量**
   - 点击"添加环境变量"
   - 逐个添加上述所有环境变量
   - 确保变量名称和值都正确

4. **保存并重新部署**
   - 保存所有环境变量
   - 触发重新部署以应用新配置

## ⚠️ 安全注意事项

- **不要**在代码中硬编码敏感信息
- **不要**将环境变量提交到 Git 仓库
- **确保**JWT_SECRET 使用强密码
- **定期**轮换敏感密钥

## 🔍 验证配置

部署后，您可以通过以下方式验证环境变量是否正确配置：

1. 访问 `/api/supabase-test` 端点
2. 检查浏览器开发者工具的网络请求
3. 查看 EdgeOne Pages 的构建日志

## 📞 故障排除

如果遇到环境变量相关错误：

1. 检查变量名称拼写
2. 确认所有必需变量都已配置
3. 验证 Supabase 连接信息
4. 检查 EdgeOne Pages 控制台的错误日志
