<template>
  <div id="dashboard-sidebar">
    <div class="sidebar-logo-wrap">
      <img class="sidebar-logo" src="~/assets/images/logo.png" alt="" @click="toHome">
    </div>
    <div class="sidebar-nav">
      <nuxt-link v-for="nav in navList" :key="nav.to" class="nav-item" tag="div" :to="`/dashboard${nav.to}`">
        <span>{{ nav.title }}</span>
      </nuxt-link>
    </div>
    <div class="logout" @click="logout">
      <span>退出</span>
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
          title: '图片',
          to: '/picture'
        },
        {
          title: 'Node 性能监控',
          to: '/monitor'
        }
      ]
    }
  },
  methods: {
    toHome () {
      this.$router.push('/')
    },
    async logout () {
      const res = await this.$axios.post('/api/user/logout')
      console.log(res.message)
      this.$router.replace('/login')
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
  padding-bottom: 50px;
  position: relative;
  .sidebar-logo-wrap {
    display: flex;
    justify-content: center;
    align-content: center;
    padding: 12px;
    .sidebar-logo {
      width: 48px;
      height: 48px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .sidebar-nav {
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
  .logout {
    position: absolute;
    display: flex;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 32px;
    box-shadow:0px -1px 4px 0px rgba(51,51,52,0.08);
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 16px;
    color: $color-title;
    letter-spacing: 12px;
    &:hover {
      cursor: pointer;
      color: $color-main;
      background-color: rgba(248, 181, 10, 0.1);
    }
  }
}
</style>
