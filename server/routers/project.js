const Router = require('koa-router')
const projectController = require('../controllers/project')

const projectRouter = new Router({
  prefix: '/project'
})

projectRouter.get('/all', projectController.queryAll)

module.exports = projectRouter
