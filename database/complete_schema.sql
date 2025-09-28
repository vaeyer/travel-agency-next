-- 完整的旅行社数据库架构
-- 在 Supabase SQL 编辑器中执行此脚本

-- 1. 创建用户表
CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    name VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. 创建旅行套餐表
CREATE TABLE IF NOT EXISTS travel_packages (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL,
    image_url VARCHAR(500),
    duration_days INTEGER,
    destination VARCHAR(255),
    included_services TEXT[],
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. 创建优惠券表
CREATE TABLE IF NOT EXISTS coupons (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    code VARCHAR(50) UNIQUE NOT NULL,
    discount_amount DECIMAL(10,2) NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    used_at TIMESTAMP WITH TIME ZONE,
    expires_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. 创建订单表
CREATE TABLE IF NOT EXISTS orders (
    id VARCHAR(100) PRIMARY KEY, -- 使用自定义订单ID格式
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    package_id UUID REFERENCES travel_packages(id),
    package_name VARCHAR(255) NOT NULL,
    original_price DECIMAL(10,2) NOT NULL,
    coupon_discount DECIMAL(10,2) DEFAULT 0,
    final_price DECIMAL(10,2) NOT NULL,
    payment_status VARCHAR(50) DEFAULT 'pending',
    wechat_order_id VARCHAR(255),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. 添加索引以提高查询性能
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_coupons_code ON coupons(code);
CREATE INDEX IF NOT EXISTS idx_coupons_user_id ON coupons(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_user_id ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(payment_status);
CREATE INDEX IF NOT EXISTS idx_travel_packages_active ON travel_packages(is_active);

-- 6. 插入示例旅行套餐数据
INSERT INTO travel_packages (name, description, price, duration_days, destination, included_services, image_url)
VALUES
    (
        '东京樱花之旅',
        '体验日本春季最美的樱花季节，包含东京、京都、大阪三大城市游览',
        8999.00,
        7,
        '日本',
        ARRAY['往返机票', '7晚酒店住宿', '每日早餐', '中文导游', '景点门票'],
        '/images/tokyo-sakura.jpg'
    ),
    (
        '巴厘岛度假套餐',
        '在印尼巴厘岛享受阳光海滩，体验当地文化和美食',
        6999.00,
        5,
        '印尼巴厘岛',
        ARRAY['往返机票', '5晚海景酒店', '每日早餐', '机场接送', 'SPA体验'],
        '/images/bali-beach.jpg'
    ),
    (
        '欧洲古堡探索',
        '游览德国、奥地利、捷克的经典古堡和历史名城',
        15999.00,
        10,
        '欧洲多国',
        ARRAY['往返机票', '10晚精品酒店', '每日早餐', '专业导游', '古堡门票', '城际交通'],
        '/images/europe-castle.jpg'
    )
ON CONFLICT (id) DO NOTHING;

-- 7. 创建更新时间触发器函数
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 8. 为相关表添加更新时间触发器
DROP TRIGGER IF EXISTS update_users_updated_at ON users;
CREATE TRIGGER update_users_updated_at
    BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_travel_packages_updated_at ON travel_packages;
CREATE TRIGGER update_travel_packages_updated_at
    BEFORE UPDATE ON travel_packages
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

DROP TRIGGER IF EXISTS update_orders_updated_at ON orders;
CREATE TRIGGER update_orders_updated_at
    BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 9. 启用行级安全性 (RLS) - 可选，用于数据安全
-- ALTER TABLE users ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE coupons ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE travel_packages ENABLE ROW LEVEL SECURITY;

-- 10. 显示创建结果
SELECT 'Database schema created successfully!' as message;
SELECT 'Tables created:' as info;
SELECT table_name FROM information_schema.tables
WHERE table_schema = 'public'
AND table_name IN ('users', 'coupons', 'orders', 'travel_packages');