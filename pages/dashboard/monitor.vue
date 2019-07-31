<template>
  <div class="monitor">
    <div class="monitor-cell">
      <div class="monitor-cell-label">
        CPU
      </div>
      <div class="monitor-cell-content">
        <div class="monitor-item">
          <div class="monitor-item-label">
            占用率
          </div>
          <div class="monitor-item-data">
            {{ cpu }}
          </div>
        </div>
      </div>
      <div />
    </div>
    <div class="monitor-cell">
      <div class="monitor-cell-label">
        内存
      </div>
      <div class="monitor-cell-content">
        <div class="monitor-item">
          <div class="monitor-item-label">
            Node 堆内存占用率
          </div>
          <div class="monitor-item-data">
            {{ memory.heap }}
          </div>
        </div>
        <div class="monitor-item">
          <div class="monitor-item-label">
            Node 堆内存使用量
          </div>
          <div class="monitor-item-data">
            {{ memory.heapUsed }}
          </div>
        </div>
        <div class="monitor-item">
          <div class="monitor-item-label">
            Node 堆内存总量
          </div>
          <div class="monitor-item-data">
            {{ memory.heapTotal }}
          </div>
        </div>
        <div class="monitor-item">
          <div class="monitor-item-label">
            系统内存占用率
          </div>
          <div class="monitor-item-data">
            {{ memory.sys }}
          </div>
        </div>
        <div class="monitor-item">
          <div class="monitor-item-label">
            Node 占用系统内存的比例
          </div>
          <div class="monitor-item-data">
            {{ memory.node }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// 格式化占用率
function formatPercentage (data) {
  if (typeof data === 'number') {
    return (data * 100).toFixed(1) + ' %'
  } else {
    return '-'
  }
}

// 格式化字节数
function formatByteSize (data) {
  if (typeof data === 'number') {
    return (data / 1024 / 1024).toFixed(1) + ' Mb'
  } else {
    return '-'
  }
}

export default {
  name: 'Monitor',
  data () {
    return {
      cpu: '-',
      memory: {
        sys: '-',
        heap: '-',
        node: '-',
        heapUsed: '-',
        heapTotal: '-'
      },

      freshTimer: null
    }
  },
  mounted () {
    this.freshMetricsData()
  },
  beforeDestroy () {
    clearTimeout(this.freshTimer)
  },
  methods: {
    async freshMetricsData () {
      // 轮询
      if (this.freshTimer) { clearTimeout(this.freshTimer) }
      this.freshTimer = setTimeout(() => {
        this.freshMetricsData()
      }, 5000)
      // 请求数据
      const cpuRes = await this.$axios.get('/api/monitor/cpu')
      if (cpuRes.code === 200) {
        if (typeof cpuRes.data === 'number') {
          this.cpu = formatPercentage(cpuRes.data)
        }
      }
      const memoryRes = await this.$axios.get('/api/monitor/memory')
      if (memoryRes.code === 200) {
        if (memoryRes.data) {
          const data = memoryRes.data
          try {
            this.memory = {
              sys: formatPercentage(data.sys),
              heap: formatPercentage(data.heap),
              node: formatPercentage(data.node),
              heapUsed: formatByteSize(data.heapUsed),
              heapTotal: formatByteSize(data.heapTotal)
            }
          } catch (err) {
            console.log(err)
          }
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.monitor {
  .monitor-cell {
    padding: 12px;
    background-color: #fff;
    margin-bottom: 12px;
    border-radius: 4px;
    box-shadow:0px 2px 4px 0px rgba(51,51,52,0.08);
    .monitor-cell-label {
      font-size: 24px;
      color: $color-title;
    }
    .monitor-cell-content {
      margin-top: 12px;
      .monitor-item {
        display: flex;
        align-items: center;
        &:not(:last-child) {
          margin-bottom: 16px;
        }
        .monitor-item-label {
          width: 250px;
          text-align: right;
          margin-right: 18px;
          color: $color-text;
        }
        .monitor-item-data {
          flex: 1;
          font-size: 18px;
          color: $color-success;
        }
      }
    }
  }
}
</style>
