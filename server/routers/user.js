const Router = require('koa-router')
const userController = require('../controllers/user')

const userRouter = new Router({
  prefix: '/user'
})

userRouter.post('/login', userController.login)
userRouter.post('/register', userController.register)
userRouter.post('/password', userController.changePassword)
// userRouter.post('/verify', userController.tokenVerify)
userRouter.post('/logout', userController.logout)

module.exports = userRouter
