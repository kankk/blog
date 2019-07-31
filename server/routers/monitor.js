const Router = require('koa-router')
const monitorController = require('../controllers/monitor')
const apiAuth = require('../middleware/api-auth')

const monitorRouter = new Router({
  prefix: '/monitor'
})

monitorRouter.use(apiAuth)

monitorRouter.get('/cpu', monitorController.cpu)
monitorRouter.get('/memory', monitorController.memory)

module.exports = monitorRouter
