<template>
  <div class="dashborad-file-button">
    <input class="file-input" type="file" :name="name" @change="$emit('change', $event)">
    <div class="file-button">
      <span class="file-button-text"><slot /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileButton',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~/assets/css/color.scss';
.dashborad-file-button {
  position: relative;
  display: inline-block;
  overflow: hidden;
  .file-button {
    display: flex;
    background-color: $color-main;
    padding: 4px 12px;
    border-radius: 4px;
    .file-button-text {
      color: #fff;
    }
  }
  .file-input {
    position: absolute;
    top: 0;
    bottom: 0;
    left: -100%;
    right: 0;
    height: 100%;
    width: 200%;
    opacity: 0;
    &:hover {
      cursor: pointer;
    }
  }
  &:hover {
    cursor: pointer;
    opacity: 0.85;
  }
}
</style>
