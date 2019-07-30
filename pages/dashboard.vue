<template>
  <div id="dashboard">
    <m-sidebar />
    <m-content>
      <nuxt-child />
    </m-content>
  </div>
</template>

<script>
import MSidebar from '~/components/dashboard/sidebar.vue'
import MContent from '~/components/dashboard/content.vue'
export default {
  name: 'Dashboard',
  middleware: 'auth',
  components: {
    MSidebar,
    MContent
  }
}
</script>

<style lang="scss" scoped>
#dashboard {
  width: 100%;
  height: 100vh;
  box-sizing: border-box;
  overflow: hidden;
  display: flex;
  align-items: stretch;
}
</style>
