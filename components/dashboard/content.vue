<template>
  <div id="dashboard-content">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'Content'
}
</script>

<style lang="scss" scoped>
#dashboard-content {
  flex: 1;
  overflow-y: auto;
  box-sizing: border-box;
  padding: 12px;
}
</style>
