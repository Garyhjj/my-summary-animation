<template>
  <div ref="box" class="home-container">
    <page1 :animationId="animationBlockId1" />
    <page2 :animationId="animationBlockId2" />
    <page3 :animationId="animationBlockId3" />
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {
    page1: () => import("./components/page1"),
    page2: () => import("./components/page2"),
    page3: () => import("./components/page3")
  },
  data() {
    return {
      animationBlockId1: "aaa",
      animationBlockId2: "bbb",
      animationBlockId3: "ccc"
    };
  },
  created() {
    const animation = this.$animation;
    animation.sortIdArr = [this.animationBlockId1, this.animationBlockId2, this.animationBlockId3];
  },
  mounted() {
    const unsubscribe = this.$animation.bindEl(this.$refs.box);
    this.$once("hook:beforeDestroy", unsubscribe);
  },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
.home-container {
  position: relative;
  height: 100%;
  overflow: hidden;
}
.back-container {
  height: 100%;
  background: blue;
}

.visible-box {
  height: 350px;
  width: 300px;
}
</style>
