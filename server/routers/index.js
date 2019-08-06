const Router = require('koa-router')

const projectRouter = require('./project')
const userRouter = require('./user')
const monitorRouter = require('./monitor')
const pictureRouter = require('./picture')
const blogRouter = require('./blog')

const apiRouter = new Router({
  prefix: '/api'
})

apiRouter.use(projectRouter.routes())
apiRouter.use(userRouter.routes())
apiRouter.use(monitorRouter.routes())
apiRouter.use(pictureRouter.routes())
apiRouter.use(blogRouter.routes())

module.exports = apiRouter
