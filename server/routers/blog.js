const Router = require('koa-router')
const classController = require('../controllers/blog/classification')
const tagController = require('../controllers/blog/tag')
const apiAuth = require('../middleware/api-auth')

const blogRouter = new Router({
  prefix: '/blog'
})

blogRouter.use(apiAuth)

blogRouter.get('/class/all', classController.getAllClassifications)
blogRouter.post('/class/add', classController.addClassification)
blogRouter.post('/class/delete', classController.deleteClassification)

blogRouter.get('/tag/all', tagController.getAllTags)
blogRouter.post('/tag/add', tagController.addTag)
blogRouter.post('/tag/delete', tagController.deleteTag)

module.exports = blogRouter
