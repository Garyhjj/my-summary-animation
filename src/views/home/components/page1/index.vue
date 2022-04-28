<template>
  <div class="back-container">
      <app-perspective-box ref="visibleBox" class="visible-box">
          <div ref="line" class="text" v-for="item of 50" :key="item">
            11111111111111111111111{{ item }}111111
          </div>
      </app-perspective-box>
    </div>
</template>

<script>
import { BlockAnimation } from "../../../../libs/animation";

export default {
  props: {
    animationId: String
  },
  created() {
    const animation = this.$animation;

    const blockAnimation = new BlockAnimation(this.animationId, [
      animation.createAnimation(() => {
        const visibleBox = this.$refs.visibleBox;
        visibleBox.moveWithTempDuration(0.3, () => {
          visibleBox.moveToElTop(this.$refs.line[3]);
        });
      }, () => {
        const visibleBox = this.$refs.visibleBox;
        visibleBox.moveWithTempDuration(0.3, () => {
          visibleBox.moveY(0);
        });
      }, 0.3),
      animation.createAnimation(() => {
        const visibleBox = this.$refs.visibleBox;
        visibleBox.moveToElTop(this.$refs.line[6]);
      }, () => {
        const visibleBox = this.$refs.visibleBox;
        visibleBox.moveToElTop(this.$refs.line[3]);
      })
    ]);
    blockAnimation.addLeaveAnimation(animation.createAnimation(() => {
      this.$el.style.transform = "translate(0, -100%)";
    }, () => {
      this.$el.style.transform = "translate(0, 0)";
    }));
    animation.addBlockAnimation(blockAnimation);
  }
};
</script>

<style style lang="scss" scoped>
.back-container {
  height: 100%;
  background: blue;
  transition: 0.3s all;
  overflow: hidden;
}

.visible-box {
  height: 350px;
  width: 300px;
}
</style>
