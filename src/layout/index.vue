<template>
  <div draggable="false" class="main-container">
    <div class="content">
        <router-view />
    </div>
  </div>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
  width: 100vw;
  height: 100vh;
  background: #FFF;
  overflow: hidden;
  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
