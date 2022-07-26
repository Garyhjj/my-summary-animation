<template>
  <div
      class="back-container page3"
      :class="{active: active}">

     <div class="text-box">
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line1 line">Total</div>
          <div class="jt-sub-title line2 line">Delivery Cost</div>
        </div>
        <div class="jt-value line3 line"><span>RM{{summaryData.cost}}</span></div>
      </div>
      <div class="block">
        <div class="title">
          <div class="jt-sub-title line4 line">Used</div>
          <div class="jt-sub-title line5 line">Vouchers</div>
        </div>
        <div class="jt-text line6 line"><span class="jt-value">{{summaryData.vouchers}}</span>vouchers</div>
      </div>
     </div>
     <img draggable="false" class="small-box" :src="assets.smallBox" alt="">
     <img draggable="false" class="big-box" :src="assets.bigBox" alt="">
     <img draggable="false" class="hand" style="transform: scale(0)" :src="assets.hand" alt="">
     <img draggable="false" class="left-voucher" style="transform: scale(0)" :src="assets.leftVoucher" alt="">
     <img draggable="false" class="right-voucher" style="transform: scale(0)" :src="assets.rightVoucher" alt="">

     <div class="hand-coin hand-coin1"><img draggable="false" :src="assets.handCoin1" alt=""></div>
     <div class="hand-coin hand-coin2"><img draggable="false" :src="assets.handCoin2" alt=""></div>
     <div class="hand-coin hand-coin3"><img draggable="false" :src="assets.handCoin3" alt=""></div>
     <div class="hand-coin hand-coin4"><img draggable="false" :src="assets.handCoin4" alt=""></div>

     <div class="coin coin1" style="transform: translateY(-96px)"><img draggable="false" :src="assets.coin1" alt=""></div>
     <div class="coin coin2" style="transform: translateY(-150px) rotate(-40deg)"><img draggable="false" :src="assets.coin2" alt=""></div>
     <div class="coin coin3" style="transform: translateY(-450px)"><img draggable="false" :src="assets.coin3" alt=""></div>
     <div class="coin coin4" style="transform: translateY(-600px)"><img draggable="false" :src="assets.coin4" alt=""></div>
  </div>
</template>

<script>
import anime from "animejs";
import { mapGetters } from "vuex";
import { animeFinished } from "../../libs";
import { page3Assets } from "../../config";

export default {
  props: {
    animationId: String
  },
  data() {
    return {
      active: false,
      animeList: [],
      assets: page3Assets
    };
  },
  computed: {
    ...mapGetters(["summaryData"])
  },
  mounted() {
    const smallBoxAnime = anime({
      targets: ".page3 .small-box",
      marginLeft: 0,
      easing: "easeOutExpo",
      duration: 1000
    });
    const bigBoxAnime = anime({
      targets: ".page3 .big-box",
      marginRight: 0,
      easing: "easeOutExpo",
      duration: 1000
    });

    const handeAnime = anime({
      targets: ".page3 .hand",
      keyframes: [
        { scale: 0, duration: 600 },
        { scale: 1 }
      ],
      duration: 1300
    });
    this.animeList.push(this.initTextAnime());
    this.animeList.push(smallBoxAnime);
    this.animeList.push(bigBoxAnime);
    this.animeList.push(handeAnime);
    this.animeList.push(this.initVoucherAnime());
    this.animeList.push(...this.initHandCoinAnime());
    this.animeList.push(...this.initCoinAnime());
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
          targets: `.page3 .line${i}`,
          marginLeft: 0
        }, i === 1 ? undefined : "-=100");
      }
      return tl;
    },
    initVoucherAnime() {
      const tl = anime.timeline({
        easing: "easeOutExpo",
        duration: 1200,
        autoplay: false
      });
      tl.add({
        targets: ".page3 .right-voucher",
        keyframes: [
          { scale: 0, duration: 700 },
          { scale: 1 }
        ]
      }).add({
        targets: ".page3 .left-voucher",
        keyframes: [
          { scale: 1 }
        ],
        duration: 300
      }, "-=300");
      return tl;
    },
    initHandCoinAnime() {
      const base = {
        opacity: 1,
        duration: 500,
        delay: 700
      };
      const coin1 = anime({
        targets: ".page3 .hand-coin1",
        translateY: "-2.3rem",
        translateX: "-1rem",
        easing: "easeOutExpo",
        ...base
      });

      const coin2 = anime({
        targets: ".page3 .hand-coin2",
        translateY: "-3.6rem",
        easing: "easeOutExpo",
        ...base
      });

      const coin3 = anime({
        targets: ".page3 .hand-coin3",
        translateY: "-2.9rem",
        translateX: "1.4rem",
        easing: "easeOutExpo",
        ...base
      });

      const coin4 = anime({
        targets: ".page3 .hand-coin4",
        translateY: "-2.5rem",
        translateX: "2.9rem",
        easing: "easeOutExpo",
        ...base
      });
      return [coin1, coin2, coin3, coin4];
    },
    initCoinAnime() {
      const base = {
        duration: 1000,
        easing: "easeOutExpo",
        translateY: 0
      };
      const coin1 = anime({
        targets: ".page3 .coin1",
        delay: 300,
        ...base
      });

      const coin2 = anime({
        targets: ".page3 .coin2",
        rotate: 0,
        delay: 300,
        ...base
      });

      const coin3 = anime({
        targets: ".page3 .coin3",
        rotate: -360,
        duration: 1200,
        ...base
      });

      const coin4 = anime({
        targets: ".page3 .coin4",
        rotate: -360,
        duration: 1200,
        ...base
      });
      return [coin1, coin2, coin3, coin4];
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
    margin-left: -80%;
  }
}

.small-box {
  position: absolute;
  width: 330px;
  left: 84px;
  margin-left: -100%;
  bottom: 100px;
  z-index: 4;
}

.big-box {
  position: absolute;
  width: 370px;
  right: 84px;
  bottom: 80px;
  margin-right: -100%;
  z-index: 3;
}

.hand {
  position: absolute;
  width: 640px;
  bottom: 230px;
  left: 56px;
  z-index: 0;
}

.left-voucher {
  position: absolute;
  width: 120px;
  bottom: 295px;
  left: 290px;
  z-index: 1;
  transform-origin: bottom center;
}
.right-voucher {
  position: absolute;
  width: 200px;
  bottom: 230px;
  left: 280px;
  z-index: 2;
  transform-origin: bottom center;
}

.hand-coin {
  position: absolute;
  bottom: 300px;
  width: 100px;
  left: 310px;
  opacity: 0;
  z-index: 1;
}

.coin {
  position: absolute;
}

.coin1 {
  top: 96px;
  right: 64px;
  width: 64px;
}

.coin2 {
  top: 150px;
  right: 120px;
  width: 100px;
}

.coin3 {
  top: 450px;
  right: 120px;
  width: 108px;
}

.coin4 {
  top: 600px;
  right: 120px;
  width: 100px;
}

.active {
  .coin img {
    animation: upDown 3s linear infinite;
  }
  .hand-coin1 img {
    animation: handeCoin1UpDown 5s linear infinite;
  }
  .hand-coin2 img {
    animation: handeCoin2UpDown 5s linear infinite;
  }
  .hand-coin3 img {
    animation: handeCoin3UpDown 5s linear infinite;
  }
  .hand-coin4 img {
    animation: handeCoin4UpDown 5s linear infinite;
  }
}

@keyframes handeCoin1UpDown {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-0.115rem) translateX(-0.05rem);
  }
}

@keyframes handeCoin2UpDown {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.18rem);
  }
}

@keyframes handeCoin3UpDown {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-0.145rem) translateX(0.07rem);
  }
}

@keyframes handeCoin4UpDown {
  0% {
    transform: translateY(0) translateX(0);
  }
  50% {
    transform: translateY(-0.125rem) translateX(0.145rem);
  }
}

@keyframes upDown {
  0% {
    margin-top: 0;
  }
  50% {
    margin-top: 10px;
  }
}
</style>
