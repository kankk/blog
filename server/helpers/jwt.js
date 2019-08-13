const crypto = require('crypto')
const backConfig = require('../../config/back.config')

const header = backConfig.jwt.header
const secret = backConfig.jwt.secret

const base64UrlEncode = (str) => {
  const data = typeof str === 'number' ? str.toString() : str

  return Buffer.from(data).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
}

const base64UrlDecode = (str) => {
  str += new Array(5 - str.length % 4).join('=')
  str = str.replace(/-/g, '+').replace(/_/g, '/')
  return Buffer.from(str, 'base64').toString('utf8')
}

const verify = (token = '', isVerifyExpires = false) => {
  try {
    const args = token.split('.')
    if (args.length !== 3) {
      return false
    }
    const base64Header = args[0]
    const base64Payload = args[1]
    const base64Sign = args[2]

    const _header = JSON.parse(base64UrlDecode(base64Header))
    const securedInput = `${base64Header}.${base64Payload}`
    const signature = crypto.createHmac(_header.alg, secret).update(securedInput).digest()
    const _base64Sign = base64UrlEncode(signature)

    let isExpires = false
    if (isVerifyExpires) {
      const payload = decode(token)
      const expires = payload.expires || 0
      isExpires = expires < (+new Date())
    }

    return _base64Sign === base64Sign && !isExpires
  } catch (err) {
    return false
  }
}

const decode = (token = '') => {
  try {
    const args = token.split('.')
    if (args.length !== 3) {
      return false
    }
    const base64Payload = args[1]

    return JSON.parse(base64UrlDecode(base64Payload))
  } catch (err) {
    throw new Error(err)
  }
}

const sign = (payload, ttl = 30 * 60 * 1000) => {
  if (!payload.expires || typeof payload.expires !== 'number') {
    payload.expires = +new Date() + ttl
  }
  const payloadStr = typeof payload === 'string' ? payload : JSON.stringify(payload)
  const base64Header = base64UrlEncode(JSON.stringify(header))
  const base64Payload = base64UrlEncode(payloadStr)
  const securedInput = `${base64Header}.${base64Payload}`
  const signature = crypto.createHmac(header.alg, secret).update(securedInput).digest()
  const base64Sign = base64UrlEncode(signature)

  return `${base64Header}.${base64Payload}.${base64Sign}`
}

module.exports = {
  sign,
  decode,
  verify
}
