-- Travel Agency Database Schema
-- 这个脚本需要在Supabase SQL编辑器中运行

-- 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建优惠券表
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE
);

-- 创建订单表
CREATE TABLE IF NOT EXISTS orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_name VARCHAR(255) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    final_price DECIMAL(10,2) NOT NULL,
    coupon_id UUID REFERENCES coupons(id),
    payment_status VARCHAR(50) DEFAULT 'pending',
    payment_method VARCHAR(50),
    wechat_order_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 创建支付记录表
CREATE TABLE IF NOT EXISTS payments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES orders(id) ON DELETE CASCADE,
    payment_method VARCHAR(50) NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    transaction_id VARCHAR(255),
    wechat_prepay_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    completed_at TIMESTAMP WITH TIME ZONE
);

-- 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_user_id ON coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_order_id ON payments(order_id);

-- 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 为需要的表添加更新时间触发器
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 启用行级安全性 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- 创建 RLS 策略
-- 用户只能访问自己的数据
CREATE POLICY "Users can view own profile" ON users
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
    FOR UPDATE USING (auth.uid() = id);

-- 优惠券策略
CREATE POLICY "Users can view own coupons" ON coupons
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own coupons" ON coupons
    FOR UPDATE USING (auth.uid() = user_id);

-- 订单策略
CREATE POLICY "Users can view own orders" ON orders
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create own orders" ON orders
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
    FOR UPDATE USING (auth.uid() = user_id);

-- 支付记录策略
CREATE POLICY "Users can view own payments" ON payments
    FOR SELECT USING (auth.uid() = (SELECT user_id FROM orders WHERE orders.id = payments.order_id));

-- 允许 service_role 完全访问（用于服务端操作）
CREATE POLICY "Service role full access users" ON users
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access coupons" ON coupons
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access orders" ON orders
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');

CREATE POLICY "Service role full access payments" ON payments
    FOR ALL USING (auth.jwt() ->> 'role' = 'service_role');