<template>
  <a
    class="m-button"
    :class="[
      'm-button__' + type, {
        'm-button__inline': inline,
      }]"
    @click="handleClick"
  >
    <slot />
  </a>
</template>

<script>
export default {
  name: 'MButton',
  props: {
    type: {
      type: String,
      default: 'primary',
      required: false,
      validator (value) {
        return ['default', 'primary', 'error'].includes(value)
      }
    },
    inline: Boolean,
    disabled: Boolean
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.m-button {
  display: block;
  padding: 4px 12px;
  text-align: center;
  box-sizing: border-box;
  border-radius: 4px;
  font-weight: 400;
  background-color: #fff;
  &:hover {
    &.m-button__primary, &.m-button__error {
      cursor: pointer;
      opacity: 0.85;
    }
    &.m-button__default {
      cursor: pointer;
      background-color: #ddd;
    }
  }
  &:active {
    opacity: 0.65;
  }
  // inline / block
  &.m-button__inline {
    display: inline-block;
  }

  &.m-button__default {
    color: rgba(0, 0, 0, 0.85);
    border: 1px solid $color-border;
  }

  &.m-button__primary {
    background-color: $color-main;
    color: #fff;
  }

  &.m-button__error {
    background-color: $color-error$color-error;
    color: #fff;
  }
}
</style>
