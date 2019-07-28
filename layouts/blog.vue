<template>
  <div id="blog">
    <m-header />
    <m-sidebar />
    <div class="wrap">
      <nuxt />
    </div>
    <m-footer />
  </div>
</template>

<script>
import MHeader from '../components/header'
import MSidebar from '../components/sidebar'
import MFooter from '../components/footer'
export default {
  components: {
    MHeader,
    MSidebar,
    MFooter
  }
}
</script>

<style lang="scss" scoped>
#blog {
  .wrap {
    width: 1000px;
    margin: 0 auto;
    box-sizing: border-box;
    min-height: 100vh;
    padding-top: 72px;
    padding-left: 200px;
  }
}
</style>
