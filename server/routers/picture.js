const Router = require('koa-router')
const pictureController = require('../controllers/picture')
const apiAuth = require('../middleware/api-auth')

const pictureRouter = new Router({
  prefix: '/picture'
})

pictureRouter.use(apiAuth)

pictureRouter.post('/upload', pictureController.uploading, pictureController.uploaded)
pictureRouter.get('/all', pictureController.getAllPictures)
pictureRouter.post('/delete/:filenmae', pictureController.deletePicture)

module.exports = pictureRouter
