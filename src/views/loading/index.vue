<template>
  <div class="bg" ref="sem" @click="start">
    <div class="box">
      <span class="side-full"></span>
      <span class="side-half"></span>
      <span class="up-45"></span>
      <span class="down-45"></span>
      <div class="wave" :style="{ '--topmove': '-' + topmove + 'em' }">
      </div>
      <div class="num">{{ percent }}</div>
      <div class="load-text jt-title" :class="{ done: done }">
        <span>{{ done ? "touch to start" : "LOADING" }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "TLoading",

  data() {
    return {
      rafID: 0,
      percent: 0,
      topmove: 10,
      loadDone: false,
      done: false,
      speed: 400,
      finalWaiting: false
    };
  },
  created() {
    const ctr = this.$animationCtr;
    if (!ctr.loaded) {
      ctr.onProgress((done, total) => {
        if (done === total) {
          this.loadDone = true;
          this.speed = 5;
          if (this.finalWaiting) {
            this.loading();
          }
        }
      });
    } else {
      this.loadDone = true;
      this.speed = 5;
    }
  },

  mounted() {
    this.changeFontSize();
    window.addEventListener("resize", this.changeFontSize);
    this.loading();
  },

  methods: {
    // 波浪动画以及进度数控制
    loading() {
      if (!this.loadDone && this.percent === 99) {
        this.finalWaiting = true;
        return;
      }
      this.percent += 1;
      this.topmove = 10 + 15.8 / 100 * this.percent;
      if (this.percent < 100) {
        setTimeout(() => {
          this.rafID = requestAnimationFrame(this.loading);
        }, this.speed);
      } else {
        this.done = true;
      }
    },
    changeFontSize() {
      const deviceWidth = document.documentElement.clientWidth || document.body.clientWidth;
      this.$refs.sem.style.fontSize = deviceWidth / 23.4375 + "px";
    },
    start() {
      if (!this.done) return;
      this.$animationCtr.playAudio();
      this.$router.push("/index");
    }
  },
  destroyed() {
    window.removeEventListener("resize", this.changeFontSize);
    cancelAnimationFrame(this.rafID);
  }
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 正方体盒子以及文字 */
.box {
  position: relative;
  width: 15em;
  height: 15em;
  transform: scale(0.5);
}

/* 进度文本 */
.num {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 2.5em;
}

/* 加载文本 */
.load-text {
  position: absolute;
  top: 120%;
  width: 100%;
  text-align: center;
  // left: 50%;
  // transform: translatex(-47%);
  letter-spacing: 0.9em;
  font-size: 1.5em;
  animation: 3s loadtext infinite linear;

  &.done {
    letter-spacing: 0;
    font-weight: 500;
    font-size: 2.3em;
  }
}

/* 液体动画 */
.wave {
  --topmove: -10em;
  position: absolute;
  top: -3em;
  left: 0;
  width: 14.8em;
  height: 17em;
  clip-path: polygon(50% 0, 100% 3em, 100% 14em, 50% 100%, 0 14em, 0 3em);
  z-index: -1;
  overflow: hidden;
  background-color: #ff0000;
}

.wave::before,
.wave::after {
  content: '';
  position: absolute;
  top: var(--topmove);
  left: -5em;
  width: 25em;
  height: 25em;
  border-radius: 40%;
  background: white;
  transition: all .1s linear;
}

.wave::before {
  animation: 4s load infinite linear;
}

.wave::after {
  animation: 4s load 2s infinite linear;
}

/* 正方体架 */
.box>span {
  position: absolute;
  top: 0;
  left: 0;
  width: 0.5em;
  background: #cb913e;
  transform-origin: top center;
}

.side-full {
  height: 11em;
  box-shadow: 14.4em 0 0 0 #cb913e;
}

.side-half {
  height: 11em;
  left: 7.25em !important;
  top: 2.8em !important;
  background: linear-gradient(to bottom, #cb913e 2em, #0000 2em 8.5em, #cb913e 8.5em) !important;
}

.up-45 {
  height: 8em;
  transform: rotate(-112deg) translate(-0.1em, -0.2em);
  box-shadow: -5.4em 5.65em 0 0 #cb913e,
    -15.35em 1.64em 0 0 #cb913e;
}

.down-45 {
  height: 8em;
  transform: rotate(-68deg);
  box-shadow: 5.3em 5.542em 0 0 #cb913e,
    2.7em 2.8em 0 0 #cb913e,
    -10.05em 3.9em 0 0 #cb913e;
}

@keyframes load {
  from {
    transform: rotate(360deg);
  }
}

@keyframes loadtext {

  0%,
  25% {
    opacity: 1;
  }

  12.5% {
    opacity: 0;
  }
}

/* 正方体盒子 */
</style>
