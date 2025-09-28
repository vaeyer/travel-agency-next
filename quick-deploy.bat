@echo off
echo ===================================
echo    Travel Agency - Quick Deploy
echo ===================================
echo.

echo [1] 检查项目状态...
npm run build
if %ERRORLEVEL% neq 0 (
    echo 构建失败，请检查错误信息
    pause
    exit /b 1
)

echo.
echo [2] 项目构建成功！
echo.

echo [3] 创建部署包...
echo 正在压缩项目文件...

:: 创建部署包目录
if not exist "deployment" mkdir deployment

:: 复制必要文件到部署目录（排除不需要的文件）
robocopy . deployment /E /XD node_modules .git /XF *.log npm-debug.log* yarn-debug.log* yarn-error.log* .DS_Store

echo.
echo [4] 部署包已创建在 'deployment' 文件夹中
echo.

echo ===================================
echo     部署选项
echo ===================================
echo 1. 直接上传: 压缩 'deployment' 文件夹并上传到 EdgeOne Pages
echo 2. Git 部署: 推送到 GitHub/GitLab，然后在 EdgeOne Pages 连接仓库
echo.

echo 需要配置的环境变量:
echo - NEXT_PUBLIC_SUPABASE_URL
echo - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo - SUPABASE_SERVICE_ROLE_KEY
echo - WECHAT_APP_ID
echo - WECHAT_MCH_ID
echo - WECHAT_PAY_KEY
echo - WECHAT_NOTIFY_URL
echo - JWT_SECRET
echo - NODE_ENV=production
echo.

echo EdgeOne Pages 构建设置:
echo - 框架: Next.js
echo - 构建命令: npm run build
echo - 输出目录: .next
echo - Node.js 版本: 18.x
echo.

echo 准备就绪！请参考 DEPLOYMENT_GUIDE.md 了解详细步骤。
pause