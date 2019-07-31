const Router = require('koa-router')

const projectRouter = require('./project')
const userRouter = require('./user')
const monitorRouter = require('./monitor')

const apiRouter = new Router({
  prefix: '/api'
})

apiRouter.use(projectRouter.routes())
apiRouter.use(userRouter.routes())
apiRouter.use(monitorRouter.routes())

module.exports = apiRouter
