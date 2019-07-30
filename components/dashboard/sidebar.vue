<template>
  <div id="dashboard-sidebar">
    <div class="sidebar-nav">
      <nuxt-link v-for="nav in navList" :key="nav.to" class="nav-item" tag="div" :to="`/dashboard${nav.to}`">
        <span>{{ nav.title }}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Sidebar',
  data () {
    return {
      navList: [
        {
          title: '首页',
          to: ''
        },
        {
          title: 'Node 监控',
          to: '/monitor'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
$sidebar-width: 250px;
#dashboard-sidebar {
  width: $sidebar-width;
  flex-basis: $sidebar-width;
  box-sizing: border-box;
  overflow-y: auto;
  background-color: #fff;
  border-right: $color-border;
  box-shadow:0px 1px 4px 0px rgba(51,51,52,0.08);
  .sidebar-nav {
    padding: 20px 0px;
    .nav-item {
      color: #333;
      font-size: 16px;
      padding: 12px 20px;
      &:hover, &.active {
        color: $color-main;
        background-color: rgba(0, 0, 0, 0.05);
        cursor: pointer;
      }
    }
    .nav-item.nuxt-link-exact-active {
      color: $color-main;
      background-color: rgba(248, 181, 10, 0.1);
    }
  }
}
</style>
