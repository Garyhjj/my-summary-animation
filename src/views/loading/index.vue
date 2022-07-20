<template>
  <div @click="playAudio">{{done ? "touch to start" : "loading"}} {{percent}} %</div>
</template>

<script>
export default {
  data() {
    return {
      done: false,
      percent: 0
    };
  },
  created() {
    const ctr = this.$animationCtr;
    if (!ctr.loaded) {
      ctr.onProgress((done, total) => {
        console.log(done, total);
        this.percent = ~~(done / total * 100);
        this.done = done === total;
      });
    }
  },
  methods: {
    playAudio() {
      this.$animationCtr.playAudio();
      this.$router.push("/index");
    }
  }
};
</script>

<style>

</style>
