// 邮件发送工具
import nodemailer from 'nodemailer'

// 邮件配置接口
interface EmailConfig {
  host: string
  port: number
  secure: boolean
  auth: {
    user: string
    pass: string
  }
}

// 创建邮件传输器
function createTransporter() {
  const config: EmailConfig = {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.SMTP_USER || '',
      pass: process.env.SMTP_PASS || ''
    }
  }

  return nodemailer.createTransport(config)
}

// 获取站点URL
function getSiteUrl(): string {
  // 优先使用环境变量
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL
  }
  
  // 开发环境默认值
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  
  // 生产环境：从请求头或环境推断
  // 这里返回相对路径，让前端处理
  return ''
}

// 发送验证邮件
export async function sendVerificationEmail(email: string, verificationCode: string, name: string, requestUrl?: string) {
  try {
    const transporter = createTransporter()
    
    // 动态获取站点URL
    let siteUrl = getSiteUrl()
    if (!siteUrl && requestUrl) {
      // 从请求URL中提取协议和域名
      const url = new URL(requestUrl)
      siteUrl = `${url.protocol}//${url.host}`
    }
    
    const mailOptions = {
      from: `"Travel Agency" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '邮箱验证 - Travel Agency',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Travel Agency</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">探索世界，从这里开始</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">欢迎注册，${name}！</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              感谢您注册 Travel Agency 账户。为了确保账户安全，请验证您的邮箱地址。
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; border: 2px solid #e9ecef;">
              <p style="margin: 0 0 10px 0; color: #666; font-size: 14px;">您的验证码是：</p>
              <div style="font-size: 32px; font-weight: bold; color: #667eea; letter-spacing: 5px; margin: 10px 0;">
                ${verificationCode}
              </div>
              <p style="margin: 10px 0 0 0; color: #999; font-size: 12px;">
                验证码有效期为 10 分钟
              </p>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              <strong>新用户专享福利：</strong><br>
              • 注册即送 ¥1999 新用户优惠券<br>
              • 精选全球旅行套餐<br>
              • 24/7 客户服务支持
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${siteUrl}/verify-email?code=${verificationCode}&email=${encodeURIComponent(email)}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                立即验证邮箱
              </a>
            </div>
            
            <p style="color: #999; font-size: 12px; line-height: 1.5; margin-top: 30px;">
              如果您没有注册此账户，请忽略此邮件。<br>
              此邮件由系统自动发送，请勿回复。
            </p>
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Verification email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Failed to send verification email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 发送欢迎邮件
export async function sendWelcomeEmail(email: string, name: string, couponCode: string, requestUrl?: string) {
  try {
    const transporter = createTransporter()
    
    // 动态获取站点URL
    let siteUrl = getSiteUrl()
    if (!siteUrl && requestUrl) {
      // 从请求URL中提取协议和域名
      const url = new URL(requestUrl)
      siteUrl = `${url.protocol}//${url.host}`
    }
    
    const mailOptions = {
      from: `"Travel Agency" <${process.env.SMTP_USER}>`,
      to: email,
      subject: '欢迎加入 Travel Agency！',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">🎉 欢迎加入！</h1>
            <p style="color: white; margin: 10px 0 0 0; font-size: 16px;">您的账户已成功激活</p>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">恭喜，${name}！</h2>
            
            <p style="color: #666; line-height: 1.6; font-size: 16px;">
              您的邮箱已验证成功，现在可以开始探索我们的精选旅行套餐了！
            </p>
            
            <div style="background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; color: white;">
              <h3 style="margin: 0 0 10px 0; font-size: 20px;">🎁 新用户专享优惠券</h3>
              <div style="font-size: 24px; font-weight: bold; margin: 10px 0;">
                ${couponCode}
              </div>
              <p style="margin: 10px 0 0 0; font-size: 14px; opacity: 0.9;">
                价值 ¥1999，购买任意套餐即可使用
              </p>
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${siteUrl}/purchase" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold; display: inline-block;">
                立即查看套餐
              </a>
            </div>
            
            <p style="color: #666; line-height: 1.6; font-size: 14px;">
              <strong>接下来您可以：</strong><br>
              • 浏览精选旅行套餐<br>
              • 使用优惠券享受折扣<br>
              • 选择心仪的支付方式<br>
              • 开始您的精彩旅程
            </p>
          </div>
        </div>
      `
    }

    const result = await transporter.sendMail(mailOptions)
    console.log('Welcome email sent:', result.messageId)
    return { success: true, messageId: result.messageId }
  } catch (error) {
    console.error('Failed to send welcome email:', error)
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' }
  }
}

// 生成验证码
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}
