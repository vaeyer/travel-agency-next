import Link from 'next/link'

export default function Home() {
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

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-indigo-400 to-purple-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">North American</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">探索北美洲的壮丽风光，包括美国和加拿大的经典景点</p>
                <div className="text-3xl font-bold text-indigo-600">¥1,999</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-pink-400 to-red-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Romantic Europe</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">浪漫欧洲之旅，体验法国、意大利、德国等国的文化魅力</p>
                <div className="text-3xl font-bold text-indigo-600">¥2,999</div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
                <h3 className="text-2xl font-bold text-white">Wild Africa</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">非洲野生动物大冒险，感受原始自然的震撼力量</p>
                <div className="text-3xl font-bold text-indigo-600">¥3,999</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
