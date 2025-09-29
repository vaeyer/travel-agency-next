'use client'

import { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [success, setSuccess] = useState(false)
  const [couponCode, setCouponCode] = useState('')

  const email = searchParams.get('email')
  const code = searchParams.get('code')

  useEffect(() => {
    if (email && code) {
      handleVerification()
    }
  }, [email, code])

  const handleVerification = async () => {
    if (!email || !code) {
      setMessage('缺少验证信息')
      return
    }

    setLoading(true)
    setMessage('')

    try {
      const response = await fetch('/api/auth/verify-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, code }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setCouponCode(data.couponCode)
        setMessage('邮箱验证成功！您已获得¥1999新用户优惠券')
        setTimeout(() => {
          router.push('/purchase')
        }, 3000)
      } else {
        setMessage(data.error || '验证失败')
      }
    } catch (error) {
      setMessage('网络错误，请重试')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        {success ? (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">验证成功！</h1>
            <p className="text-gray-600 mb-6">{message}</p>
            
            {couponCode && (
              <div className="bg-gradient-to-r from-pink-500 to-red-500 text-white p-4 rounded-lg mb-6">
                <p className="text-sm mb-2">您的优惠券代码：</p>
                <p className="text-xl font-bold">{couponCode}</p>
                <p className="text-sm mt-2 opacity-90">价值 ¥1999</p>
              </div>
            )}
            
            <p className="text-sm text-gray-500 mb-6">
              3秒后自动跳转到套餐页面...
            </p>
            
            <Link
              href="/purchase"
              className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              立即查看套餐
            </Link>
          </>
        ) : (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-4">邮箱验证</h1>
            
            {loading ? (
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto mb-4"></div>
                <p className="text-gray-600">正在验证...</p>
              </div>
            ) : (
              <>
                {message && (
                  <div className={`p-4 rounded-lg mb-6 ${
                    message.includes('成功') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {message}
                  </div>
                )}
                
                {!email || !code ? (
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">缺少验证信息，请检查邮件链接</p>
                    <Link
                      href="/register"
                      className="text-indigo-600 hover:text-indigo-700"
                    >
                      重新注册
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <p className="text-gray-600 mb-6">正在验证邮箱：{email}</p>
                    <button
                      onClick={handleVerification}
                      className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
                    >
                      重新验证
                    </button>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
