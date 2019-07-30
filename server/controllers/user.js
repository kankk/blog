const mysql = require('mysql')
const db = require('../database/db')
const dbHelper = require('../helpers/database')
const jwt = require('../helpers/jwt')

const tableName = 'User'

// 注册校验
const registerValidate = (user = {}) => {
  // 用户名, 密码, 加密密码不能为空
  if (!user.username || !user.password || !user.enPassword) {
    return false
  }

  // 用户名长度不能少于6位或者大于15位
  if (user.username.length < 6 || user.username.length > 15) {
    return false
  }

  // 用户名和密码不能拥有非法字符
  if (/[^A-Za-z0-9]/.test(user.username)) {
    return false
  }

  return true
}

// 修改密码校验
const changePasswordValidate = (user = {}) => {
  // 用户名id, 密码, 加密密码不能为空
  if (!user.id || !user.password || !user.enPassword) {
    return false
  }

  return true
}

// 登录校验
const loginValidate = (user) => {
  if (!user.username || !user.password) {
    return false
  }

  // 用户名长度不能少于6位或者大于15位
  if (user.username.length < 6 || user.username.length > 15) {
    return false
  }

  // 用户名和密码不能拥有非法字符
  if (/[^A-Za-z0-9]/.test(user.username)) {
    return false
  }

  return true
}

const register = async (ctx) => {
  const user = ctx.request.body
  if (!registerValidate(user)) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: {},
      message: '请求参数格式错误'
    }
    return
  }
  const querySQL = `SELECT * FROM ${tableName} WHERE username=${mysql.escape(user.username)}`
  const queryResult = await db.query(querySQL)
  if (queryResult.length) {
    ctx.status = 200
    ctx.body = {
      code: 400,
      data: {},
      message: '该用户名已经存在'
    }
  } else {
    const salt = dbHelper.getSalt()
    const insertResult = await db.insert(tableName, {
      id: dbHelper.getDatabaseID(),
      username: user.username,
      password: dbHelper.getCryptoString(salt + user.enPassword),
      salt
    })
    if (insertResult.affectedRows > 0) {
      ctx.status = 200
      ctx.body = {
        code: 200,
        data: {},
        message: '用户注册成功'
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 400,
        data: {},
        message: '用户注册失败'
      }
    }
  }
}

// 修改密码
const changePassword = async (ctx) => {
  const user = ctx.request.body
  if (!changePasswordValidate(user)) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: {},
      message: '请求参数格式错误'
    }
  }

  const salt = dbHelper.getSalt()
  const result = await db.update(tableName, {
    password: dbHelper.getCryptoString(salt + user.enPassword),
    salt
  }, {
    where: {
      id: user.id
    }
  })
  if (result.affectedRows > 0) {
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: {},
      message: '修改密码成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 400,
      data: null,
      message: '修改密码失败'
    }
  }
}

// 登录
const login = async (ctx) => {
  const user = ctx.request.body
  if (!loginValidate(user)) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: {},
      message: '请求参数格式错误'
    }
  }
  const sql = `SELECT * FROM ${tableName} WHERE username='${user.username}'`
  const result = await db.query(sql)
  const queryUser = result[0]
  if (queryUser) {
    const salt = queryUser.salt
    const enPassword = dbHelper.getCryptoString(salt + user.password)
    if (enPassword === queryUser.password) {
      const ttl = 30 * 60 * 1000
      // 生成 Token
      const token = jwt.sign({
        id: queryUser.id,
        username: queryUser.username,
        expires: +new Date() + ttl
      })
      const resUser = {
        token
      }
      // 生成 Cookie
      ctx.cookies.set('token', token, {
        signed: true,
        maxAge: ttl
      })
      ctx.status = 200
      ctx.body = {
        code: 200,
        data: resUser,
        message: '登录成功'
      }
    } else {
      ctx.status = 200
      ctx.body = {
        code: 400,
        data: {},
        message: '用户名或者密码错误'
      }
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 400,
      data: {},
      message: '用户名或者密码错误'
    }
  }
}

const tokenVerify = (ctx) => {
  const data = ctx.request.body
  if (!data || !data.token) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: {},
      message: '请求参数格式错误'
    }
  }

  const token = data.token
  if (jwt.verify(token, true)) {
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: {},
      message: '用户登录状态校验成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 401,
      data: {},
      message: '用户登录状态校验失败'
    }
  }
}

const logout = (ctx) => {
  ctx.cookies.set('token', '', {
    signed: true,
    maxAge: 0
  })
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: null,
    message: '登出成功'
  }
}

module.exports = {
  register,
  changePassword,
  login,
  tokenVerify,
  logout
}
