const Koa = require('koa')
const consola = require('consola')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const { Nuxt, Builder } = require('nuxt')
const backConfig = require('../config/back.config.js')

const app = new Koa()

// 设置 keys
app.keys = backConfig.keys

// Import and Set Nuxt.js options
const config = require('../nuxt.config.js')
config.dev = app.env !== 'production'

const router = require('./routers/index')

async function start () {
  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  const host = backConfig.host || '127.0.0.1'
  const port = backConfig.port || 3000

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  } else {
    await nuxt.ready()
  }

  if (process.env.NODE_ENV === 'development') {
    app.use(cors({
      origin: '*',
      maxAge: 60 * 1000,
      credentials: true,
      allowMethods: ['GET', 'POST', 'DELETE', 'PUT'],
      allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With']
    }))
  }

  // 使用 ctx.body 解析中间件(koa-bodyparser)
  app.use(bodyParser())
  // Api 路由
  app.use(router.routes()).use(router.allowedMethods())

  app.use((ctx) => {
    ctx.status = 200
    ctx.respond = false // Bypass Koa's built-in response handling
    ctx.req.ctx = ctx // This might be useful later on, e.g. in nuxtServerInit or with nuxt-stash
    nuxt.render(ctx.req, ctx.res)
  })

  app.listen(port, host)
  consola.ready({
    message: `Server listening on http://${host}:${port}`,
    badge: true
  })
}

start()
