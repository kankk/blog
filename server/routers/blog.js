const Router = require('koa-router')
const classController = require('../controllers/blog/classification')
const tagController = require('../controllers/blog/tag')
const articleController = require('../controllers/blog/article')
const apiAuth = require('../middleware/api-auth')

const blogRouter = new Router({
  prefix: '/blog'
})

blogRouter.use(apiAuth)

// 文章分类
blogRouter.get('/class/all', classController.getAllClassifications)
blogRouter.post('/class/add', classController.addClassification)
blogRouter.post('/class/delete', classController.deleteClassification)

// 文章标签
blogRouter.get('/tag/all', tagController.getAllTags)
blogRouter.post('/tag/add', tagController.addTag)
blogRouter.post('/tag/delete', tagController.deleteTag)

// 文章
blogRouter.post('/article/upload', articleController.uploading, articleController.uploaded)
blogRouter.post('/article/add', articleController.addArticle)
blogRouter.post('/article/delete', articleController.deleteArticle)

module.exports = blogRouter
