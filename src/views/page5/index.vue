<template>
    <div class="page">
        <div class="text">
            <div class="text-name">
                Total Delivered
            </div>
            <div class="text-year">
                <span>International <b>386</b> parcels</span>
                <span>Domestic <b>1385</b> parcels</span>
            </div>
        </div>
        <div class="text2">
            <div class="text-name">
                Total Received
            </div>
            <div class="text-year">
                <span><b>27</b> parcels</span>
            </div>
        </div>
        <div class="clock " :class="{jitter:isPlay}">
            <img src="~@/assets/images/2nd Links/Clock.png">
        </div>
        <!-- <div class="cover">
        </div> -->
    </div>
</template>

<script>
export default {
  name: "Link1st",

  data() {
    return {
      isPlay: true,
      rafID: 0
    };
  },

  mounted() {
    this.rafID = window.requestAnimationFrame(this.clockJitter);
  },

  methods: {
    clockJitter() {
      const _that = this;
      // window.requestAnimationFrame(function() {
      //     window.requestAnimationFrame(function() {
      //         _that.isPlay = !this.isPlay;
      //     });
      // });
      window.requestAnimationFrame(function() {
        if (_that.isPlay) {
          window.setTimeout(() => {
            _that.isPlay = !_that.isPlay;
            _that.rafID = window.requestAnimationFrame(_that.clockJitter);
          }, 1500);
        } else {
          window.setTimeout(() => {
            _that.isPlay = !_that.isPlay;
            _that.rafID = window.requestAnimationFrame(_that.clockJitter);
          }, 2000);
        }
      });
    }
  },
  destroyed() {
    window.cancelAnimationFrame(this.rafID);
  }
};
</script>

<style scoped>
    b{
        color: black;
    }
    .page{
        position: relative;
        width: 100%;
        height: 100%;
    }
    .text{
        position: absolute;
        left: 5%;
        top: 5%;
    }
    .text2{
        position: absolute;
        left: 5%;
        top: 20%;
    }
    .text-name{
        font-weight: 700;
        font-size: 1.7rem;
        color:#f03535;
    }
    .text-year{
        font-size: 1.2rem;

    }
    .text-year > span{
        display: block;
        color:gray;
    }
    .cover{
        position: absolute;
        top: 0;
        left: 5%;
        background: linear-gradient(to bottom,#0000 0%,#fff 30%);
        background:white;
        width: 15rem;
        height: 15rem;
        transform-origin: top left;
        border-bottom-right-radius: 75%;
        box-shadow: 0rem 0rem 10rem 8rem rgba(255, 255, 255, 1);
        animation:2s rotateo ease infinite;
    }
    .clock{
        position: absolute;
        bottom: 0;
        transform-origin: top;

    }
    .jitter {
        animation-duration: 0.1ms;
        animation-name: alarm;
        animation-iteration-count: infinite;
    }
    @keyframes rotateo{
        0%{
            left: 5%;
            top: 0;
            transform: rotate(0);
        }
        100%{
            left: -30%;
            top: 20%;
            transform: rotate(90deg);
        }
        /* 100%{
            left: 5%;
            top: 5%;
            transform: rotate(0);
        } */
    }
    @keyframes alarm-1 {
        25% , 75% {
            transform: rotateX(1deg) rotateZ(-0.25deg) scaleX(1.01);
        }
        50%{
            transform: rotateX(0deg) rotateZ(-0.5deg) scaleX(1);
        }
        0% , 100% {
            transform: rotateX(0deg) rotateZ(0deg) scaleX(1);
        }
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

</style>
