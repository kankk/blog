const Router = require('koa-router')

const projectRouter = require('./project')
const userRouter = require('./user')

const apiRouter = new Router({
  prefix: '/api'
})

apiRouter.use(projectRouter.routes())
apiRouter.use(userRouter.routes())

module.exports = apiRouter
