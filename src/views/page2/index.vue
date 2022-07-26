<template>
  <div
      class="back-container page2"
      :class="{active: active,
               'person-active': personAfterEnter,
               'cloud-left-active': cloudLeftAfterEnter,
               'cloud-right-active': cloudRightAfterEnter}">

     <div class="text-box">
      <div class="block">
        <div class="jt-sub-title title">Total Delivered</div>
        <div class="jt-text">International<span class="jt-value">{{summaryData.parcels1}}</span>parcels</div>
        <div class="jt-text">Domestic<span class="jt-value">{{summaryData.parcels2}}</span>parcels</div>
      </div>
      <div class="block">
        <div class="jt-sub-title title">Total Received</div>
        <div class="jt-text"><span class="jt-value">{{summaryData.parcels3}}</span>parcels</div>
      </div>
     </div>
     <div class="text-modal"></div>

     <img draggable="false" class="clock" :class="{jitter : active&&shouldCloudMove}" :src="assets.clock" alt="">
     <img draggable="false" class="dispatcher" :src="assets.dispatcher" alt="">
     <img draggable="false" class="dispatcher-out" :src="assets.dispatcher" alt="">
     <img draggable="false" class="cloud-left" :src="assets.cloudLeft" alt="">
     <img draggable="false" class="cloud-right" :src="assets.cloudRight" alt="">
     <div class="cloud-left-out"><img draggable="false" :src="assets.cloudLeft" alt=""></div>
     <div class="cloud-right-out"><img draggable="false" :src="assets.cloudRight" alt=""></div>
  </div>
</template>

<script>
import anime from "animejs";
import { page2Assets } from "../../config";
import { animeFinished } from "../../libs";
import { mapGetters } from "vuex";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      active: false,
      animeList: [],
      personAfterEnter: false,
      cloudLeftAfterEnter: false,
      cloudRightAfterEnter: false,
      shouldCloudMove: true,
      assets: page2Assets
    };
  },
  computed: {
    ...mapGetters(["summaryData"])
  },
  mounted() {
    const textAnime = anime({
      targets: ".page2 .text-modal",
      translateX: "-100%",
      translateY: "4rem",
      duration: 1300,
      easing: "easeOutExpo"
    });

    const clockAnime = anime({
      targets: ".page2 .clock",
      keyframes: [
        { marginBottom: "3rem", duration: 500 },
        { marginBottom: "0" }
      ],
      easing: "linear",
      duration: 600
    });

    const personAnime = anime({
      targets: ".page2 .dispatcher",
      keyframes: [
        { translateY: "-18rem", zoom: 1.2, duration: 500 },
        { translateY: "-14rem", zoom: 0.9 },
        { translateY: "-15rem", zoom: 1 }
      ],
      easing: "linear",
      duration: 700
    });

    const personAnimeForOut = anime({
      targets: ".page2 .dispatcher-out",
      keyframes: [
        { zoom: 1.1, duration: 400 },
        { zoom: 1, duration: 100 },
        { translateY: "15rem", zoom: 0.5, opacity: 0.5 }
      ],
      easing: "linear",
      duration: 600,
      autoplay: false
    });

    personAnime.complete = () => {
      if (!personAnime.reversed) {
        this.personAfterEnter = true;
        const a = this.animeList[2] = personAnimeForOut;
        if (!a.reversed) {
          a.reverse();
        }
        personAnime.reverse();
        personAnime.play();
      }
    };

    personAnimeForOut.complete = () => {
      if (!personAnimeForOut.reversed) {
        this.personAfterEnter = false;
        this.animeList[2] = personAnime;
        personAnimeForOut.reverse();
        personAnimeForOut.play();
      }
    };

    const cloudLeftAnime = anime({
      targets: ".page2 .cloud-left",
      translateY: "-15rem",
      duration: 1500
    });

    const cloudRightAnime = anime({
      targets: ".page2 .cloud-right",
      translateY: "-15rem",
      duration: 1500
    });

    const cloudLeftForOut = anime({
      targets: ".page2 .cloud-left-out",
      marginBottom: "15rem", opacity: 0.8,
      easing: "easeOutExpo",
      duration: 1000,
      delay: 500,
      autoplay: false
    });

    const cloudRightForOut = anime({
      targets: ".page2 .cloud-right-out",
      translateY: "-15rem", opacity: 0.8,
      easing: "easeOutExpo",
      duration: 1000,
      delay: 500,
      autoplay: false
    });

    cloudLeftAnime.update = (a) => {
      if (a.progress === 100) {
        this.cloudLeftAfterEnter = true;
        const a = this.animeList[3] = cloudLeftForOut;
        if (!a.reversed) {
          a.reverse();
        }
        cloudLeftAnime.reverse();
        cloudLeftAnime.play();
      }
    };

    cloudLeftForOut.complete = (a) => {
      if (!a.reversed) {
        this.cloudLeftAfterEnter = false;
        this.animeList[3] = cloudLeftAnime;
        cloudLeftForOut.reverse();
        cloudLeftForOut.play();
      }
    };

    cloudRightAnime.update = (a) => {
      if (a.progress === 100) {
        this.cloudRightAfterEnter = true;
        const a = this.animeList[4] = cloudRightForOut;
        if (!a.reversed) {
          a.reverse();
        }
        cloudRightAnime.reverse();
        cloudRightAnime.play();
      }
    };

    cloudRightForOut.complete = (a) => {
      if (!a.reversed) {
        this.cloudRightAfterEnter = false;
        this.animeList[4] = cloudRightAnime;
        cloudRightForOut.reverse();
        cloudRightForOut.play();
      }
    };

    this.animeList.push(textAnime);
    this.animeList.push(clockAnime);
    this.animeList.push(personAnime);
    this.animeList.push(cloudLeftAnime);
    this.animeList.push(cloudRightAnime);

    this.registryAnimation();
  },
  methods: {
    registryAnimation() {
      const animationCtr = this.$animationCtr;
      animationCtr.reverseBeforeGoBack = animationCtr.beforeGoBack = () => {
        this.active = false;
        return this.play().then(() => { this.active = false; });
      };
      animationCtr.setAnimations([animationCtr.createAnimation(() => {
        this.active = false;
        return this.play().then(() => { this.active = false; });
      }, () => {
        return this.play().then(() => { this.active = true; });
      })]);
      this.start().then(() => {
        animationCtr.locked = false;
        this.active = true;
        this.startClockAnimation();
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
    startClockAnimation() {
      const id = setInterval(() => {
        this.shouldCloudMove = !this.shouldCloudMove;
      }, 2000);
      this.$once("hook:beforeDestroy", () => {
        clearInterval(id);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.back-container {
  height: 100%;
  padding: 60px 48px;
  background: white;
  overflow: hidden;
}

div > img {
  width: 100%;
}

.block {
  margin-bottom: 88px;
  div {
    margin-bottom: 16px;
  }
  .title {
    margin-bottom: 24px;
  }
  .jt-value {
    padding: 0 8px;
  }
}

.text-modal {
  position: absolute;
  top: -90px;
  left: -120px;
  height: 680px;
  width: 680px;
  border-radius: 100%;
  box-shadow:0px 0px 80px 60px rgba(255,255,255,0.8);
  background-image: radial-gradient(#FFF 50%, rgba(255,255,255,0.7) 80%, rgba(255,255,255,0.8) 90%);
}

.clock {
  position: absolute;
  width: 750px;
  bottom: 68px;
  margin-bottom: -15rem;
  left: 50%;
  margin-left: -375px;
}

.dispatcher {
  position: absolute;
  width: 680px;
  bottom: calc(1px - 15rem);
  left: 50%;
  margin-left: -340px;
}

.person-active {
  .dispatcher {
    display: none;
  }
  .dispatcher-out {
    display: block;
  }
}

.dispatcher-out {
  position: absolute;
  width: 680px;
  bottom: 1px;
  left: 50%;
  margin-left: -340px;
  display: none;
}

.cloud-left {
  width: 240px;
  position: absolute;
  bottom: calc(580px - 15rem);
  z-index: 2;
}

.cloud-right {
  width: 290px;
  position: absolute;
  bottom: calc(680px - 15rem);
  right: 30px;
  z-index: 2;
}

.cloud-left-out {
  width: 240px;
  position: absolute;
  bottom: 580px;
  z-index: 2;
  display: none;
}

.cloud-right-out {
  width: 290px;
  position: absolute;
  bottom: 680px;
  right: 30px;
  z-index: 2;
  display: none;
}

.cloud-left-active {
  .cloud-left {
    display: none;
  }
  .cloud-left-out {
    display: block;
  }
  .cloud-left-out img {
    animation: cloudLeftMove 5s linear infinite;
  }
}

.cloud-right-active {
  .cloud-right {
    display: none;
  }
  .cloud-right-out {
    display: block;
  }
  .cloud-right-out img {
    animation: cloudLeftMove 8s linear infinite;
    animation-direction: reverse;
  }
}

.jitter {
    animation-duration: 0.1ms;
    animation-name: alarm;
    animation-iteration-count: infinite;
}

@keyframes alarm {
    25% {
        transform: matrix(0.998, 0, 0, 1.005, 0, 0) rotateZ(0deg) skewX(-0.1deg);
    }
    50% {
        transform: matrix(1.005, 0, 0, 0.998, 0, 0) rotateZ(-0.5deg) skewX(0deg);
    }
    75% {
        transform: matrix(1, 0, 0, 0.998, 0, 0) rotateZ(-0.5deg) skewX(-0.1deg);
    }
    0% , 100% {
        transform: matrix(1, 0, 0, 1, 0, 0) rotateZ(0deg) skewX(0deg);
    }
}

@keyframes cloudLeftMove {
  0% {
    transform: translate(0, 0);
  }
  20% {
    transform: translate(20px, -15px);
  }
  40% {
    transform: translate(40px, -20px);
  }
  60% {
    transform: translate(40px, -30px);
  }
  80% {
    transform: translate(20px, -30px);
  }
}
</style>
