<template>
  <footer id="footer">
    <div>
      <span class="icp">{{ icp }}</span>
      <span class="dividers">|</span>
      <span class="power">Power By Nuxt.js</span>
      <span class="dividers">|</span>
      <span class="mine">Mangokk</span>
    </div>
  </footer>
</template>

<script>
import config from '~/config/front.config.js'
export default {
  computed: {
    icp () {
      return config.icp || ''
    }
  },
  methods: {
    toGithub () {
      window.open('https://github.com/kankk/blog', '_blank')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
#footer {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.6);
  border-top: 1px solid rgba(51,51,52,0.1);
  box-shadow:0px 1px 4px 0px rgba(51,51,52,0.08);
  .icp {
    color: rgba(0, 0, 0, 0.45);
  }
  .power {
    color: $color-title;
  }
  .mine {
    color: $color-main;
  }
  .dividers {
    color: $color-dividers;
    margin: 0 8px;
  }
}
</style>
