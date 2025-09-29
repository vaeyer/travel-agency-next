-- 创建通用优惠券（不绑定特定用户，所有用户都可以使用）
INSERT INTO coupons (user_id, code, discount_amount, is_used, expires_at) VALUES
(NULL, 'WELCOME2024', 199900, false, '2024-12-31T23:59:59Z'),
(NULL, 'SAVE50', 5000, false, '2024-12-31T23:59:59Z'),
(NULL, 'DISCOUNT100', 10000, false, '2024-12-31T23:59:59Z'),
(NULL, 'NEWUSER', 50000, false, '2024-12-31T23:59:59Z'),
(NULL, 'HOLIDAY', 15000, false, '2024-12-31T23:59:59Z');

-- 如果需要为特定用户创建优惠券，可以使用以下SQL（替换用户ID）：
-- INSERT INTO coupons (user_id, code, discount_amount, is_used, expires_at) VALUES
-- ('652e0da9-3437-4fcf-b09e-e1f12fba0a0f', 'WELCOME2024', 199900, false, '2024-12-31T23:59:59Z'),
-- ('652e0da9-3437-4fcf-b09e-e1f12fba0a0f', 'SAVE50', 5000, false, '2024-12-31T23:59:59Z'),
-- ('652e0da9-3437-4fcf-b09e-e1f12fba0a0f', 'DISCOUNT100', 10000, false, '2024-12-31T23:59:59Z');
