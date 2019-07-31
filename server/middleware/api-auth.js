const jwt = require('../helpers/jwt')

module.exports = async (ctx, next) => {
  const token = ctx.request.header.token
  if (jwt.verify(token, true)) {
    await next()
  } else {
    ctx.status = 401
    ctx.body = {
      code: 401,
      data: null,
      message: '登录失效'
    }
  }
}
