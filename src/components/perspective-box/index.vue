<template>
  <div class="perspective-box">
      <div ref="contentBox" class="content-box">
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    originY: Number,
    originX: Number,
    duration: Number
  },
  data() {
    return {
      x: 0,
      y: 0
    };
  },
  created() {
    if (this.originY !== undefined) {
      this.y = this.originY;
    }
    if (this.originX !== undefined) {
      this.x = this.originX;
    }
  },
  mounted() {
    this.move(this.x, this.y);
    this.setElStyle();
  },
  methods: {
    setElStyle() {
      const el = this.$el;
      if (!el) return;
      const { duration } = this;
      const contentBox = this.$refs.contentBox;
      contentBox.style.transition = el.style.transition = "0.3s all";
      if (duration > 0) {
        contentBox.style.transitionDuration = el.style.transitionDuration = `${duration}s`;
      }
    },
    moveWithTempDuration(duration, move) {
      const el = this.$el;
      const contentBox = this.$refs.contentBox;
      const origin = el.style.transitionDuration;
      contentBox.style.transitionDuration = el.style.transitionDuration = `${duration}s`;
      move();
      setTimeout(() => {
        contentBox.style.transitionDuration = el.style.transitionDuration = origin;
      }, duration * 1000);
    },
    move(x, y) {
      const el = this.$el;
      if (!el) return;
      const contentBox = this.$refs.contentBox;
      this.x = x;
      this.y = y;
      el.style.transform = `translate(${x}px, ${y}px)`;
      contentBox.style.transform = `translate(${-x}px, ${-y}px)`;
    },
    moveX(x) {
      this.move(x, this.y);
    },
    moveY(y) {
      this.move(this.x, y);
    },
    moveToElTop(el) {
      if (!el) return;
      const { top, left } = this.$el.getBoundingClientRect();
      const { top: contentTop, left: contentLeft } = el.getBoundingClientRect();
      this.move(contentLeft - (left - this.x), contentTop - (top - this.y));
    }
  }
};
</script>

<style lang="scss" scoped>
.perspective-box {
  overflow: hidden;
}
</style>
