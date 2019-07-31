const Router = require('koa-router')
const monitorController = require('../controllers/monitor')

const monitorRouter = new Router({
  prefix: '/monitor'
})

monitorRouter.get('/cpu', monitorController.cpu)
monitorRouter.get('/memory', monitorController.memory)

module.exports = monitorRouter
