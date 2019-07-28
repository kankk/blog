<template>
  <div class="container">
    <div class="project-list">
      暂时没有发布内容喔!~
    </div>
  </div>
</template>

<script>
import { $get } from '~/plugins/axios'
export default {
  name: 'Project',
  layout: 'blog',
  data () {
    return {

    }
  },
  async asyncData () {
    const res = await $get('/api/project/all')
    console.log(res)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.container {
  .project-list {
    text-align: center;
    color: $color-title;
    padding: 8px;
    background-color: rgba(255, 255, 255, 0.85);
  }
}
</style>
