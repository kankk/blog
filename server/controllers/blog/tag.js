const db = require('../../database/db')
const dbHelper = require('../../helpers/database')

const tableName = 'Blog_Tag'

// 获取所有分类
const getAllTags = async (ctx) => {
  const result = await db.getAll(tableName)
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: result || [],
    message: '获取标签成功'
  }
}

// 添加分类
const addTag = async (ctx) => {
  const tag = ctx.request.body
  if (!tag || !tag.name) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: null,
      message: '请求参数格式错误'
    }
    return
  }
  const id = dbHelper.getDatabaseID()
  Object.assign(tag, {
    id
  })
  const result = await db.insert(tableName, tag)
  if (result.affectedRows > 0) {
    // const sql = `SELECT * FROM ${tableName} WHERE id = '${id}'`
    // const queryResult = await db.query(sql)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: null,
      // data: queryResult[0],
      message: '添加标签成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 500,
      data: null,
      message: '添加标签失败'
    }
  }
}

// 删除分类
const deleteTag = async (ctx) => {
  const deleteRequest = ctx.request.body
  if (!deleteRequest || !deleteRequest.id) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: null,
      message: '请求参数格式错误'
    }
    return
  }
  const deleteId = deleteRequest.id
  const result = await db.delete(tableName, {
    where: {
      id: deleteId
    }
  })
  if (result.affectedRows > 0) {
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: null,
      message: '删除标签成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 500,
      data: null,
      message: '删除标签失败'
    }
  }
}

module.exports = {
  getAllTags,
  addTag,
  deleteTag
}
