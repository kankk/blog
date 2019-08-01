<template>
  <div class="picture">
    <input type="file" name="picture" @change="handleUploadPicture">
  </div>
</template>

<script>
export default {
  name: 'Picture',
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
    // async getAllPictures () {

    // },
    // 上传图片
    async handleUploadPicture (e) {
      const targetElement = e.srcElement
      const fd = new FormData()
      fd.append('picture', targetElement.files[0])
      const res = await this.$axios.post('/api/picture/upload', fd)
      console.log(res)
    }
  }
}
</script>
