<template>
  <div
      class="back-container page4"
      :class="{active: active}">

     <div class="text-box">
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line1 line" :style="textStyle">Registered on</div>
        </div>
        <div class="line2 line" :style="textStyle">
          <span class="jt-value" v-for="item in summaryData.registeredOn.split(' ')" :key="item">{{item}}</span>
        </div>
      </div>
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line3 line" :style="textStyle">Highest Orders</div>
        </div>
        <div class="jt-text line4 line" :style="textStyle"><span class="jt-value">{{summaryData.month1}}</span>({{summaryData.parcels4}} parcels)</div>
      </div>
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line5 line" :style="textStyle">Highest Orders</div>
          <div class="jt-sub-title line6 line" :style="textStyle">Received on</div>
        </div>
        <div class="jt-text line7 line"><span class="jt-value">{{summaryData.month2}}</span>({{summaryData.parcels5}} parcels)</div>
      </div>
     </div>

     <div class="box box1" style="transform: translateY(-348px) rotate(-40deg)"><img draggable="false" :src="assets.box1" alt=""></div>

     <div class="clould clould1" style="transform: translateX(3.5rem)"><img draggable="false" :src="assets.clould1" alt=""></div>

     <div class="box box2" style="transform: translateY(-600px)"><img draggable="false" :src="assets.box2" alt=""></div>
     <div class="clould clould2" style="transform: translateX(4.3rem)"><img draggable="false" :src="assets.clould2" alt=""></div>

     <div  class="big-box box3" style="transform: translateY(-100vh); opacity: 0;"><img draggable="false" :src="assets.box3" alt=""></div>
     <img draggable="false" class="clould3" style="transform: translateY(100px); opacity: 0;"  :src="assets.clould3" alt="">

     <img draggable="false" class="plants" style="transform: translateY(3.8rem) translateX(-3.8rem); opacity: 0.4;" :src="assets.plants" alt="">
  </div>
</template>

<script>
import anime from "animejs";
import { mapGetters } from "vuex";
import { page4Assets } from "../../config";
import { animeFinished } from "../../libs";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      active: false,
      animeList: [],
      textStyle: {
        transform: "scaleY(1.6)"
      },
      assets: page4Assets
    };
  },
  computed: {
    ...mapGetters(["summaryData"])
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
      animationCtr.reverseBeforeGoBack = animationCtr.beforeGoBack = () => {
        return this.play();
      };
      animationCtr.setAnimations([animationCtr.createAnimation(() => {
        return this.play();
      }, () => {
        return this.play();
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

<style lang="scss" scoped>
.back-container {
  height: 100%;
  padding: 100px 48px;
  background: white;
  overflow: hidden;
}
div > img {
  width: 100%;
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
  .box img {
    animation: upDown 3s linear infinite;
  }
  .clould img {
    animation: scaleFrames 3s linear infinite;
  }
  .big-box img {
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
