@echo off
echo ========================================
echo    Travel Agency - EdgeOne Pages 部署
echo ========================================
echo.

echo [1/4] 检查项目状态...
if not exist "package.json" (
    echo ❌ 错误: 未找到 package.json 文件
    pause
    exit /b 1
)
echo ✅ 项目文件检查完成

echo.
echo [2/4] 安装依赖...
call npm install
if %errorlevel% neq 0 (
    echo ❌ 依赖安装失败
    pause
    exit /b 1
)
echo ✅ 依赖安装完成

echo.
echo [3/4] 构建项目...
call npm run build
if %errorlevel% neq 0 (
    echo ❌ 项目构建失败
    pause
    exit /b 1
)
echo ✅ 项目构建完成

echo.
echo [4/4] 准备部署文件...
if exist "deploy.zip" del "deploy.zip"
powershell -Command "Compress-Archive -Path '.\*' -DestinationPath 'deploy.zip' -Force"
if %errorlevel% neq 0 (
    echo ❌ 部署包创建失败
    pause
    exit /b 1
)
echo ✅ 部署包创建完成: deploy.zip

echo.
echo ========================================
echo           部署准备完成！
echo ========================================
echo.
echo 📁 部署文件: deploy.zip
echo 🌐 下一步: 在 EdgeOne Pages 控制台上传 deploy.zip
echo 🔗 控制台地址: https://console.cloud.tencent.com/edgeone/pages
echo.
echo ⚠️  重要: 环境变量配置
echo 请在 EdgeOne Pages 控制台中配置以下环境变量:
echo - NEXT_PUBLIC_SUPABASE_URL
echo - NEXT_PUBLIC_SUPABASE_ANON_KEY
echo - SUPABASE_SERVICE_ROLE_KEY
echo - JWT_SECRET
echo - NODE_ENV=production
echo.
echo 📖 详细配置说明请查看: ENVIRONMENT_VARIABLES.md
echo.
pause
