'use client'

import { useState } from 'react'

interface PaymentMethod {
  id: string
  name: string
  description: string
  icon: string
  available: boolean
  apiEndpoint: string
}

const paymentMethods: PaymentMethod[] = [
  {
    id: 'alipay',
    name: '支付宝',
    description: '支持个人开发者，申请简单',
    icon: '🟦',
    available: true,
    apiEndpoint: '/api/alipay/create-order'
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: '国际支付，支持全球用户',
    icon: '🔵',
    available: true,
    apiEndpoint: '/api/paypal/create-order'
  }
]

interface PaymentMethodSelectorProps {
  packageId: string
  couponCode?: string
  onPaymentCreated: (paymentData: any) => void
}

export default function PaymentMethodSelector({ 
  packageId, 
  couponCode, 
  onPaymentCreated 
}: PaymentMethodSelectorProps) {
  const [loading, setLoading] = useState<string | null>(null)

  const handlePaymentMethodSelect = async (method: PaymentMethod) => {
    if (!method.available) {
      alert('该支付方式暂不可用')
      return
    }

    setLoading(method.id)

    try {
      const response = await fetch(method.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          packageId,
          couponCode
        }),
      })

      const data = await response.json()

      if (response.ok) {
        onPaymentCreated({
          ...data,
          paymentMethod: method.id
        })
      } else {
        alert(data.error || '创建支付失败')
      }
    } catch (error) {
      alert('网络错误，请重试')
    } finally {
      setLoading(null)
    }
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">选择支付方式</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className={`p-4 border rounded-lg cursor-pointer transition-all ${
              method.available
                ? 'border-gray-200 hover:border-blue-500 hover:shadow-md'
                : 'border-gray-100 bg-gray-50 cursor-not-allowed opacity-60'
            }`}
            onClick={() => handlePaymentMethodSelect(method)}
          >
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{method.icon}</span>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{method.name}</h4>
                <p className="text-sm text-gray-600">{method.description}</p>
              </div>
              {loading === method.id && (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="font-medium text-blue-900 mb-2">💡 推荐方案</h4>
        <ul className="text-sm text-blue-800 space-y-1">
          <li>• <strong>支付宝</strong>：个人开发者可申请，审核通过率高，适合国内用户</li>
          <li>• <strong>PayPal</strong>：国际支付，支持多币种，适合海外用户</li>
        </ul>
      </div>
    </div>
  )
}
