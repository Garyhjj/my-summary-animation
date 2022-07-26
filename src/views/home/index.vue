<template>
  <div class="back-container page1" :class="{ hidden: leaved, active: active }">

    <div class="text-box">
      <div class="jt-title name">Hi, {{ summaryData.name }}</div>
      <div class="jt-sub-title line1">This is your 2022</div>
      <div class="jt-sub-title line2">Journey With us</div>
    </div>
    <div class="love" style="transform: scale(0.2) translateX(20rem);"><img draggable="false" :src="assets.love" alt="">
    </div>
    <img draggable="false" class="person" :src="assets.person" alt="">
    <img draggable="false" class="river" :src="assets.river" alt="">
    <div class="emoji1"><img draggable="false" :src="assets.emoji1" alt=""></div>
    <div class="emoji2"><img draggable="false" :src="assets.emoji2" alt=""></div>
    <div class="emoji3"><img draggable="false" :src="assets.emoji3" alt=""></div>
    <img draggable="false" class="zig" :src="assets.zig" alt="">
    <div class="ball"><img draggable="false" :src="assets.ball" alt=""></div>
  </div>
</template>

<script>
import anime from "animejs";
import { mapGetters } from "vuex";
import { page1Assets } from "../../config";
import { animeFinished } from "../../libs";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      leaved: false,
      active: false,
      animeList: [],
      assets: page1Assets
    };
  },
  computed: {
    ...mapGetters(["summaryData"])
  },
  mounted() {
    // this.$el.appendChild(this.assets.wave);
    // this.assets.wave.style = "width: 200px;position: absolute;bottom: 64px;left: 50%;margin-left: -100px;z-index: 2;";
    const loveAnime = anime({
      targets: ".page1 .love",
      keyframes: [
        { translateX: "-6rem", scale: 0.35, opacity: 1 },
        { scaleX: -1, translateX: "-7rem", duration: 100 },
        { translateX: 0, scale: 1, easing: "spring(1, 80, 10, 0)", duration: 800 }
      ],
      easing: "linear",
      duration: 1300
    });
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
      }
    };
    this.animeList.push(loveAnime);
    this.animeList.push(tl);
    this.registryAnimation();
  },
  methods: {
    registryAnimation() {
      const animation = this.$animationCtr;
      animation.setAnimations([animation.createAnimation(() => {
        this.active = false;
        return this.play();
      }, () => {
        this.leaved = false;
        return this.play();
      })]);
      this.start().then(() => { animation.locked = false; });
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
    }
  }
};
</script>

<style lang="scss" scoped>
.back-container {
  height: 100%;
  background: white;
  overflow: hidden;
  // &.hidden {
  //   height: 0;
  // }
}

div > img {
  width: 100%;
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
  left: 56px;
  transform-origin: center center;
  opacity: 0;
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
  z-index: 9;

  div {
    margin-left: calc(-130%);
  }
}

.ball img {
  animation: ballMove 5s linear infinite;
}

.love img {
  animation: loveMove 6s linear infinite;
}

.emoji1 img, .emoji2 img {
  animation: emojiScale 3s linear infinite;
}

.emoji3 img {
  animation: emojiRotate 6s linear infinite;
}

@keyframes ballMove {
  0% {
    transform: translate(0, 0);
  }

  17% {
    transform: translate(20px, -10px);
  }

  33% {
    transform: translate(40px, 0);
  }

  50% {
    transform: translate(40px, 10px);
  }

  67% {
    transform: translate(20px, 20px);
  }

  84% {
    transform: translate(0, 10px);
  }
}

@keyframes loveMove {
  0% {
    margin-top: 0;
    transform: rotate(0);
  }

  25%,
  75% {
    margin-top: 16px;
    transform: rotate(-9deg);
  }

  50% {
    margin-top: 32px;
    transform: rotate(0);
  }
}

@keyframes emojiScale {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes emojiRotate {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(50deg);
  }
}
</style>
