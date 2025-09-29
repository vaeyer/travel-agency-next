'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

export default function PaymentSuccessPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [orderInfo, setOrderInfo] = useState<any>(null)

  useEffect(() => {
    // 从 URL 参数获取订单信息
    const orderId = searchParams.get('orderId')
    const amount = searchParams.get('amount')
    const packageName = searchParams.get('packageName')
    
    if (orderId && amount) {
      setOrderInfo({
        orderId,
        amount: parseInt(amount),
        packageName: packageName || '旅行套餐'
      })
    }
  }, [searchParams])

  const handleBackToHome = () => {
    router.push('/')
  }

  const handleViewOrders = () => {
    // 这里可以跳转到订单列表页面
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 成功页面头部 */}
        <div className="bg-green-600 text-white p-8 text-center">
          <div className="text-6xl mb-4">🎉</div>
          <h1 className="text-3xl font-bold">支付成功！</h1>
          <p className="text-green-100 mt-2">感谢您的购买</p>
        </div>

        {/* 订单详情 */}
        <div className="p-8">
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">订单详情</h2>
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-600">商品名称：</span>
                <span className="font-medium">{orderInfo?.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">订单号：</span>
                <span className="font-mono text-sm">{orderInfo?.orderId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">支付金额：</span>
                <span className="font-bold text-green-600 text-lg">
                  ¥{(orderInfo?.amount / 100).toFixed(2)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">支付时间：</span>
                <span>{new Date().toLocaleString('zh-CN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">支付状态：</span>
                <span className="text-green-600 font-medium">已支付</span>
              </div>
            </div>
          </div>

          {/* 下一步操作 */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">下一步操作</h3>
            <div className="space-y-3">
              <div className="flex items-start p-4 bg-blue-50 rounded-lg">
                <div className="text-blue-600 text-xl mr-3">📧</div>
                <div>
                  <p className="font-medium text-blue-900">确认邮件</p>
                  <p className="text-sm text-blue-700">
                    我们已向您的邮箱发送订单确认邮件，请查收。
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-green-50 rounded-lg">
                <div className="text-green-600 text-xl mr-3">🎫</div>
                <div>
                  <p className="font-medium text-green-900">电子凭证</p>
                  <p className="text-sm text-green-700">
                    您的旅行套餐电子凭证将在24小时内发送到您的邮箱。
                  </p>
                </div>
              </div>
              
              <div className="flex items-start p-4 bg-purple-50 rounded-lg">
                <div className="text-purple-600 text-xl mr-3">📞</div>
                <div>
                  <p className="font-medium text-purple-900">客服支持</p>
                  <p className="text-sm text-purple-700">
                    如有任何问题，请联系我们的客服团队。
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* 操作按钮 */}
          <div className="flex space-x-4">
            <button
              onClick={handleBackToHome}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              返回首页
            </button>
            
            <button
              onClick={handleViewOrders}
              className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
            >
              查看订单
            </button>
          </div>

          {/* 联系信息 */}
          <div className="mt-8 pt-6 border-t border-gray-200 text-center">
            <p className="text-sm text-gray-600">
              客服热线：400-123-4567 | 工作时间：9:00-18:00
            </p>
            <p className="text-sm text-gray-600 mt-1">
              邮箱：support@travel-agency.com
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
