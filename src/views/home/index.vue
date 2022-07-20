<template>
  <div class="back-container page1" :class="{hidden: leaved, active: active}">

     <div class="text-box">
      <div class="jt-title name">Hi, Octavia Chong</div>
      <div class="jt-sub-title line1">This is your 2022</div>
      <div class="jt-sub-title line2">Journey With us</div>
     </div>
    <img draggable="false" class="love" :src="assets.love" alt="">
    <img draggable="false" class="person" :src="assets.person" alt="">
    <img draggable="false" class="river" :src="assets.river" alt="">
    <img draggable="false" class="emoji1" :src="assets.emoji1" alt="">
    <img draggable="false" class="emoji2" :src="assets.emoji2" alt="">
    <img draggable="false" class="emoji3" :src="assets.emoji3" alt="">
    <img draggable="false" class="zig" :src="assets.zig" alt="">
    <img draggable="false" class="ball" :src="assets.ball" alt="">
  </div>
</template>

<script>
import anime from "animejs";
import { page1Assets } from "../../config";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      tl: null,
      loopAnimations: [],
      leaved: false,
      active: false,
      assets: page1Assets
    };
  },
  mounted() {
    const tl = anime.timeline({
      easing: "easeOutExpo",
      duration: 1500,
      autoplay: false
    });

    tl.add({
      targets: ".page1 .river",
      translateX: "-100%",
      translateY: "-10rem"
    })
      .add({
        targets: ".page1 .person",
        translateX: "-89%",
        duration: 700,
        opacity: 1,
        easing: "easeInQuad"
      }, "-=1500")
      .add({
        targets: ".page1 .love",
        translateX: "calc(100% + 24px)",
        scale: 1,
        easing: "spring(1, 80, 10, 0)"
      }, "-=1500")
      .add({
        targets: ".page1 .emoji3",
        translateX: "-2rem",
        translateY: "-2rem",
        opacity: 1,
        duration: 2000
      }, "-=1500")
      .add({
        targets: ".page1 .emoji1",
        translateX: "3rem",
        rotate: 1080,
        duration: 1000
      }, "-=1500")
      .add({
        targets: ".page1 .emoji2",
        translateX: "-6rem",
        translateY: "-7rem",
        opacity: 1,
        duration: 2000
      }, "-=1500")
      .add({
        targets: ".page1 .zig",
        opacity: 1
      }, "-=1500")
      .add({
        targets: ".page1 .ball",
        translateY: "-3rem",
        duration: 2000
      }, "-=2000")
      .add({
        targets: ".page1 .name",
        translateX: "57%",
        duration: 800
      }, "-=1800")
      .add({
        targets: ".page1 .line1",
        translateX: "57%",
        duration: 800
      }, "-=1600")
      .add({
        targets: ".page1 .line2",
        translateX: "57%",
        duration: 800
      }, "-=1400");
    tl.update = anim => {
      if (Math.round(anim.progress) === 100) {
        if (tl.reversed) {
          this.leaved = true;
          return;
        }
        this.active = true;
        this.loopAnimations.push(this.startAutoRotateAnime(".page1 .emoji3"));
        this.loopAnimations.push(this.startAutoScaleAnime(".page1 .emoji1"));
        this.loopAnimations.push(this.startAutoScaleAnime(".page1 .emoji2"));
      }
    };
    this.tl = tl;
    this.registryAnimation();
  },
  methods: {
    startAutoRotateAnime(targets) {
      const rotateTl = anime.timeline({
        targets,
        easing: "easeOutExpo",
        duration: 6000,
        loop: true
      });
      rotateTl.add({
        rotate: 50
      }).add({
        targets,
        rotate: 0,
        endDelay: -3000
      }, "-=2000");
      return rotateTl;
    },
    startAutoScaleAnime(targets) {
      const tl = anime.timeline({
        targets,
        easing: "easeOutExpo",
        duration: 3000,
        loop: true
      });
      tl.add({
        scale: 1.1
      }).add({
        targets,
        scale: 1,
        endDelay: -1000
      }, "-=1000");
      return tl;
    },
    startBallAnime(targets) {
      const tl = anime({
        targets,
        easing: "easeOutExpo",
        keyframes: [
          {
            translateX: "0.15rem",
            translateY: "-2.9rem"
          },
          {
            translateX: "0.3rem",
            translateY: "-3rem"
          },
          {
            translateX: "0.31rem",
            translateY: "-3.1rem"
          }
        ],
        duration: 3000,
        loop: true
      });
      return tl;
    },
    registryAnimation() {
      const animation = this.$animationCtr;
      animation.setAnimations([animation.createAnimation(() => {
        this.loopAnimations.forEach(a => {
          a.pause();
        });
        this.active = false;
        this.loopAnimations = [];
        return this.play();
      }, () => {
        this.leaved = false;
        return this.play();
      })]);
      this.tl.play();
      this.tl.finished.then(() => { animation.locked = false; });
    },
    play() {
      this.tl.reverse();
      this.tl.play();
      return this.tl.finished;
    }
  }
};
</script>

<style style lang="scss" scoped>
.back-container {
  height: 100%;
  background: white;
  overflow: hidden;
  // &.hidden {
  //   height: 0;
  // }
}

.person {
  width: 800px;
  position: absolute;
  bottom: 40px;
  right: -800px;
  opacity: 0.6;
  z-index: 2;
}

.river {
  width: 1575px;
  position: absolute;
  bottom: calc(-530px - 10rem);
  right: calc(-578px - 1575px);
  z-index: 0;
}

.love {
  width: 200px;
  position: absolute;
  top: 40px;
  left: -200px;
  z-index: 2;
}

.emoji1 {
  width: 100px;
  position: absolute;
  bottom: 680px;
  left: calc(120px - 3rem);
  z-index: 2;
}

.emoji2 {
  width: 350px;
  position: absolute;
  bottom: calc(110px - 7rem);
  left: calc(170px + 6rem);
  opacity: 0.3;
  z-index: 2;
}

.emoji3 {
  width: 200px;
  position: absolute;
  bottom: calc(40px - 2rem);
  right: calc(20px - 2rem);
  opacity: 0;
  z-index: 2;
}

.zig {
  width: 200px;
  position: absolute;
  bottom: 64px;
  left: 50%;
  margin-left: -100px;
  opacity: 0;
  z-index: 2;
}

.ball {
  width: 200px;
  position: absolute;
  bottom: calc(10px - 3rem);
  left: 40px;
  z-index: 2;
}

.text-box {
  position: absolute;
  top: 290px;
  left: 64px;
  div {
    margin-left: calc(-130%);
  }
}

.active {
  .ball {
    animation: ballMove 5s linear infinite;
  }
}

@keyframes ballMove {
  0% {
    transform: translate(1px, -3rem);
  }
  20% {
    transform: translate(20px, -2.9rem);
  }
  40% {
    transform: translate(40px, -3rem);
  }
  60% {
    transform: translate(40px, -3.1rem);
  }
  80% {
    transform: translate(20px, -3.1rem);
  }
}
</style>
