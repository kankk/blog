<template>
  <header id="header">
    <div class="header-content">
      <div class="header-left">
        <img class="logo" src="~/assets/images/logo.png" alt="">
        <div class="name">
          Mangokk' Blog
        </div>
      </div>
      <div class="header-right">
        <!-- <img class="github" src="~/assets/images/github.svg" alt="" @click="toGithub"> -->
      </div>
    </div>
    <div class="github-logo">
      <img class="github" src="~/assets/images/github.svg" alt="" @click="toGithub">
    </div>
  </header>
</template>

<script>
export default {
  methods: {
    toGithub () {
      window.open('https://github.com/kankk/blog', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
#header {
  height: 60px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  background-color: rgba(255, 255, 255, 0.6);
  .header-content {
    width: 1000px;
    margin: 0 auto;
    height: 100%;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: stretch;
    .header-left {
      display: flex;
      align-items: center;
      .logo {
        width: 32px;
        height: 32px;
        margin-left: 85px;
        margin-right: 85px;
      }
      .name {
        font-size: 16px;
        color: $color-main;
      }
    }
    .header-right {
      display: flex;
      align-items: center;
      .github {
        width: 24px;
        height: 24px;
        transition: all 0.2s ease-out;
        opacity: 0.65;
        &:hover {
          transform: scale(1.1);
          opacity: 1;
          cursor: pointer;
        }
      }
    }
  }
  .github-logo {
    position: absolute;
    top: 50%;
    right: 12px;
    transform: translateY(-50%);
    .github {
      width: 24px;
      height: 24px;
      transition: all 0.2s ease-out;
      opacity: 0.65;
      &:hover {
        transform: scale(1.1);
        opacity: 1;
        cursor: pointer;
      }
    }
  }
}
</style>
