<template>
  <transition name="picutre-modal" @after-leave="handleAfterLeave">
    <div v-show="visible" class="picutre-modal" @click="visible = false">
      <img class="picutre-modal-img" :src="url" alt="">
      <div class="picture-modal-info">
        <div v-if="filename" class="picture-modal-info-item">
          文件名： {{ filename }}
        </div>
        <div v-if="filename" class="picture-modal-info-item">
          文件大小： {{ formatSize }}
        </div>
        <div v-if="filename" class="picture-modal-info-item">
          日期：{{ formatTime }}
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'PictureModal',
  data () {
    return {
      visible: false,
      url: '',
      filename: '',
      size: 0,
      time: ''
    }
  },
  computed: {
    formatSize () {
      if (this.size) {
        const size = this.size
        if (size < 1024) {
          return `${size}B`
        } else if (size < 1024 ** 2) {
          return `${(size / 1024).toFixed(2)}KB`
        } else {
          return `${(size / 1024 ** 2).toFixed(2)}MB`
        }
      }
      return 0
    },
    formatTime () {
      if (this.time) {
        return new Date(this.time).toLocaleString()
      }
      return ''
    }
  },
  methods: {
    handleAfterLeave () {
      if (typeof this.onClose === 'function') {
        this.onClose()
      }
      this.$destroy(true)
      this.$el.parentNode.removeChild(this.$el)
    },
    close () {
      this.handleAfterLeave()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.picutre-modal {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  box-sizing: border-box;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .picture-modal-info {
    margin-top: 12px;
    .picture-modal-info-item {
      color: #fff;
      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }
}
// 轻提示动画
.picutre-modal-enter-active, .picutre-modal-leave-active {
  transition: opacity .1s ;
}
.picutre-modal-enter, .picutre-modal-leave-to {
  opacity: 0;
}
</style>
