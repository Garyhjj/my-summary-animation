<template>
  <div ref="box" class="home-container">
    <page1 ref="page1" />
    <page2 :animationId="animationBlockId2" />
    <page3 :animationId="animationBlockId3" />
  </div>
</template>

<script>
import { BlockAnimation } from "../../libs/animation";
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
    animation.sortIdArr = [this.animationBlockId1];
  },
  mounted() {
    const unsubscribe = this.$animation.bindEl(this.$refs.box);
    this.$once("hook:beforeDestroy", unsubscribe);
    const animation = this.$animation;

    const blockAnimation = new BlockAnimation(this.animationBlockId1, []);
    animation.addBlockAnimation(blockAnimation);
    this.registryAnimation("page1", blockAnimation);
  },
  methods: {
    registryAnimation(name, blockAnimation) {
      if (this.$refs[name]) {
        this.$refs[name].registryAnimation(blockAnimation);
      } else {
        setTimeout(() => {
          this.registryAnimation(name, blockAnimation);
        }, 5);
      }
    }
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
