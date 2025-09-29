# 数据库表结构说明

## 📊 数据库表概览

项目使用 Supabase PostgreSQL 数据库，包含 **4 个主要表**：

### 1. `users` 表 - 用户信息
```sql
- id (UUID, PRIMARY KEY)
- email (VARCHAR, UNIQUE)
- name (VARCHAR)
- password_hash (VARCHAR)
- email_verified (BOOLEAN)
- verification_code (VARCHAR)
- verification_expires (TIMESTAMP)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**操作状态**: ✅ **完整支持**
- 注册用户
- 邮箱验证
- 登录认证
- 用户信息更新

### 2. `travel_packages` 表 - 旅行套餐
```sql
- id (VARCHAR, PRIMARY KEY)
- name (VARCHAR)
- price (INTEGER) -- 价格以分为单位
- description (TEXT)
- image (VARCHAR)
- is_active (BOOLEAN)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

**操作状态**: ✅ **新增支持**
- 查询活跃套餐
- 创建/更新套餐
- 套餐管理

### 3. `coupons` 表 - 优惠券
```sql
- id (UUID, PRIMARY KEY)
- user_id (UUID, FOREIGN KEY)
- discount_amount (INTEGER) -- 优惠金额以分为单位
- code (VARCHAR)
- is_used (BOOLEAN)
- expires_at (TIMESTAMP)
- created_at (TIMESTAMP)
- used_at (TIMESTAMP)
```

**操作状态**: ✅ **完整支持**
- 创建优惠券
- 查询用户优惠券
- 验证优惠券
- 标记优惠券已使用

### 4. `orders` 表 - 订单
```sql
- id (VARCHAR, PRIMARY KEY)
- user_id (UUID, FOREIGN KEY)
- package_id (VARCHAR, FOREIGN KEY)
- package_name (VARCHAR)
- original_price (INTEGER)
- coupon_discount (INTEGER)
- final_price (INTEGER)
- payment_status (VARCHAR)
- payment_method (VARCHAR)
- alipay_order_id (VARCHAR)
- paypal_order_id (VARCHAR)
- wechat_order_id (VARCHAR)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
- paid_at (TIMESTAMP)
```

**操作状态**: ✅ **完整支持**
- 创建订单
- 更新支付状态
- 查询用户订单
- 订单管理

## 🔧 代码中的数据库操作

### Next.js API Routes (完整数据库支持)
- ✅ `src/app/api/auth/register/route.ts` - 用户注册
- ✅ `src/app/api/auth/login/route.ts` - 用户登录
- ✅ `src/app/api/auth/verify-email/route.ts` - 邮箱验证
- ✅ `src/app/api/user/coupons/route.ts` - 优惠券管理
- ✅ `src/app/api/packages/route.ts` - 套餐管理 (新增)
- ✅ `src/app/api/alipay/create-order/route.ts` - 支付宝订单
- ✅ `src/app/api/paypal/create-order/route.ts` - PayPal订单
- ✅ `src/app/api/wechat/create-order/route.ts` - 微信支付订单

### EdgeOne Pages Functions (模拟数据)
- ⚠️ `functions/api/user/coupons.js` - 模拟优惠券数据
- ⚠️ `functions/api/alipay/create-order.js` - 模拟订单创建
- ⚠️ `functions/api/paypal/create-order.js` - 模拟订单创建
- ⚠️ `functions/api/auth/login.js` - 模拟登录
- ⚠️ `functions/api/auth/register.js` - 模拟注册

## 🚨 主要问题

### 1. EdgeOne Pages Functions 没有数据库连接
**问题**: EdgeOne Pages Functions 使用硬编码的模拟数据，没有连接 Supabase 数据库。

**影响**: 
- 优惠券扣减金额不一致
- 订单数据不持久化
- 用户认证状态不同步

**解决方案**: 
- 在 EdgeOne Pages 环境变量中配置 Supabase 连接
- 或使用 Next.js API Routes 替代 EdgeOne Pages Functions

### 2. 字段名称不一致
**问题**: 代码中混用了不同的字段名称。

**已修复**:
- `coupons.amount` → `coupons.discount_amount`
- `coupons.used` → `coupons.is_used`

### 3. 缺少 travel_packages 表的数据操作
**问题**: 前端使用硬编码的套餐数据，没有从数据库查询。

**已修复**: 新增 `src/app/api/packages/route.ts` API

## 📋 部署时需要执行的 SQL

在 Supabase 控制台执行 `database/schema.sql` 文件中的 SQL 语句：

1. 创建所有表结构
2. 插入默认套餐数据
3. 设置行级安全策略
4. 创建索引和触发器

## 🔍 建议

1. **优先使用 Next.js API Routes** 而不是 EdgeOne Pages Functions
2. **在 Supabase 中执行 schema.sql** 创建完整的数据库结构
3. **配置环境变量** 确保数据库连接正常
4. **测试所有 API 端点** 确保数据库操作正常
