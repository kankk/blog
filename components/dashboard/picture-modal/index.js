import Vue from 'vue'
import Component from './index.vue'

const ModalConstructor = Vue.extend(Component)

let instance
let seed = 1

const defaultOptions = {
  url: '',
  filename: '',
  size: 0,
  time: '',
  zIndex: 2000
}

const PicturlModal = (options = {}) => {
  if (typeof options === 'string') {
    options = Object.assign(defaultOptions, {
      url: options
    })
  }

  const id = `picture-modal-${seed++}`

  if (instance && instance.visible) {
    instance.close()
  }

  instance = new ModalConstructor({
    data: options
  })

  instance.id = id
  instance.$mount()
  document.body.appendChild(instance.$el)
  instance.visible = true
  instance.$el.style.zIndex = options.zIndex
  return instance
}

export default PicturlModal
