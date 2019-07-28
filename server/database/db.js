const mysql = require('mysql')
const config = require('../../config/back.config')

const db = {}

// 创建数据池
const pool = mysql.createPool(config.mysql)

db.query = (sql) => {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connection) => {
      connection.query(sql, (error, results, fields) => {
        if (error) { reject(error) }
        resolve(results)
        // 结束会话
        connection.release()

        // 如果有错误就抛出
        if (error) { reject(error) }
      })
      if (err) { reject(err) }
    })
  })
}

db.get = (tableName) => {

}

// INSERT
db.insert = (tableName = '', row = {}) => {
  const keys = Object.keys(row)
  const values = Object.values(row).map(value => mysql.escape(value))
  const sql = `INSERT INTO ${tableName} (${keys.join(', ')}) VALUES (${values.join(', ')})`
  return db.query(sql)
}

// UPDATE
db.update = (tableName = '', row = {}, options = {}) => {
  let whereTemp = ''
  if (options && options.hasOwnProperty('where')) {
    const whereEntries = Object.entries(options.where).map((value) => {
      return `${value[0]} = ${mysql.escape(value[1])}`
    })
    if (whereEntries.length > 0) { whereTemp = ` WHERE ${whereEntries.join(' AND ')}` }
  }
  const entries = Object.entries(row).map((value) => {
    return `${value[0]} = ${mysql.escape(value[1])}`
  })
  const sql = `UPDATE ${tableName} SET ${entries.join(', ')}${whereTemp}`
  console.log(sql)
  return db.query(sql)
}

// DELETE
db.delete = (tableName = '', options = {}) => {
  let whereTemp = ''
  if (options && options.hasOwnProperty('where')) {
    const whereEntries = Object.entries(options.where).map((value) => {
      return `${value[0]} = ${mysql.escape(value[1])}`
    })
    if (whereEntries.length > 0) { whereTemp = ` WHERE ${whereEntries.join(' AND ')}` }
  }
  const sql = `DELETE FROM ${tableName}${whereTemp}`
  return db.query(sql)
}

module.exports = db
