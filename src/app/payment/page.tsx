'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

function PaymentContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentData, setPaymentData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [paymentStatus, setPaymentStatus] = useState<'pending' | 'success' | 'failed'>('pending')

  useEffect(() => {
    // 从 URL 参数获取支付信息
    const orderId = searchParams.get('orderId')
    const amount = searchParams.get('amount')
    const packageName = searchParams.get('packageName')
    
    if (orderId && amount) {
      setPaymentData({
        orderId,
        amount: parseInt(amount),
        packageName: packageName || '旅行套餐'
      })
    }
    setLoading(false)
  }, [searchParams])

  const handlePayment = async () => {
    setLoading(true)
    
    // 模拟支付处理
    setTimeout(() => {
      setPaymentStatus('success')
      setLoading(false)
      
      // 3秒后跳转到成功页面
      setTimeout(() => {
        router.push('/payment/success')
      }, 3000)
    }, 2000)
  }

  const handleCancel = () => {
    router.push('/purchase')
  }

  if (loading && !paymentData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载支付信息中...</p>
        </div>
      </div>
    )
  }

  if (paymentStatus === 'success') {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md w-full">
          <div className="text-green-500 text-6xl mb-4">✓</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">支付成功！</h1>
          <p className="text-gray-600 mb-6">
            订单号：{paymentData?.orderId}
          </p>
          <p className="text-gray-600 mb-6">
            支付金额：¥{(paymentData?.amount / 100).toFixed(2)}
          </p>
          <p className="text-sm text-gray-500">
            正在跳转到成功页面...
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        {/* 支付页面头部 */}
        <div className="bg-blue-600 text-white p-6 text-center">
          <h1 className="text-2xl font-bold">支付宝沙箱支付</h1>
          <p className="text-blue-100 mt-2">测试环境 - 模拟支付</p>
        </div>

        {/* 订单信息 */}
        <div className="p-6">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">订单信息</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">商品名称：</span>
                <span className="font-medium">{paymentData?.packageName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">订单号：</span>
                <span className="font-mono text-sm">{paymentData?.orderId}</span>
              </div>
              <div className="flex justify-between text-lg font-bold">
                <span>支付金额：</span>
                <span className="text-red-600">¥{(paymentData?.amount / 100).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* 支付方式 */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">支付方式</h3>
            <div className="border rounded-lg p-4 bg-blue-50">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  支
                </div>
                <div>
                  <p className="font-medium">支付宝</p>
                  <p className="text-sm text-gray-600">沙箱测试环境</p>
                </div>
              </div>
            </div>
          </div>

          {/* 支付按钮 */}
          <div className="space-y-3">
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  处理中...
                </div>
              ) : (
                '确认支付'
              )}
            </button>
            
            <button
              onClick={handleCancel}
              className="w-full bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-300"
            >
              取消支付
            </button>
          </div>

          {/* 沙箱提示 */}
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-start">
              <div className="text-yellow-600 text-xl mr-2">⚠️</div>
              <div className="text-sm text-yellow-800">
                <p className="font-medium mb-1">沙箱测试环境</p>
                <p>这是支付宝沙箱环境，不会产生真实扣款。点击"确认支付"将模拟支付成功。</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function PaymentPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载支付信息中...</p>
        </div>
      </div>
    }>
      <PaymentContent />
    </Suspense>
  )
}
