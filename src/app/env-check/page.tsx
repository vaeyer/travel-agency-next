'use client'

import { useState } from 'react'

export default function EnvCheck() {
  const [result, setResult] = useState('')

  const checkEnv = async () => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'test@test.com',
          password: 'test'
        }),
      })

      const data = await response.json()
      
      if (data.error === 'Server configuration error') {
        setResult('❌ 环境变量缺失！需要设置：\n\nNEXT_PUBLIC_SUPABASE_URL\nSUPABASE_SERVICE_ROLE_KEY\nJWT_SECRET')
      } else {
        setResult('✅ 环境变量配置正确')
      }
    } catch (error) {
      setResult(`❌ 检查失败: ${error}`)
    }
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">环境变量检查</h1>
      
      <button
        onClick={checkEnv}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        检查环境变量
      </button>

      {result && (
        <div className="bg-gray-100 p-4 rounded">
          <pre className="whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      <div className="mt-8 p-4 bg-yellow-50 rounded">
        <h3 className="font-bold mb-2">需要创建 .env.local 文件：</h3>
        <pre className="text-sm bg-white p-3 rounded border">
{`NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_key
JWT_SECRET=your_jwt_secret`}
        </pre>
      </div>
    </div>
  )
}
