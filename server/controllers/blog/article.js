const path = require('path')
// const util = require('util')
const fs = require('fs')
const multer = require('koa-multer')

// Promise 化
// const readdir = util.promisify(fs.readdir)
// const lstat = util.promisify(fs.lstat)
// const unlink = util.promisify(fs.unlink)

const articlePath = path.resolve(__dirname, '../../../public/articles')
// const articleExt = ['jpeg', 'jpg', 'png', 'gif'].map(item => `.${item}`)

// 判断文件夹是否存在
function isDirExist (path) {
  return new Promise((resolve, reject) => {
    try {
      fs.open(path, 'r', (err, fd) => {
        // 文件夹不存在
        if (err && err.code === 'ENOENT') {
          resolve(false)
        } else {
          resolve(true)
        }
      })
    } catch (err) {
      reject(err)
    }
  })
}

// 初始化文件夹
async function initDir () {
  const isArticleExist = await isDirExist(articlePath)
  if (!isArticleExist) {
    fs.mkdir(articlePath, { recursive: true }, () => {})
  }
}

initDir()

const storage = multer.diskStorage({
  destination: (ctx, file, cb) => {
    cb(null, articlePath)
  },
  filename: (ctx, file, cb) => {
    cb(null, file.originalname)
  }
})

// 获取上传文章
const uploading = multer({
  storage
}).single('article')
const uploaded = (ctx) => {
  ctx.stats = 200
  ctx.body = {
    result: true,
    data: {},
    message: '上传文章成功'
  }
}

const addArticle = async (ctx) => {

}

module.exports = {
  uploading,
  uploaded,
  addArticle
}
