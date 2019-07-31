const monitor = require('../helpers/monitor')

const cpu = async (ctx) => {
  const cupData = await monitor.cpuMetrics()
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: cupData,
    message: 'cpu 性能数据'
  }
}

const memory = async (ctx) => {
  const memoryData = await monitor.memoryMetrics()
  ctx.status = 200
  ctx.body = {
    code: 200,
    data: memoryData,
    message: '内存性能数据'
  }
}

module.exports = {
  cpu,
  memory
}
