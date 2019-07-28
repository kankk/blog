const Router = require('koa-router')

const projectRouter = require('./project')

const apiRouter = new Router({
  prefix: '/api'
})

apiRouter.use(projectRouter.routes())

module.exports = apiRouter
