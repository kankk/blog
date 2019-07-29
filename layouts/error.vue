<template>
  <div id="error">
    <div class="error-content">
      <span class="error-content-code">{{ error.statusCode }}</span>
      <nuxt-link class="error-content-home" to="/" tag="span">
        首页
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    error: {
      type: Object,
      required: true
    }
  },
  mounted () {
    console.log(this.error)
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
#error {
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .error-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    z-index: 2;

    .error-content-code {
      font-size: 48px;
      color: $color-text;
      font-weight: 800;
    }

    .error-content-home {
      font-size: 15px;
      color: $color-sub-text;
      &:hover {
        cursor: pointer;
        color: $color-main;
      }
    }
  }
}
</style>
