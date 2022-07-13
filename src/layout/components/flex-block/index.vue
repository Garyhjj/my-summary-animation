<template>
    <div class="flex-box" ref="viewer">
        <div class="inner-box" ref="viewBox">
            <slot />
        </div>
    </div>
</template>

<script>
export default {
  mounted() {
    this.updateScreenSize();
  },
  methods: {
    updateScreenSize() {
      const container = this.$refs.viewer;
      if (!container) {
        setTimeout(() => {
          this.updateScreenSize();
        }, 5);
        return;
      }
      const viewBox = this.$refs.viewBox;
      const resizeObserver = new ResizeObserver(() => {
        const outerWidth = container.clientWidth;
        const realWidth = viewBox.clientWidth;
        const widthScale = outerWidth / realWidth;
        viewBox.style.transform = `scale(${widthScale}, ${widthScale})`;
      });
      resizeObserver.observe(this.$el);
    }
  }
};
</script>

<style style lang="scss" scoped>
</style>
