# EdgeOne Pages 部署指南

## 部署前准备

### 1. 环境变量配置
在EdgeOne Pages控制台中设置以下环境变量：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_iFIZACtvZ1Wdltw1vDJuvg_7kK6J6_t
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# 微信支付配置
WECHAT_APP_ID=your_wechat_app_id
WECHAT_MCH_ID=your_merchant_id
WECHAT_PAY_KEY=your_wechat_pay_key
WECHAT_NOTIFY_URL=/api/wechat/notify

# JWT 密钥
JWT_SECRET=your-super-secret-jwt-key-for-production

# 环境
NODE_ENV=production
```

### 2. 二维码图片准备
确保将微信支付二维码 `123.jpg` 放在 `public/pic/` 目录中。

## 部署步骤

### 方法一：通过 Git 仓库部署（推荐）

1. **创建 Git 仓库**
   ```bash
   cd travel-agency
   git init
   git add .
   git commit -m "Initial commit: Travel agency website"
   ```

2. **推送到远程仓库**
   ```bash
   # 添加远程仓库（GitHub/GitLab等）
   git remote add origin <your-repo-url>
   git branch -M main
   git push -u origin main
   ```

3. **在EdgeOne Pages中配置**
   - 登录 [EdgeOne Pages 控制台](https://console.cloud.tencent.com/edgeone/pages)
   - 点击"新建项目"
   - 选择"从 Git 仓库导入"
   - 连接您的 Git 仓库
   - 选择项目仓库和分支

4. **构建设置**
   ```
   框架预设: Next.js
   构建命令: npm run build
   输出目录: .next
   安装命令: npm install
   Node.js 版本: 18.x
   ```

5. **环境变量配置**
   - 在项目设置中添加上述环境变量
   - 确保所有敏感信息都通过环境变量配置

6. **部署**
   - 点击"部署"
   - 等待构建完成
   - 获取部署域名

### 方法二：直接上传部署

1. **构建项目**
   ```bash
   cd travel-agency
   npm run build
   ```

2. **压缩文件**
   - 压缩整个项目目录为 zip 文件
   - 确保包含 `.next` 目录

3. **上传部署**
   - 在EdgeOne Pages控制台选择"直接上传"
   - 上传压缩文件
   - 配置环境变量
   - 部署

## 部署配置详解

### Next.js 配置 (next.config.js)
```javascript
const nextConfig = {
  output: 'standalone',
  images: {
    unoptimized: true
  },
  poweredByHeader: false
}
```

### EdgeOne 配置 (edgeone.config.js)
- API 路由作为 Edge Functions 运行
- 静态资源缓存配置
- 路由重定向设置

## 部署后配置

### 1. 域名配置
- 在EdgeOne Pages控制台配置自定义域名
- 更新微信支付回调URL
- 配置SSL证书

### 2. 数据库配置
- 在Supabase中执行数据库脚本
- 配置RLS (Row Level Security) 策略
- 测试数据库连接

### 3. 功能测试
- 测试用户注册/登录
- 测试优惠券生成
- 测试支付流程
- 测试API接口

## 常见问题

### 构建失败
- 检查Node.js版本是否为18.x
- 确保所有依赖都在package.json中
- 检查TypeScript类型错误

### 环境变量问题
- 确保所有必需的环境变量都已配置
- 检查变量名拼写是否正确
- 敏感信息不要硬编码在代码中

### API路由问题
- 确保API路由在 `src/app/api/` 目录中
- 检查路由文件命名是否正确
- 验证请求方法和参数

### 数据库连接问题
- 验证Supabase URL和密钥
- 检查网络连接
- 确认数据库表已创建

## 监控和维护

### 1. 日志监控
- 在EdgeOne Pages控制台查看函数日志
- 监控API请求错误
- 设置告警通知

### 2. 性能优化
- 启用CDN加速
- 配置缓存策略
- 优化图片资源

### 3. 安全配置
- 定期更新依赖
- 配置CORS策略
- 启用HTTPS

## 更新部署

### 自动部署
- Git仓库更新会自动触发重新部署
- 可以配置部署钩子

### 手动部署
- 在控制台手动触发重新部署
- 上传新的项目文件

---

🎉 **部署完成后，您的旅行社网站就可以在线访问了！**

记得测试所有功能，确保在生产环境中正常运行。