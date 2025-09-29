import crypto from 'crypto'

export interface WeChatPayOrder {
  out_trade_no: string
  total_fee: number
  body: string
  notify_url: string
}

export function generateWeChatPayParams(order: WeChatPayOrder) {
  const params = {
    appid: process.env.WECHAT_APP_ID || 'demo_app_id',
    mch_id: process.env.WECHAT_MCH_ID || 'demo_mch_id',
    nonce_str: generateNonceStr(),
    body: order.body,
    out_trade_no: order.out_trade_no,
    total_fee: order.total_fee,
    spbill_create_ip: process.env.WECHAT_SPBILL_CREATE_IP || '127.0.0.1',
    notify_url: order.notify_url,
    trade_type: 'NATIVE' // 扫码支付
  }

  const sign = generateSign(params)
  return { ...params, sign }
}

function generateNonceStr(): string {
  return crypto.randomBytes(16).toString('hex')
}

export function generateSign(params: Record<string, string | number>): string {
  const sortedKeys = Object.keys(params).sort()
  const stringA = sortedKeys
    .map(key => `${key}=${params[key]}`)
    .join('&')

  const stringSignTemp = `${stringA}&key=${process.env.WECHAT_PAY_KEY || 'demo_pay_key'}`

  return crypto
    .createHash('md5')
    .update(stringSignTemp, 'utf8')
    .digest('hex')
    .toUpperCase()
}

export function parseXML(xml: string): Record<string, string> {
  const result: Record<string, string> = {}
  const regex = /<(\w+)><!\[CDATA\[(.*?)\]\]><\/\1>|<(\w+)>(.*?)<\/\3>/g
  let match

  while ((match = regex.exec(xml)) !== null) {
    const key = match[1] || match[3]
    const value = match[2] || match[4]
    result[key] = value
  }

  return result
}

export function buildXML(params: Record<string, string | number>): string {
  let xml = '<xml>'
  for (const [key, value] of Object.entries(params)) {
    xml += `<${key}><![CDATA[${value}]]></${key}>`
  }
  xml += '</xml>'
  return xml
}