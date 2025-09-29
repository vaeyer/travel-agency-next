'use client'

import { useState } from 'react'

interface TravelPackage {
  id: string
  name: string
  price: number
  description: string
  image?: string
  destination?: string
  duration_days?: number
  included_services?: string[]
}

export default function PackageManager() {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const defaultPackages: TravelPackage[] = [
    {
      id: '1',
      name: 'North American',
      price: 199900,
      description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点',
      image: '/pic/北美.jpeg',
      destination: '北美',
      duration_days: 10,
      included_services: ['往返机票', '10晚酒店住宿', '每日早餐', '景点门票']
    },
    {
      id: '2',
      name: 'Romantic Europe',
      price: 299900,
      description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力',
      image: '/pic/欧洲.jpeg',
      destination: '欧洲',
      duration_days: 14,
      included_services: ['往返机票', '14晚精品酒店', '每日早餐', '城市观光']
    },
    {
      id: '3',
      name: 'Wild Africa',
      price: 399900,
      description: '非洲野生动物大冒险，感受原始自然的震撼力量',
      image: '/pic/非洲.jpeg',
      destination: '非洲',
      duration_days: 12,
      included_services: ['往返机票', '12晚酒店住宿', '每日三餐', '野生动物园门票']
    },
    {
      id: '4',
      name: 'Tokyo Cherry Blossom',
      price: 249900,
      description: '体验日本春季最美的樱花季节',
      image: '/pic/东京樱花.jpeg',
      destination: '日本',
      duration_days: 8,
      included_services: ['往返机票', '8晚酒店住宿', '每日早餐', '樱花观赏']
    },
    {
      id: '5',
      name: 'Bali Paradise',
      price: 349900,
      description: '在印尼巴厘岛享受阳光海滩',
      image: '/pic/巴厘岛.jpeg',
      destination: '印尼巴厘岛',
      duration_days: 7,
      included_services: ['往返机票', '7晚海景酒店', '每日三餐', '水上活动']
    },
    {
      id: '6',
      name: 'European Castles',
      price: 279900,
      description: '游览德国、奥地利、捷克的经典古堡',
      image: '/pic/欧洲古堡.jpeg',
      destination: '欧洲多国',
      duration_days: 9,
      included_services: ['往返机票', '9晚酒店住宿', '每日早餐', '古堡参观']
    }
  ]

  const addPackageToDatabase = async (pkg: TravelPackage) => {
    try {
      setLoading(true)
      const response = await fetch('/api/packages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: pkg.name,
          price: pkg.price,
          description: pkg.description,
          image_url: pkg.image,
          destination: pkg.destination,
          duration_days: pkg.duration_days,
          included_services: pkg.included_services
        }),
      })

      if (response.ok) {
        setMessage(`✅ 成功添加套餐: ${pkg.name}`)
        setPackages(prev => [...prev, pkg])
      } else {
        const error = await response.json()
        setMessage(`❌ 添加失败: ${error.error}`)
      }
    } catch (error) {
      setMessage(`❌ 网络错误: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const addAllPackages = async () => {
    setLoading(true)
    setMessage('正在添加所有套餐...')
    
    for (const pkg of defaultPackages) {
      await addPackageToDatabase(pkg)
      // 添加延迟避免过快请求
      await new Promise(resolve => setTimeout(resolve, 1000))
    }
    
    setLoading(false)
    setMessage('✅ 所有套餐添加完成！')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">套餐管理</h1>
          
          {message && (
            <div className={`mb-6 p-4 rounded-lg ${
              message.includes('✅') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}>
              {message}
            </div>
          )}

          <div className="mb-8">
            <button
              onClick={addAllPackages}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? '添加中...' : '添加所有6个套餐到数据库'}
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {defaultPackages.map((pkg) => (
              <div key={pkg.id} className="bg-white rounded-lg shadow-md p-6">
                <div className="h-32 bg-gray-200 rounded-lg mb-4 flex items-center justify-center">
                  {pkg.image ? (
                    <img 
                      src={pkg.image} 
                      alt={pkg.name}
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <span className="text-gray-500">暂无图片</span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-3">{pkg.description}</p>
                
                <div className="space-y-2 mb-4">
                  <p><strong>价格:</strong> ¥{(pkg.price / 100).toLocaleString()}</p>
                  <p><strong>目的地:</strong> {pkg.destination}</p>
                  <p><strong>天数:</strong> {pkg.duration_days} 天</p>
                </div>
                
                <div className="mb-4">
                  <strong>包含服务:</strong>
                  <ul className="list-disc list-inside text-sm text-gray-600 mt-1">
                    {pkg.included_services?.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                </div>
                
                <button
                  onClick={() => addPackageToDatabase(pkg)}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 disabled:opacity-50"
                >
                  {loading ? '添加中...' : '添加到数据库'}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
