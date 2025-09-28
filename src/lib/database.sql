-- 用户表
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 优惠券表
CREATE TABLE coupons (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  amount INTEGER NOT NULL DEFAULT 199900, -- 存储分为单位，1999元 = 199900分
  code VARCHAR(50) UNIQUE NOT NULL,
  used BOOLEAN DEFAULT FALSE,
  expires_at TIMESTAMP WITH TIME ZONE DEFAULT (NOW() + INTERVAL '365 days'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 旅行套餐表
CREATE TABLE travel_packages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price INTEGER NOT NULL, -- 存储分为单位
  description TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 订单表
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  package_id UUID REFERENCES travel_packages(id),
  package_name VARCHAR(255) NOT NULL,
  original_price INTEGER NOT NULL,
  coupon_discount INTEGER DEFAULT 0,
  final_price INTEGER NOT NULL,
  payment_status VARCHAR(20) DEFAULT 'pending',
  wechat_order_id VARCHAR(100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 插入默认旅行套餐
INSERT INTO travel_packages (name, price, description) VALUES
('North American', 199900, '探索北美洲的壮丽风光，包括美国和加拿大的经典景点'),
('Romantic Europe', 299900, '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力'),
('Wild Africa', 399900, '非洲野生动物大冒险，感受原始自然的震撼力量');

-- 创建索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_coupons_user_id ON coupons(user_id);
CREATE INDEX idx_coupons_code ON coupons(code);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_payment_status ON orders(payment_status);