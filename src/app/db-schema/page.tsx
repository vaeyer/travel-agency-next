'use client'

import { useState } from 'react'

export default function DatabaseSchemaPage() {
  const [result, setResult] = useState('')
  const [loading, setLoading] = useState(false)

  const checkSchema = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/db-schema')
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult('错误: ' + (error instanceof Error ? error.message : String(error)))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">数据库表结构检查</h1>
        
        <button
          onClick={checkSchema}
          disabled={loading}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 disabled:opacity-50 mb-4"
        >
          {loading ? '检查中...' : '检查数据库表结构'}
        </button>
        
        <div className="bg-white p-4 rounded border">
          <pre className="text-sm overflow-auto max-h-96">{result || '点击按钮检查数据库结构...'}</pre>
        </div>
      </div>
    </div>
  )
}


