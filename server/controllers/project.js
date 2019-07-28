async function queryAll (ctx) {
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: [],
    message: '成功'
  }
}

module.exports = {
  queryAll
}
