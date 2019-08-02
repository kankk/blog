<template>
  <div class="picture">
    <div class="content-cell">
      <file-button name="picture" @change="handleUploadPicture">
        上传图片
      </file-button>
    </div>
    <div class="content-cell">
      <div class="content-cell-label">
        图片列表
      </div>
      <div class="picture-list">
        <div v-for="p in pictures" :key="p.filename" class="picture-item">
          <div class="picture-item-name">
            {{ p.filename }}
          </div>
          <div class="picture-item-operate">
            <span class="operate-item picture-open" @click="handleOpenPicture(p)">查看</span>
            <span class="operate-item picture-link" @click="handleLinkPicture(p)">链接</span>
            <input :id="p.filename" class="operate-item-hide" type="text">
            <span class="operate-item picture-delete" @click="handleDeletePicture(p)">删除</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FileButton from '~/components/dashboard/file-button.vue'
import PictureModal from '~/components/dashboard/picture-modal'
export default {
  name: 'Picture',
  components: {
    FileButton
  },
  data () {
    return {
      pictures: []
    }
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('/api/picture/all')
    return { pictures: res.data }
  },
  methods: {
    // 获取所有图片
    async getAllPictures () {
      const res = await this.$axios.get('/api/picture/all')
      if (res.code === 200) {
        this.pictures = res.data
      } else {
        // 获取图片失败
      }
    },
    // 上传图片
    async handleUploadPicture (e) {
      const targetElement = e.srcElement
      const fd = new FormData()
      fd.append('picture', targetElement.files[0])
      const res = await this.$axios.post('/api/picture/upload', fd)
      if (res.code === 200) {
        this.getAllPictures()
      } else {
        // 上传图片失败
      }
    },
    // 查看图片
    handleOpenPicture (p) {
      PictureModal(Object.assign(p, {
        url: `${window.location.origin}/pictures/${p.filename}`
      }))
    },
    // 获取图片链接
    handleLinkPicture (p) {
      // 点击复制剪切功能
      const input = document.getElementById(p.filename)
      input.value = `${window.location.origin}/pictures/${p.filename}`
      input.select()
      document.execCommand('copy')
      // this.$message.success('复制成功')
    },
    // 删除图片
    async handleDeletePicture (p) {
      const confirmResult = confirm('确认删除图片?')
      if (confirmResult) {
        const res = await this.$axios.post(`/api/picture/delete`, {
          filename: p.filename
        })
        if (res.code === 200) {
          this.getAllPictures()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.picture {
  .picture-list {
    padding-top: 8px;
    .picture-item {
      display: flex;
      &:not(:last-child) {
        margin-bottom: 4px;
      }
      &:hover {
        cursor: pointer;
        background-color: $color-background;
      }
      .picture-item-name {
        flex: 1;
        color: $color-title;
      }
      .picture-item-operate {
        position: relative;
        .operate-item {
          opacity: 0.35;
          &:hover {
            cursor: pointer;
            opacity: 0.85;
          }
          &:not(:first-child) {
            margin-left: 4px;
          }
        }
        .operate-item-hide {
          position: absolute;
          bottom: 0;
          left: 0;
          opacity: 0;
          z-index: -10;
        }
        .picture-open {
          color: $color-text;
        }
        .picture-link {
          color: $color-normal;
        }
        .picture-delete {
          color: $color-error;
        }
      }
    }
  }
}
</style>
