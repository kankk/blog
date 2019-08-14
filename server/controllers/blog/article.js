const path = require('path')
// const util = require('util')
const fs = require('fs')
const multer = require('koa-multer')
const Markdown = require('markdown-it')
const hljs = require('highlight.js')
const db = require('../../database/db')
const dbHelper = require('../../helpers/database')

const tableName = 'Blog_Article'

function getHighLight (str, lang) {
  if (!!lang && hljs.getLanguage(lang)) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return '<pre class="hljs"><code>' +
          hljs.highlight(lang, str, true).value +
          '</code></pre>'
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + Markdown.utils.escapeHtml(str) + '</code></pre>'
  }

  return ''
}

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

const markdownToContent = (mdFileName) => {
  const data = fs.readFileSync(path.resolve(articlePath, mdFileName), {
    encoding: 'utf-8'
  })

  const md = new Markdown({
    html: true,
    highlight: getHighLight
  })

  return md.render(data)
}

// 获取上传文章
const uploading = multer({
  storage
}).single('article')
const uploaded = (ctx) => {
  ctx.stats = 200
  ctx.body = {
    code: 200,
    data: null,
    message: '上传文章成功'
  }
}

// 添加文章
const addArticle = async (ctx) => {
  const article = ctx.request.body
  const insertObj = {
    title: article.title,
    content: markdownToContent(article.filename),
    tags: article.tags,
    classification: article.classification,
    display: article.display ? 1 : 0
  }
  const result = await db.insert(tableName, insertObj)
  if (result.affectedRows > 0) {
    ctx.stats = 200
    ctx.body = {
      code: 200,
      data: null,
      message: '添加文章成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 400,
      data: {},
      message: '添加文章失败'
    }
  }
}

// 删除文章
const deleteArticle = async (ctx) => {
  const article = ctx.request.body
  if (!article || !article.id) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: null
      message: '请求参数格式错误'
    }
    return
  }

  const result = await db.delete(tableName, {
    where: {
      id: article.id,
    }
  });
  if (result.affectedRows > 0) {
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: null,
      message: '删除文章成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 400,
      data: null,
      message: '删除文章失败'
    }
  }
}

module.exports = {
  uploading,
  uploaded,
  addArticle,
  deleteArticle
}
