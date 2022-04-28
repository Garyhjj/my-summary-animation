<template>
  <div class="main-container">
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
  width: 100vw;
  height: 100vh;
  background: #FFF;
  .content {
    height: 100%;
    width: 100%;
  }
}
</style>
