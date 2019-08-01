const Router = require('koa-router')

const projectRouter = require('./project')
const userRouter = require('./user')
const monitorRouter = require('./monitor')
const pictureRouter = require('./picture')

const apiRouter = new Router({
  prefix: '/api'
})

apiRouter.use(projectRouter.routes())
apiRouter.use(userRouter.routes())
apiRouter.use(monitorRouter.routes())
apiRouter.use(pictureRouter.routes())

module.exports = apiRouter
