# EdgeOne Pages 部署指南

## 🎯 当前状态
✅ 项目已成功构建并提交到 Git
✅ 所有配置文件已准备就绪
✅ 准备部署到 EdgeOne Pages

## 🚀 部署选项

### 选项 1：通过 Git 仓库部署（推荐）

1. **推送到远程仓库**
   ```bash
   # 如果您有 GitHub/GitLab 账户，创建新仓库然后：
   git remote add origin https://github.com/yourusername/travel-agency.git
   git branch -M main
   git push -u origin main
   ```

2. **在 EdgeOne Pages 控制台**
   - 访问：https://console.cloud.tencent.com/edgeone/pages
   - 点击"新建项目"
   - 选择"从 Git 仓库导入"
   - 连接您的 GitHub/GitLab 账户
   - 选择 travel-agency 仓库

### 选项 2：直接上传部署

1. **创建部署包**
   - 压缩整个 `travel-agency` 文件夹为 ZIP 文件
   - 确保包含所有文件（特别是 `.next` 构建目录）

2. **上传到 EdgeOne Pages**
   - 在控制台选择"直接上传"
   - 上传 ZIP 文件

## ⚙️ EdgeOne Pages 配置

### 构建设置
```
框架预设: Next.js
构建命令: npm run build
输出目录: .next
安装命令: npm install
Node.js 版本: 18.x
根目录: /
```

### 环境变量（必须配置）
```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_iFIZACtvZ1Wdltw1vDJuvg_7kK6J6_t
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# 微信支付配置
WECHAT_APP_ID=your_wechat_app_id
WECHAT_MCH_ID=your_merchant_id
WECHAT_PAY_KEY=your_wechat_pay_key
WECHAT_NOTIFY_URL=https://yourdomain.edgeone.com/api/wechat/notify

# JWT 密钥
JWT_SECRET=your-super-secret-jwt-key-for-production

# 环境
NODE_ENV=production
```

## 📋 部署前检查清单

- [ ] 微信支付二维码已放置在 `public/pic/123.jpg`
- [ ] Supabase 项目已创建
- [ ] 已在 Supabase 中执行数据库脚本（`src/lib/database.sql`）
- [ ] 准备好所有环境变量的真实值
- [ ] 选择了部署方式（Git 或直接上传）

## 🔧 Supabase 数据库设置

1. **登录 Supabase 控制台**
   - 访问：https://supabase.com
   - 创建新项目或选择现有项目

2. **执行数据库脚本**
   - 进入 SQL 编辑器
   - 复制 `src/lib/database.sql` 中的内容
   - 执行脚本创建表和索引

3. **获取连接信息**
   - 项目 URL：在项目设置中找到
   - Anon Key：在 API 设置中找到
   - Service Role Key：在 API 设置中找到

## 🎉 部署后验证

部署完成后，请测试以下功能：

1. **首页访问** - 确保页面正常加载
2. **用户注册** - 测试注册流程和优惠券生成
3. **用户登录** - 验证登录功能
4. **购买页面** - 测试套餐选择和二维码显示
5. **API 接口** - 确保所有 API 路由正常工作

## 🔍 常见问题排查

### 构建失败
- 检查 Node.js 版本是否为 18.x
- 确认所有依赖都已正确安装
- 检查构建日志中的错误信息

### 环境变量问题
- 确保所有必需的环境变量都已配置
- 检查变量名称拼写是否正确
- 确认 Supabase 连接信息正确

### 数据库连接问题
- 验证 Supabase URL 和密钥
- 确认数据库表已创建
- 检查网络连接

## 📞 支持

如果遇到问题，请检查：
1. EdgeOne Pages 控制台的构建日志
2. 浏览器开发者工具的控制台错误
3. 网络请求是否成功

---

**项目已准备就绪，选择您喜欢的部署方式开始部署！** 🚀