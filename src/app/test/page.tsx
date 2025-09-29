'use client'

import { useState } from 'react'

export default function TestLogin() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const testLogin = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'asac@qq.com',
          password: 'test123' // 您需要知道正确的密码
        }),
      })

      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const testCoupons = async () => {
    setLoading(true)
    setResult('')
    
    try {
      const response = await fetch('/api/user/coupons')
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">API 测试页面</h1>
      
      <div className="space-y-4">
        <button
          onClick={testLogin}
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-4"
        >
          测试登录 API
        </button>
        
        <button
          onClick={testCoupons}
          disabled={loading}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          测试优惠券 API
        </button>
      </div>

      {result && (
        <div className="mt-4">
          <h3 className="font-bold">结果:</h3>
          <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto">
            {result}
          </pre>
        </div>
      )}
    </div>
  )
}
