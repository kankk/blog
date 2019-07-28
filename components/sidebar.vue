<template>
  <aside id="sidebar">
    <div class="sidebar-nav">
      <nuxt-link class="nav-item" tag="span" to="/">
        <img v-if="currentRouteName === 'index'" class="nav-item-icon" src="~/assets/images/navs/home_s.png" alt="">
        <img v-else class="nav-item-icon" src="~/assets/images/navs/home.png" alt="">
        <span>技术文章</span>
      </nuxt-link>
      <nuxt-link class="nav-item" tag="span" to="/project">
        <img v-if="currentRouteName === 'project'" class="nav-item-icon" src="~/assets/images/navs/project_s.png" alt="">
        <img v-else class="nav-item-icon" src="~/assets/images/navs/project.png" alt="">
        <span>个人项目</span>
      </nuxt-link>
      <nuxt-link class="nav-item" tag="span" to="/about">
        <img v-if="currentRouteName === 'about'" class="nav-item-icon" src="~/assets/images/navs/about_s.png" alt="">
        <img v-else class="nav-item-icon" src="~/assets/images/navs/about.png" alt="">
        <span>Mangokk</span>
      </nuxt-link>
    </div>
  </aside>
</template>

<script>
export default {
  computed: {
    currentRouteName () {
      return this.$route.name
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
#sidebar {
  position: fixed;
  top: 72px;
  width: 160px;
  left: calc((100vw - 1000px) / 2);
  .sidebar-nav {
    display: flex;
    flex-direction: column;
    .nav-item {
      display: flex;
      align-items: center;
      color: $color-text;
      font-size: 14px;
      padding: 8px 12px;
      margin-bottom: 8px;
      border-radius: 4px;
      .nav-item-icon {
        width: 14px;
        height: 14px;
        margin-right: 12px;
      }
      &:hover {
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
