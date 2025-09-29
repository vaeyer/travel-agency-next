-- Travel Agency 数据库表结构
-- 适用于 Supabase PostgreSQL

-- 1. 用户表
CREATE TABLE IF NOT EXISTS users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  email_verified BOOLEAN DEFAULT FALSE,
  verification_code VARCHAR(6),
  verification_expires TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 旅行套餐表
CREATE TABLE IF NOT EXISTS travel_packages (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL, -- 价格以分为单位
  description TEXT,
  image VARCHAR(500),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 优惠券表
CREATE TABLE IF NOT EXISTS coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  discount_amount INTEGER NOT NULL, -- 优惠金额以分为单位
  code VARCHAR(50) NOT NULL,
  is_used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  used_at TIMESTAMP WITH TIME ZONE,
  UNIQUE(user_id, code)
);

-- 4. 订单表
CREATE TABLE IF NOT EXISTS orders (
  id VARCHAR(100) PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  package_id VARCHAR(50) NOT NULL REFERENCES travel_packages(id),
  package_name VARCHAR(255) NOT NULL,
  original_price INTEGER NOT NULL, -- 原价以分为单位
  coupon_discount INTEGER DEFAULT 0, -- 优惠金额以分为单位
  final_price INTEGER NOT NULL, -- 最终价格以分为单位
  payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, refunded
  payment_method VARCHAR(20), -- alipay, paypal, wechat
  alipay_order_id VARCHAR(100),
  paypal_order_id VARCHAR(100),
  wechat_order_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  paid_at TIMESTAMP WITH TIME ZONE
);

-- 创建索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_coupons_user_id ON coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_payment_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_travel_packages_active ON travel_packages(is_active);

-- 插入默认旅行套餐数据
INSERT INTO travel_packages (id, name, price, description, image) VALUES
('1', 'North American', 199900, '探索北美洲的壮丽风光，包括美国和加拿大的经典景点', '/pic/北美.jpeg'),
('2', 'Romantic Europe', 299900, '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力', '/pic/欧洲.jpeg'),
('3', 'Wild Africa', 399900, '非洲野生动物大冒险，感受原始自然的震撼力量', '/pic/非洲.jpeg')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  price = EXCLUDED.price,
  description = EXCLUDED.description,
  image = EXCLUDED.image,
  updated_at = NOW();

-- 启用行级安全策略 (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;

-- 用户表策略
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- 优惠券表策略
CREATE POLICY "Users can view own coupons" ON coupons
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own coupons" ON coupons
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own coupons" ON coupons
  FOR UPDATE USING (auth.uid() = user_id);

-- 订单表策略
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own orders" ON orders
  FOR UPDATE USING (auth.uid() = user_id);

-- 旅行套餐表策略 (公开读取)
CREATE POLICY "Anyone can view active packages" ON travel_packages
  FOR SELECT USING (is_active = true);

-- 创建更新时间触发器
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_travel_packages_updated_at BEFORE UPDATE ON travel_packages
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
