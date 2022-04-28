<template>
  <div class="back-container">
      <app-perspective-box ref="visibleBox" class="visible-box">
          <div ref="line" class="text" v-for="item of 50" :key="item">
            hhhhhhhhhhhhh{{ item }}66666
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
      this.$el.style.top = "-100%";
    }, () => {
      this.$el.style.top = "0";
    }));
    blockAnimation.addEnterAnimation(animation.createAnimation(() => {
      this.$el.style.top = "0";
    }, () => {
      this.$el.style.top = "100%";
    }));
    animation.addBlockAnimation(blockAnimation);
  }
};
</script>

<style style lang="scss" scoped>
.back-container {
  position: absolute;
  top: 100%;
  height: 100%;
  width: 100%;
  background: pink;
  overflow: hidden;
  transition: 0.3s all;
}

.visible-box {
  height: 350px;
  width: 300px;
}
</style>
