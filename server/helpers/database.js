const crypto = require('crypto')
const uuidv4 = require('uuid/v4')

// 获取uuid
const getDatabaseID = () => uuidv4()

// 获取随机盐值
const getSalt = () => {
  const salt = uuidv4()
  const sha256 = crypto.createHash('sha256')
  return sha256.update(salt).digest('hex')
}

// 获取sha256加密字符串
const getCryptoString = (str) => {
  const sha256 = crypto.createHash('sha256')
  return sha256.update(str).digest('hex')
}

module.exports = {
  getDatabaseID,
  getSalt,
  getCryptoString
}
