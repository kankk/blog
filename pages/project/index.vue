<template>
  <div class="container">
    <div class="project-list">
      暂时没有发布内容喔!~
    </div>
  </div>
</template>

<script>
export default {
  name: 'Project',
  layout: 'blog',
  data () {
    return {

    }
  },
  async asyncData ({ $axios }) {
    const res = await $axios.get('/api/project/all')
    return { projectList: res.data }
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
