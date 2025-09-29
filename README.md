# Travel Agency - 旅行社网站

一个现代化的旅行社网站，支持多种支付方式和用户管理功能。

## 🚀 功能特性

- **用户系统**: 注册、登录、JWT 认证
- **套餐展示**: 精美的旅行套餐展示页面
- **支付系统**: 支持支付宝、PayPal 支付
- **优惠券系统**: 用户注册自动获得欢迎优惠券
- **响应式设计**: 支持移动端和桌面端
- **沙箱支付**: 内置支付模拟功能

## 🛠️ 技术栈

- **前端**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **后端**: EdgeOne Pages Functions
- **数据库**: Supabase
- **支付**: 支付宝、PayPal (沙箱模式)
- **部署**: EdgeOne Pages

## 📁 项目结构

```
travel-agency/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API 路由 (保留用于本地开发)
│   │   ├── login/             # 登录页面
│   │   ├── register/          # 注册页面
│   │   ├── purchase/          # 购买页面
│   │   ├── payment/           # 支付页面
│   │   └── payment/success/   # 支付成功页面
│   ├── components/            # 可复用组件
│   ├── lib/                   # 工具库
│   └── types/                 # TypeScript 类型定义
├── functions/                 # EdgeOne Pages Functions
│   └── api/                   # API 函数
├── public/                    # 静态资源
├── database/                  # 数据库脚本
└── docs/                      # 文档
```

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone https://github.com/vaeyer/travel-agency-next.git
cd travel-agency-next
```

### 2. 安装依赖

```bash
npm install
```

### 3. 环境配置

复制 `env.template` 文件并配置环境变量：

```bash
cp env.template .env.local
```

### 4. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 🌐 部署到 EdgeOne Pages

### 1. 准备环境变量

在 EdgeOne Pages 控制台配置以下环境变量：

```bash
# Supabase 配置
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# JWT 密钥
JWT_SECRET=your-jwt-secret

# 业务配置
BASE_PRICE=199900
PACKAGE_NAME=Travel Package
```

### 2. 部署步骤

1. 推送代码到 GitHub
2. 在 EdgeOne Pages 控制台创建项目
3. 连接 GitHub 仓库
4. 配置环境变量
5. 部署项目

详细部署指南请参考 [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)

## 🔧 配置说明

### 环境变量

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `BASE_PRICE` | 基础价格（分） | 199900 |
| `COUPON_DISCOUNT` | 优惠券折扣（分） | 5000 |
| `PACKAGE_NAME` | 套餐名称 | Travel Package |
| `WELCOME_COUPON_AMOUNT` | 欢迎优惠券金额 | 199900 |
| `SAVE_COUPON_AMOUNT` | 节省优惠券金额 | 5000 |

### 支付配置

项目支持以下支付方式：

- **支付宝**: 沙箱模式，模拟支付流程
- **PayPal**: 沙箱模式，模拟支付流程

所有支付都使用内部模拟页面，不会产生真实扣款。

## 📱 页面说明

### 首页 (`/`)
- 网站介绍和套餐展示
- 响应式设计，支持移动端

### 登录页面 (`/login`)
- 用户登录功能
- JWT 认证

### 注册页面 (`/register`)
- 用户注册功能
- 自动生成欢迎优惠券

### 购买页面 (`/purchase`)
- 套餐选择和价格展示
- 优惠券使用
- 支付方式选择

### 支付页面 (`/payment`)
- 模拟支付流程
- 订单信息确认
- 支付状态处理

### 支付成功页面 (`/payment/success`)
- 支付成功确认
- 订单详情展示
- 后续操作指引

## 🔒 安全特性

- JWT 认证和授权
- 环境变量保护敏感信息
- CORS 配置
- 输入验证和错误处理

## 🧪 测试

### 本地测试

```bash
# 构建项目
npm run build

# 启动生产服务器
npm start
```

### 支付测试

1. 访问 `/purchase` 页面
2. 选择套餐和优惠券
3. 选择支付方式
4. 完成模拟支付流程

## 📚 文档

- [部署指南](./DEPLOYMENT_GUIDE.md)
- [环境变量配置](./ENVIRONMENT_VARIABLES.md)
- [支付解决方案](./PAYMENT_SOLUTION.md)
- [EdgeOne Pages 配置](./EDGEONE_SOLUTION_1.md)

## 🤝 贡献

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 📞 支持

如有问题，请：

1. 查看 [常见问题](./FAQ.md)
2. 提交 [Issue](https://github.com/vaeyer/travel-agency-next/issues)
3. 联系技术支持

---

**注意**: 这是一个演示项目，所有支付功能都使用沙箱模式，不会产生真实扣款。