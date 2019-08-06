<template>
  <transition name="dialog-modal">
    <div v-show="visible" class="dialog-modal">
      <div class="dialog" :style="{ 'width': normalizedWidth }">
        <div class="dialog-header">
          <slot name="header" />
        </div>
        <div class="dialog-content">
          <slot />
        </div>
        <div class="dialog-footer">
          <m-button inline type="default" class="dialog-footer-button" @click="handleCancel">
            取消
          </m-button>
          <m-button inline class="dialog-footer-button" @click="handleConfirm">
            确认
          </m-button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import MButton from '~/components/button.vue'
export default {
  name: 'Dialog',
  components: {
    MButton
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    width: {
      type: [String, Number],
      default: '300px',
      validator (value) {
        let isValid = false
        if ((!Number.isNaN(Number(value))) && value > 0) {
          isValid = true
        } else if (typeof value === 'string') {
          if (parseInt(value) > 0 && (value.endsWith('px') || value.endsWith('vw'))) {
            isValid = true
          }
        }
        return isValid
      }
    }
  },
  data () {
    return {

    }
  },
  computed: {
    normalizedWidth () {
      if (!Number.isNaN(Number(this.width))) {
        return `${this.width}px`
      } else {
        return this.width
      }
    }
  },
  methods: {
    handleConfirm () {
      this.$emit('confirm')
    },
    handleCancel () {
      this.$emit('cancel')
      this.$emit('update:visible', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.dialog-modal {
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
  .dialog {
    padding: 12px;
    background-color: #fff;
    border-radius: 4px;
    min-width: 300px;
    .dialog-header {
      text-align: center;
    }
    .dialog-content {
      padding: 12px 0px;
    }
    .dialog-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      .dialog-footer-button:not(:last-child) {
        margin-right: 8px;
      }
    }
  }
}
// 轻提示动画
.dialog-modal-enter-active, .dialog-modal-leave-active {
  transition: opacity .1s ;
}
.dialog-modal-enter, .dialog-modal-leave-to {
  opacity: 0;
}
</style>
