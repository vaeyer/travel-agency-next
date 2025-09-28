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
      NODE_ENV: 'production'
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