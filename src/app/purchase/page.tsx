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
  amount: number
  code: string
}

export default function PurchasePage() {
  const [packages] = useState<TravelPackage[]>([
    {
      id: '1',
      name: 'North American',
      price: 199900,
      description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点'
    },
    {
      id: '2',
      name: 'Romantic Europe',
      price: 299900,
      description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力'
    },
    {
      id: '3',
      name: 'Wild Africa',
      price: 399900,
      description: '非洲野生动物大冒险，感受原始自然的震撼力量'
    }
  ])

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
    fetchCoupons()
  }, [])

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
    return coupon ? Math.min(coupon.amount, selectedPackage.price) : 0
  }

  const calculateFinalPrice = () => {
    if (!selectedPackage) return 0
    return Math.max(0, selectedPackage.price - calculateDiscount())
  }

  const handlePurchase = async () => {
    if (!selectedPackage) return

    setLoading(true)
    try {
      const response = await fetch('/api/wechat/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId: selectedPackage.id,
          couponCode: selectedCoupon
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setOrderInfo(data)
        setQrCodeImagePath(data.qrCodeImagePath)
        setShowPayment(true)
      } else {
        alert(data.error || '创建订单失败')
      }
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
          <h2 className="text-2xl font-bold text-gray-900 mb-6">微信支付</h2>

          <div className="mb-6">
            <div className="bg-gray-100 p-4 rounded-lg mb-4">
              <p className="text-gray-600 text-sm">订单号</p>
              <p className="font-mono text-sm">{orderInfo?.orderId}</p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-green-800 font-semibold">支付金额</p>
              <p className="text-2xl font-bold text-green-600">
                {formatPrice(orderInfo?.amount || 0)}
              </p>
              {(orderInfo?.discount || 0) > 0 && (
                <p className="text-sm text-gray-600">
                  原价: {formatPrice(orderInfo?.originalPrice || 0)}
                  <span className="text-red-500 ml-2">
                    优惠: -{formatPrice(orderInfo?.discount || 0)}
                  </span>
                </p>
              )}
            </div>
          </div>

          <div className="mb-6 p-8 bg-gray-50 rounded-lg">
            <div className="w-48 h-48 mx-auto bg-white border-2 border-gray-300 rounded-lg overflow-hidden">
              {qrCodeImagePath ? (
                <img
                  src={qrCodeImagePath}
                  alt="微信支付二维码"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <p className="text-xs text-gray-500 text-center">
                    加载二维码中...
                  </p>
                </div>
              )}
            </div>
            <p className="text-sm text-gray-600 mt-4">
              请使用微信扫描二维码完成支付
            </p>
          </div>

          <div className="space-y-3">
            <button
              onClick={async () => {
                try {
                  const response = await fetch('/api/payment/simulate', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      orderId: orderInfo?.orderId
                    }),
                  })

                  const data = await response.json()

                  if (response.ok) {
                    alert('支付成功！您的订单已完成')
                    setShowPayment(false)
                    setSelectedPackage(null)
                    setSelectedCoupon('')
                    setOrderInfo(null)
                  } else {
                    alert(data.error || '支付失败')
                  }
                } catch (error) {
                  alert('网络错误，请重试')
                }
              }}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              确认支付完成
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

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className={`bg-white rounded-2xl shadow-xl overflow-hidden cursor-pointer transition-transform hover:scale-105 ${
                selectedPackage?.id === pkg.id ? 'ring-4 ring-indigo-500' : ''
              }`}
              onClick={() => setSelectedPackage(pkg)}
            >
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">{pkg.name}</h3>
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
                      {coupon.code} - {formatPrice(coupon.amount)}
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
              {loading ? '创建订单中...' : '立即购买'}
            </button>

            <div className="mt-4 text-center">
              <p className="text-sm text-gray-500">
                支持微信支付 | 安全可靠
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}