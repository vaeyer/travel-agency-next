'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface TravelPackage {
  id: string
  name: string
  price: number
  description: string
}

interface Coupon {
  id: string
  discount_amount: number
  code: string
  is_used: boolean
}

export default function PurchasePage() {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [coupons, setCoupons] = useState<Coupon[]>([])
  const [selectedPackage, setSelectedPackage] = useState<TravelPackage | null>(null)
  const [selectedCoupon, setSelectedCoupon] = useState<string>('')
  const [showPayment, setShowPayment] = useState(false)
  const [qrCodeImagePath, setQrCodeImagePath] = useState('')
  const [loading, setLoading] = useState(false)
  const [orderInfo, setOrderInfo] = useState<{
    orderId: string
    amount: number
    originalPrice: number
    discount: number
    qrCodeImagePath: string
  } | null>(null)
  const router = useRouter()

  useEffect(() => {
    fetchPackages()
    fetchCoupons()
  }, [])

  const fetchPackages = async () => {
    try {
      const response = await fetch('/api/packages')
      if (response.ok) {
        const data = await response.json()
        setPackages(data.packages)
      } else {
        // 如果 API 失败，使用默认数据作为后备
        setPackages([
          {
            id: '1',
            name: 'North American',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_1_PRICE || '199900'),
            description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点'
          },
          {
            id: '2',
            name: 'Romantic Europe',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_2_PRICE || '299900'),
            description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力'
          },
          {
            id: '3',
            name: 'Wild Africa',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_3_PRICE || '399900'),
            description: '非洲野生动物大冒险，感受原始自然的震撼力量'
          },
          {
            id: '4',
            name: 'Tokyo Cherry Blossom',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_4_PRICE || '249900'),
            description: '体验日本春季最美的樱花季节'
          },
          {
            id: '5',
            name: 'Bali Paradise',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_5_PRICE || '349900'),
            description: '在印尼巴厘岛享受阳光海滩'
          },
          {
            id: '6',
            name: 'European Castles',
            price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_6_PRICE || '279900'),
            description: '游览德国、奥地利、捷克的经典古堡'
          }
        ])
      }
    } catch (error) {
      console.error('Failed to fetch packages:', error)
      // 使用默认数据作为后备
      setPackages([
        {
          id: '1',
          name: 'North American',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_1_PRICE || '199900'),
          description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点'
        },
        {
          id: '2',
          name: 'Romantic Europe',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_2_PRICE || '299900'),
          description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力'
        },
        {
          id: '3',
          name: 'Wild Africa',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_3_PRICE || '399900'),
          description: '非洲野生动物大冒险，感受原始自然的震撼力量'
        },
        {
          id: '4',
          name: 'Tokyo Cherry Blossom',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_4_PRICE || '249900'),
          description: '体验日本春季最美的樱花季节'
        },
        {
          id: '5',
          name: 'Bali Paradise',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_5_PRICE || '349900'),
          description: '在印尼巴厘岛享受阳光海滩'
        },
        {
          id: '6',
          name: 'European Castles',
          price: parseInt(process.env.NEXT_PUBLIC_PACKAGE_6_PRICE || '279900'),
          description: '游览德国、奥地利、捷克的经典古堡'
        }
      ])
    }
  }

  const fetchCoupons = async () => {
    try {
      const response = await fetch('/api/user/coupons')
      if (response.ok) {
        const data = await response.json()
        setCoupons(data.coupons)
      }
    } catch (error) {
      console.error('Failed to fetch coupons:', error)
    }
  }

  const formatPrice = (price: number) => {
    return `¥${(price / 100).toFixed(2)}`
  }

  const calculateDiscount = () => {
    if (!selectedCoupon || !selectedPackage) return 0
    const coupon = coupons.find(c => c.code === selectedCoupon)
    return coupon ? Math.min(coupon.discount_amount, selectedPackage.price) : 0
  }

  const calculateFinalPrice = () => {
    if (!selectedPackage) return 0
    return Math.max(0, selectedPackage.price - calculateDiscount())
  }

  const handlePurchase = async () => {
    if (!selectedPackage) return

    setLoading(true)
    try {
      // 使用支付方式选择器，而不是直接调用微信支付
      setShowPayment(true)
    } catch (error) {
      alert('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  if (showPayment) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">选择支付方式</h2>

          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-gray-600 text-sm">套餐名称</p>
              <p className="font-medium text-gray-900">{selectedPackage?.name}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">支付金额</p>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(calculateFinalPrice())}
              </p>
              {calculateDiscount() > 0 && (
                <p className="text-sm text-gray-600">
                  原价: {formatPrice(selectedPackage?.price || 0)}
                  <span className="text-red-500 ml-2">
                    优惠: -{formatPrice(calculateDiscount())}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={async () => {
                try {
                  // 调用支付宝支付
                  const response = await fetch('/api/alipay/create-order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      packageId: selectedPackage?.id,
                      couponCode: selectedCoupon
                    }),
                  })

                  const data = await response.json()

                  if (response.ok) {
                    // 跳转到内部支付页面
                    window.location.href = data.paymentUrl
                  } else {
                    alert(data.error || '创建订单失败')
                  }
                } catch (error) {
                  alert('网络错误，请重试')
                }
              }}
              className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
            >
              支付宝支付
            </button>
            <button
              onClick={async () => {
                try {
                  // 调用PayPal支付
                  const response = await fetch('/api/paypal/create-order', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      packageId: selectedPackage?.id,
                      couponCode: selectedCoupon
                    }),
                  })

                  const data = await response.json()

                  if (response.ok) {
                    // 跳转到内部支付页面
                    window.location.href = data.paymentUrl
                  } else {
                    alert(data.error || '创建订单失败')
                  }
                } catch (error) {
                  alert('网络错误，请重试')
                }
              }}
              className="w-full bg-yellow-500 text-white py-3 rounded-lg hover:bg-yellow-600 transition-colors"
            >
              PayPal支付
            </button>
            <button
              onClick={() => setShowPayment(false)}
              className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg hover:bg-gray-400 transition-colors"
            >
              返回
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">精选旅行套餐</h1>
          <p className="text-lg text-gray-600">探索世界，留下美好回忆</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedPackage?.id === pkg.id ? 'ring-4 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="h-48 flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{
                backgroundImage: pkg.name === 'North American' 
                  ? 'url(/pic/北美.jpeg)' 
                  : pkg.name === 'Romantic Europe'
                  ? 'url(/pic/欧洲.jpeg)'
                  : pkg.name === 'Wild Africa'
                  ? 'url(/pic/非洲.jpeg)'
                  : pkg.name === 'Tokyo Cherry Blossom'
                  ? 'url(/pic/东京樱花.jpeg)'
                  : pkg.name === 'Bali Paradise'
                  ? 'url(/pic/巴厘岛.jpeg)'
                  : pkg.name === 'European Castles'
                  ? 'url(/pic/欧洲古堡.jpeg)'
                  : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                backgroundColor: '#f0f0f0'
              }}>
                <div className="relative z-10 text-center">
                  <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{pkg.name}</h3>
                  <div className="text-white text-sm opacity-90 drop-shadow">
                    {pkg.name === 'North American' && '🇺🇸 探索北美大陆的壮丽风光'}
                    {pkg.name === 'Romantic Europe' && '🇪🇺 体验欧洲的浪漫文化'}
                    {pkg.name === 'Wild Africa' && '🦁 感受非洲野生动物的魅力'}
                    {pkg.name === 'Tokyo Cherry Blossom' && '🌸 体验日本春季樱花之美'}
                    {pkg.name === 'Bali Paradise' && '🏝️ 享受巴厘岛阳光海滩'}
                    {pkg.name === 'European Castles' && '🏰 探索欧洲古堡历史'}
                  </div>
                </div>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-3xl font-bold text-indigo-600">
                  {formatPrice(pkg.price)}
                </div>
                {selectedPackage?.id === pkg.id && (
                  <div className="mt-4 p-2 bg-indigo-50 rounded-lg">
                    <p className="text-sm text-indigo-600 font-medium">已选择</p>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedPackage && (
          <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">订单详情</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">套餐名称:</span>
                <span className="font-medium">{selectedPackage.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">原价:</span>
                <span className="font-medium">{formatPrice(selectedPackage.price)}</span>
              </div>
            </div>

            {coupons.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  选择优惠券 (可选)
                </label>
                <select
                  value={selectedCoupon}
                  onChange={(e) => setSelectedCoupon(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                >
                  <option value="">不使用优惠券</option>
                  {coupons.map((coupon) => (
                    <option key={coupon.id} value={coupon.code}>
                      {coupon.code} - {formatPrice(coupon.discount_amount)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {selectedCoupon && (
              <div className="mb-6 p-4 bg-green-50 rounded-lg">
                <div className="flex justify-between">
                  <span className="text-green-800">优惠金额:</span>
                  <span className="text-green-600 font-medium">
                    -{formatPrice(calculateDiscount())}
                  </span>
                </div>
              </div>
            )}

            <div className="border-t pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>最终金额:</span>
                <span className="text-indigo-600">{formatPrice(calculateFinalPrice())}</span>
              </div>
            </div>

            <button
              onClick={handlePurchase}
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium text-lg"
            >
              选择支付方式
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                支持支付宝、PayPal支付 | 安全可靠
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}