<template>
  <div
      class="back-container page4"
      :class="{active: active}">

     <div class="text-box">
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line1 line" :style="textStyle">Registered on</div>
        </div>
        <div class="line2 line" :style="textStyle"><span class="jt-value">18</span><span class="jt-value">JANUARY</span><span class="jt-value">2020</span></div>
      </div>
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line3 line" :style="textStyle">Highest Orders</div>
        </div>
        <div class="jt-text line4 line" :style="textStyle"><span class="jt-value">MAY</span>(10 parcels)</div>
      </div>
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line5 line" :style="textStyle">Highest Orders</div>
          <div class="jt-sub-title line6 line" :style="textStyle">Received on</div>
        </div>
        <div class="jt-text line7 line"><span class="jt-value">NOVEMBER</span>(7 parcels)</div>
      </div>
     </div>

     <img draggable="false" class="box box1" style="transform: translateY(-348px) rotate(-40deg)" :src="assets.box1" alt="">
     <img draggable="false" class="clould clould1" style="transform: translateX(3.5rem)" :src="assets.clould1" alt="">

     <img draggable="false" class="box box2" style="transform: translateY(-600px)" :src="assets.box2" alt="">
     <img draggable="false" class="clould clould2" style="transform: translateX(4.3rem)"  :src="assets.clould2" alt="">

     <img draggable="false" class="big-box box3"  style="transform: translateY(-100vh); opacity: 0;" :src="assets.box3" alt="">
     <img draggable="false" class="clould3" style="transform: translateY(100px); opacity: 0;"  :src="assets.clould3" alt="">

     <img draggable="false" class="plants" style="transform: translateY(3.8rem) translateX(-3.8rem); opacity: 0.4;" :src="assets.plants" alt="">
  </div>
</template>

<script>
import anime from "animejs";
import { page4Assets } from "../../config";
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
      textStyle: {
        transform: "scaleY(1.6)"
      },
      assets: page4Assets
    };
  },
  mounted() {
    this.animeList.push(this.initTextAnime());
    this.animeList.push(...this.initBox1Anime());
    this.animeList.push(...this.initBox2Anime());
    this.animeList.push(...this.initBox3Anime());
    this.animeList.push(this.initPlantsAnime());
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
      animationCtr.setAnimations([animationCtr.createAnimation(() => {
        this.loopAnimations.forEach(a => {
          a.pause();
        });
        this.active = false;
        this.leaved = true;
        this.loopAnimations = [];
        return this.play().then(() => { this.active = false; });
      }, () => {
        this.leaved = false;
        return this.play().then(() => { this.active = true; });
      })]);
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
      const length = 7;
      const tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 300,
        autoplay: false
      });
      for (let i = 1; i <= length; i++) {
        tl.add({
          targets: `.page4 .line${i}`,
          marginTop: 0,
          opacity: 1,
          scaleY: 1
        }, i === 1 ? undefined : "-=100");
      }
      return tl;
    },
    initBox1Anime() {
      const boxAnime = anime({
        targets: ".page4 .box1",
        translateY: 0,
        rotate: 0,
        duration: 1800,
        easing: "easeOutExpo"
      });
      const clouldAnime = anime({
        targets: ".page4 .clould1",
        translateX: 0,
        duration: 1300,
        easing: "easeOutExpo"
      });
      return [boxAnime, clouldAnime];
    },
    initBox2Anime() {
      const boxAnime = anime({
        targets: ".page4 .box2",
        translateY: 0,
        duration: 1800,
        delay: 500,
        easing: "easeOutExpo"
      });
      const clouldAnime = anime({
        targets: ".page4 .clould2",
        translateX: 0,
        duration: 1700,
        delay: 500,
        easing: "easeOutExpo"
      });
      return [boxAnime, clouldAnime];
    },
    initBox3Anime() {
      const boxAnime = anime({
        targets: ".page4 .box3",
        translateY: 0,
        duration: 1600,
        opacity: 1,
        delay: 500,
        easing: "easeOutExpo"
      });
      const clouldAnime = anime({
        targets: ".page4 .clould3",
        translateY: 0,
        duration: 1600,
        opacity: 1,
        delay: 500,
        easing: "easeOutExpo"
      });
      return [boxAnime, clouldAnime];
    },
    initPlantsAnime() {
      const a = anime({
        targets: ".page4 .plants",
        translateY: 0,
        translateX: 0,
        duration: 1600,
        opacity: 1,
        delay: 500,
        easing: "easeOutExpo"
      });
      return a;
    }
  }
};
</script>

<style style lang="scss" scoped>
.back-container {
  height: 100%;
  padding: 100px 48px;
  background: white;
  overflow: hidden;
}

.block {
  margin-bottom: 88px;
  .title {
    margin-bottom: 24px;
  }
  .jt-value {
    padding-right: 12px;
  }
  .line {
    margin-top: 50%;
    opacity: 0;
    transform-origin: top center;
  }
}

.box1 {
  position: absolute;
  width: 150px;
  top: 210px;
  right: 90px;
  z-index: 6;
}

.clould1 {
  position: absolute;
  width: 190px;
  top: 348px;
  right: 40px;
  z-index: 5;
}

.box2 {
  position: absolute;
  width: 180px;
  top: 415px;
  right: 120px;
  z-index: 4;
}

.clould2 {
  position: absolute;
  width: 190px;
  top: 600px;
  right: 120px;
  z-index: 3;
}

.box3 {
  position: absolute;
  width: 420px;
  bottom: 28px;
  right: 70px;
  z-index: 2;
}

.clould3 {
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 1;
}

.plants {
  position: absolute;
  width: 720px;
  bottom: -110px;
  left: -220px;
}

.active {
  .box {
    animation: upDown 3s linear infinite;
  }
  .clould {
    animation: scaleFrames 3s linear infinite;
  }
  .big-box {
    animation: upDown2 3s linear infinite;
  }
}

@keyframes scaleFrames {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(0.9);
  }
}

@keyframes upDown {
  0% {
    margin-top: 0;
  }
  50% {
    margin-top: -10px;
  }
}

@keyframes upDown2 {
  0% {
    margin-bottom: 0;
  }
  50% {
    margin-bottom: 10px;
  }
}
</style>
