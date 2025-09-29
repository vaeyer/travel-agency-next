'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'

interface TravelPackage {
  id: string
  name: string
  price: number
  description: string
  image?: string
}

export default function Home() {
  const [packages, setPackages] = useState<TravelPackage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPackages()
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
            price: 199900,
            description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点',
            image: '/pic/北美.jpeg'
          },
          {
            id: '2',
            name: 'Romantic Europe',
            price: 299900,
            description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力',
            image: '/pic/欧洲.jpeg'
          },
          {
            id: '3',
            name: 'Wild Africa',
            price: 399900,
            description: '非洲野生动物大冒险，感受原始自然的震撼力量',
            image: '/pic/非洲.jpeg'
          },
          {
            id: '4',
            name: 'Tokyo Cherry Blossom',
            price: 249900,
            description: '体验日本春季最美的樱花季节',
            image: '/pic/东京樱花.jpeg'
          },
          {
            id: '5',
            name: 'Bali Paradise',
            price: 349900,
            description: '在印尼巴厘岛享受阳光海滩',
            image: '/pic/巴厘岛.jpeg'
          },
          {
            id: '6',
            name: 'European Castles',
            price: 279900,
            description: '游览德国、奥地利、捷克的经典古堡',
            image: '/pic/欧洲古堡.jpeg'
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
          price: 199900,
          description: '探索北美洲的壮丽风光，包括美国和加拿大的经典景点',
          image: '/pic/北美.jpeg'
        },
        {
          id: '2',
          name: 'Romantic Europe',
          price: 299900,
          description: '浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力',
          image: '/pic/欧洲.jpeg'
        },
        {
          id: '3',
          name: 'Wild Africa',
          price: 399900,
          description: '非洲野生动物大冒险，感受原始自然的震撼力量',
          image: '/pic/非洲.jpeg'
        },
        {
          id: '4',
          name: 'Tokyo Cherry Blossom',
          price: 249900,
          description: '体验日本春季最美的樱花季节',
          image: '/pic/东京樱花.jpeg'
        },
        {
          id: '5',
          name: 'Bali Paradise',
          price: 349900,
          description: '在印尼巴厘岛享受阳光海滩',
          image: '/pic/巴厘岛.jpeg'
        },
        {
          id: '6',
          name: 'European Castles',
          price: 279900,
          description: '游览德国、奥地利、捷克的经典古堡',
          image: '/pic/欧洲古堡.jpeg'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const formatPrice = (price: number) => {
    return `¥${(price / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            探索世界，从这里开始
          </h1>
          <p className="text-xl text-gray-600 mb-12">
            精选全球顶级旅行套餐，为您提供难忘的旅行体验
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">精选目的地</h3>
              <p className="text-gray-600">北美、欧洲、非洲等全球热门旅行目的地</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">优惠价格</h3>
              <p className="text-gray-600">新用户专享¥1999优惠券，性价比超高</p>
            </div>

            <div className="bg-white rounded-2xl shadow-xl p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">安全支付</h3>
              <p className="text-gray-600">支持微信支付，安全便捷的支付体验</p>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
            <Link
              href="/register"
              className="block w-full sm:w-auto bg-indigo-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              立即注册
            </Link>
            <Link
              href="/login"
              className="block w-full sm:w-auto bg-white text-indigo-600 px-8 py-4 rounded-lg text-lg font-medium border-2 border-indigo-600 hover:bg-indigo-50 transition-colors"
            >
              已有账户？立即登录
            </Link>
          </div>

          {loading ? (
            <div className="mt-16 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>
          ) : (
            <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
              {packages.map((pkg) => (
                <div key={pkg.id} className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <div 
                    className="h-48 relative flex items-center justify-center bg-cover bg-center" 
                    style={{
                      backgroundImage: pkg.image ? `url(${pkg.image})` : undefined,
                      backgroundColor: '#f0f0f0'
                    }}
                  >
                    <h3 className="text-2xl font-bold text-white relative z-10 drop-shadow-lg">
                      {pkg.name}
                    </h3>
                  </div>
                  <div className="p-6">
                    <p className="text-gray-600 mb-4">{pkg.description}</p>
                    <div className="text-3xl font-bold text-indigo-600">
                      {formatPrice(pkg.price)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
