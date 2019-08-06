const Router = require('koa-router')
const classController = require('../controllers/blog/classification')
const apiAuth = require('../middleware/api-auth')

const blogRouter = new Router({
  prefix: '/blog'
})

blogRouter.use(apiAuth)

blogRouter.get('/class/all', classController.getAllClassifications)
blogRouter.post('/class/add', classController.addClassification)
blogRouter.post('/class/delete', classController.deleteClassification)

module.exports = blogRouter
