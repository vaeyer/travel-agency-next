# Travel Agency - 旅行社网站

现代化的旅行社网站，支持多种支付方式和用户管理。

## 🚀 功能特性

- **用户系统**: 注册、登录、JWT 认证
- **套餐展示**: 精美的旅行套餐展示
- **支付系统**: 支持支付宝、PayPal 支付
- **优惠券系统**: 用户注册自动获得优惠券
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
│   │   ├── api/               # API 路由
│   │   ├── login/             # 登录页面
│   │   ├── register/          # 注册页面
│   │   ├── purchase/          # 购买页面
│   │   ├── payment/           # 支付页面
│   │   └── payment/success/   # 支付成功页面
│   ├── components/            # 可复用组件
│   ├── lib/                   # 工具库和配置
│   └── types/                 # TypeScript 类型定义
├── functions/                 # EdgeOne Pages Functions
│   └── api/                   # API 函数
├── public/                    # 静态资源
├── config.example.js          # 配置示例
└── README.md                  # 项目说明
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

参考 `config.example.js` 配置环境变量：

```bash
# 在 EdgeOne Pages 控制台配置以下环境变量
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
JWT_SECRET=your-jwt-secret
BASE_PRICE=199900
PACKAGE_NAME=Travel Package
```

### 4. 本地开发

```bash
npm run dev
```

访问 [http://localhost:3000](http://localhost:3000) 查看网站。

## 🌐 部署到 EdgeOne Pages

### 1. 准备环境变量

在 EdgeOne Pages 控制台配置环境变量，参考 `config.example.js`。

### 2. 部署步骤

1. 推送代码到 GitHub
2. 在 EdgeOne Pages 控制台创建项目
3. 连接 GitHub 仓库
4. 配置环境变量
5. 部署项目

## 🔧 配置说明

### 必需环境变量

| 变量名 | 说明 | 示例 |
|--------|------|------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase 项目 URL | `https://xxx.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase 匿名密钥 | `eyJ...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase 服务角色密钥 | `eyJ...` |
| `JWT_SECRET` | JWT 认证密钥 | `your-secret-key` |

### 业务配置

| 变量名 | 说明 | 默认值 |
|--------|------|--------|
| `BASE_PRICE` | 基础价格（分） | 199900 |
| `COUPON_DISCOUNT` | 优惠券折扣（分） | 5000 |
| `PACKAGE_NAME` | 套餐名称 | Travel Package |
| `NEXT_PUBLIC_PACKAGE_1_PRICE` | 套餐1价格 | 199900 |
| `NEXT_PUBLIC_PACKAGE_2_PRICE` | 套餐2价格 | 299900 |
| `NEXT_PUBLIC_PACKAGE_3_PRICE` | 套餐3价格 | 399900 |

## 📱 页面说明

- **首页** (`/`): 网站介绍和套餐展示
- **登录** (`/login`): 用户登录
- **注册** (`/register`): 用户注册
- **购买** (`/purchase`): 套餐选择和支付
- **支付** (`/payment`): 模拟支付流程
- **支付成功** (`/payment/success`): 支付成功确认

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

- `config.example.js`: 环境变量配置示例
- `src/lib/config.js`: 项目配置文件

## 🤝 贡献

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 打开 Pull Request

## 📄 许可证

本项目采用 MIT 许可证。

## 📞 支持

如有问题，请提交 Issue 或联系技术支持。

---

**注意**: 这是一个演示项目，所有支付功能都使用沙箱模式，不会产生真实扣款。