const mysql = require('mysql')
const db = require('../../database/db')
const dbHelper = require('../../helpers/database')

const tableName = 'Blog_Classification'

// 获取所有分类
const getAllClassifications = async (ctx) => {
  const result = await db.getAll(tableName)
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: result || [],
    message: '获取分类成功'
  }
}

// 添加分类
const addClassification = async (ctx) => {
  const classification = ctx.request.body
  if (!classification || !classification.name) {
    ctx.status = 400
    ctx.body = {
      code: 400,
      data: null,
      message: '请求参数格式错误'
    }
    return
  }
  const id = dbHelper.getDatabaseID()
  Object.assign(classification, {
    id
  })
  const result = await db.insert(tableName, classification)
  if (result.affectedRows > 0) {
    // const sql = `SELECT * FROM ${tableName} WHERE id = '${id}'`
    // const queryResult = await db.query(sql)
    ctx.status = 200
    ctx.body = {
      code: 200,
      data: null,
      // data: queryResult[0],
      message: '添加分类成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 500,
      data: null,
      message: '添加分类失败'
    }
  }
}

// 删除分类
const deleteClassification = async (ctx) => {
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
      message: '删除分类成功'
    }
  } else {
    ctx.status = 200
    ctx.body = {
      code: 500,
      data: null,
      message: '删除分类失败'
    }
  }
}

module.exports = {
  getAllClassifications,
  addClassification,
  deleteClassification
}
