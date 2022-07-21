<template>
    <div class="back-container page5" :class="{ active: active }">

        <div class="text-box">
            <div class="jt-title line1 line">Thanks for</div>
            <div class="jt-sub-title line2 line">supporting us!</div>
        </div>

        <img draggable="false" class="dispatcher" style="transform: scale(0.5)" :src="assets.dispatcher" alt="">
    </div>
</template>

<script>
import anime from "animejs";
import { page5Assets } from "../../config";
import { animeFinished } from "../../libs";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      loopAnimations: [],
      active: false,
      animeList: [],
      assets: page5Assets
    };
  },
  mounted() {
    this.animeList.push(this.initTextAnime());
    this.animeList.push(this.initDispatcher());
    this.registryAnimation();
  },
  methods: {
    registryAnimation() {
      const animationCtr = this.$animationCtr;
      animationCtr.beforeGoBack = () => {
        this.loopAnimations.forEach(a => {
          a.pause();
        });
        this.active = false;
        this.leaved = true;
        return this.play().then(() => { this.active = false; });
      };
      //   animationCtr.setAnimations([animationCtr.createAnimation(() => {
      //     this.loopAnimations.forEach(a => {
      //       a.pause();
      //     });
      //     this.active = false;
      //     this.leaved = true;
      //     this.loopAnimations = [];
      //     return this.play().then(() => { this.active = false; });
      //   }, () => {
      //     this.leaved = false;
      //     return this.play().then(() => { this.active = true; });
      //   })]);
      this.start().then(() => {
        animationCtr.locked = false;
        this.active = true;
      });
    },
    play() {
      return Promise.all(this.animeList.map(a => {
        a.reverse();
        const p = animeFinished(a);
        a.play();
        return p;
      }));
    },
    start() {
      return Promise.all(this.animeList.map(a => {
        const p = animeFinished(a);
        a.play();
        return p;
      }));
    },
    initTextAnime() {
      const length = 2;
      const tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 400,
        autoplay: false
      });
      for (let i = 1; i <= length; i++) {
        tl.add({
          targets: `.page5 .line${i}`,
          marginLeft: 0,
          opacity: 1
        }, i === 1 ? undefined : "-=200");
      }
      return tl;
    },
    initDispatcher() {
      return anime({
        targets: ".page5 .dispatcher",
        scale: 1,
        opacity: 1,
        delay: 400,
        duration: 800
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.back-container {
    height: 100%;
    padding: 120px 48px;
    background: white;
    overflow: hidden;
}

.text-box {
    width: 100%;

    .line {
        height: 50px;
        line-height: 50px;
        text-align: center;
        width: 100%;
        margin-left: -100%;
        opacity: 0;
    }

}

.dispatcher {
   position: absolute;
   width: 750px;
   left: 0;
   bottom: -680px;
   opacity: 0;
}
</style>
