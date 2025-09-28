module.exports = {
  // 项目名称
  name: 'travel-agency',

  // 构建配置
  build: {
    // 构建命令
    command: 'npm run build',

    // 输出目录
    outputDirectory: '.next',

    // Node.js 版本
    nodeVersion: '18',

    // 环境变量 - 这些变量需要在EdgeOne Pages控制台中配置
    environment: {
      NODE_ENV: 'production'
      // 注意：以下环境变量需要在EdgeOne Pages控制台中手动配置：
      // NEXT_PUBLIC_SUPABASE_URL
      // NEXT_PUBLIC_SUPABASE_ANON_KEY  
      // SUPABASE_SERVICE_ROLE_KEY
      // JWT_SECRET
    }
  },

  // 路由配置
  routes: [
    {
      src: '/api/(.*)',
      dest: '/api/$1'
    },
    {
      src: '/(.*)',
      dest: '/$1'
    }
  ],

  // 函数配置
  functions: {
    // API 路由作为 Edge Functions
    'api/**': {
      runtime: 'edge'
    }
  },

  // 缓存配置
  cache: {
    // 静态资源缓存
    static: {
      maxAge: 31536000 // 1年
    },
    // 页面缓存
    pages: {
      maxAge: 0 // 不缓存动态页面
    }
  },

  // 重定向配置
  redirects: [
    {
      source: '/home',
      destination: '/',
      permanent: true
    }
  ],

  // 头部配置
  headers: [
    {
      source: '/api/(.*)',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-cache, no-store, must-revalidate'
        }
      ]
    }
  ]
}