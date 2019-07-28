const db = require('../database/db')

const tableName = 'Project'

const queryAll = async (ctx) => {
  const result = await db.queryAll(tableName)
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: result || [],
    message: '成功'
  }
}

module.exports = {
  queryAll
}
