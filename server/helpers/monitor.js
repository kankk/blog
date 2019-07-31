const os = require('os')

// cpu
// 获取当前的瞬间 cpu 时间
const instantCpuTime = () => {
  let idleCpu = 0
  let tickCpu = 0
  const cpus = os.cpus()
  const cpuNumber = cpus.length

  for (let i = 0; i < cpuNumber; i++) {
    const cpu = cpus[i]
    for (const type of Object.keys(cpu.times)) {
      tickCpu += cpu.times[type]
    }
    idleCpu += cpu.times.idle
  }

  return {
    idle: idleCpu / cpuNumber,
    tick: tickCpu / cpuNumber
  }
}

// cpu 指标
const cpuMetrics = (offset = 1000) => {
  const startQuantize = instantCpuTime()
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const endQuantize = instantCpuTime()
      const idleDiff = endQuantize.idle - startQuantize.idle
      const tickDiff = endQuantize.tick - startQuantize.tick

      resolve(1 - (idleDiff / tickDiff))
    }, offset)
  })
}

// process.memoryUsage()
// rss: 表示 Node 进程占用的内存总量
// heapTotal: 表示堆内存的总量
// heapUsed: 实际堆内存的使用量
// external: 外部程序的内存使用量, 包含 Node 核心的 C++ 程序的内存使用量

// 内存指标
const memoryMetrics = () => {
  // 当前 Node 进程内存堆栈情况
  const { rss, heapUsed, heapTotal } = process.memoryUsage()
  // 获取系统空间内存
  const sysFree = os.freemem()
  // 获取系统总内存
  const sysTotal = os.totalmem()

  return {
    sys: 1 - sysFree / sysTotal, // 系统内存占用率
    heap: heapUsed / heapTotal, // Node 堆内存占用率
    node: rss / sysTotal, // Node 占用系统内存的比例
    heapUsed, // Node 堆内存使用量
    heapTotal // Node 堆内存总量
  }
}

module.exports = {
  cpuMetrics,
  memoryMetrics
}
