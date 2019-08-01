const path = require('path')
const util = require('util')
const fs = require('fs')
const multer = require('koa-multer')

const picturePath = path.resolve(__dirname, '../../public/pictures')
const pictureExt = ['jpeg', 'jpg', 'png', 'gif'].map(item => `.${item}`)

// Promise 化
const readdir = util.promisify(fs.readdir)
const lstat = util.promisify(fs.lstat)
const unlink = util.promisify(fs.unlink)

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
  const isPictureExist = await isDirExist(picturePath)
  if (!isPictureExist) {
    fs.mkdir(picturePath, { recursive: true }, () => {})
  }
}

initDir()

const storage = multer.diskStorage({
  destination: (ctx, file, cb) => {
    cb(null, picturePath)
  },
  filename: (ctx, file, cb) => {
    cb(null, file.originalname)
  }
})

const uploading = multer({
  storage
}).single('picture')
const uploaded = (ctx) => {
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: null,
    message: '图片上传成功'
  }
}

const getAllPictures = async (ctx) => {
  const fileNames = await readdir(picturePath)
  const files = []
  for (const f of fileNames) {
    const stats = await lstat(path.resolve(picturePath, f))
    if (stats.isFile() && pictureExt.includes(path.extname(f).toLowerCase())) {
      files.push({
        filename: f,
        size: stats.size,
        time: stats.birthtime
      })
    }
  }
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: files,
    message: '获取所有图片成功'
  }
}

const deletePicture = async (ctx) => {
  const filename = ctx.params.filename
  if (!filename) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: null,
      message: '请求参数格式错误'
    }
    return
  }
  await unlink(path.resolve(picturePath, filename))
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: null,
    message: '删除图片成功'
  }
}

module.exports = {
  uploading,
  uploaded,
  getAllPictures,
  deletePicture
}
