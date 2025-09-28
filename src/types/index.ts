export interface User {
  id: string
  email: string
  name: string
  created_at: string
}

export interface Coupon {
  id: string
  user_id: string
  discount_amount: number
  code: string
  is_used: boolean
  used_at?: string
  expires_at?: string
  created_at: string
}

export interface TravelPackage {
  id: string
  name: string
  price: number
  description: string
  image?: string
}

export interface Order {
  id: string
  user_id: string
  package_id: string
  package_name: string
  original_price: number
  coupon_discount: number
  final_price: number
  payment_status: 'pending' | 'paid' | 'failed'
  wechat_order_id?: string
  created_at: string
}