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

    // 环境变量
    environment: {
      NODE_ENV: 'production',
      NEXT_PUBLIC_SUPABASE_URL: 'https://ushkxsxbnuurusvrfqvc.supabase.co',
      NEXT_PUBLIC_SUPABASE_ANON_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGt4c3hibnV1cnVzdnJmcXZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNjMxOTgsImV4cCI6MjA3NDYzOTE5OH0.IrV-QGnrxo',
      SUPABASE_SERVICE_ROLE_KEY: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVzaGt4c3hibnV1cnVzdnJmcXZjIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1OTA2MzE5OCwiZXhwIjoyMDc0NjM5MTk4fQ.vgaBY4ri9ZY_Osa_mJeGFm7u0LZYqFJBdRI7kyWVsBQ',
      JWT_SECRET: 'your-super-secret-jwt-key-change-this-in-production'
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