export default {
  install(vue, router) {
    const animationCtr = vue.prototype.$animationCtr = new AnimationContorller(router);
    animationCtr.bindEl(window.document.body);
  }
};

class AnimationContorller {
  constructor(router) {
    this.activeIdx = -1;
    this.routePathList = [];
    this.activeRouteIdx = 0;
    this.animations = [];
    this.shouldWait = false; // 是否开启等待每一次动画完成才进行下一个，不开启时locked无效
    this.currentAnimation = null; // 当前的主动画
    this.hasStarted = false; // 是否已前进过
    this.goingNext = true; // 是否往前走
    this.locked = true; // 每个页面初始化后要先解锁才能开始
    this.router = router;
    this.bgAudio = "";
    this.audio = null;
    this.loaded = false;
    this.images = [];
    this.progressCallback = () => {};
    this.beforeGoBack = () => Promise.resolve();
  }

  bindEl(el) {
    let startY = -1;
    let endY = -1;
    const removeFns = [];

    const checkFn = () => {
      if (startY > 0 && endY > 0 && startY !== endY) {
        if (endY < startY) {
          this.next();
        } else {
          this.back();
        }
      }
    };
    const bindEvent = (name, fn) => {
      el.addEventListener(name, fn);
      return removeFns.push(() => el.removeEventListener(name, fn));
    };
    bindEvent("mousedown", (e) => {
      startY = -1;
      endY = -1;
      const { clientY } = e;
      startY = clientY;
    });
    bindEvent("mousemove", (e) => {
      const { clientY } = e;
      endY = clientY;
    });
    bindEvent("mouseup", checkFn);
    bindEvent("touchstart", (e) => {
      startY = -1;
      endY = -1;
      const { clientY } = e.touches[0];
      startY = clientY;
    });
    bindEvent("touchmove", (e) => {
      const { clientY } = e.touches[0];
      endY = clientY;
    });
    bindEvent("touchend", checkFn);
    return () => {
      removeFns.forEach((fn) => fn());
    };
  }

  preloadAssets() {
    this.preloadBgAudio();
    const flatImages = [];
    this.images.forEach(o => {
      for (const key in o) {
        flatImages.push(this.preloadImg(o[key]));
      }
    });
    const total = flatImages.length + 1;
    let loadedCount = 0;
    const patchAddCountPromise = (p) => p.then(res => {
      loadedCount++;
      this.progressCallback(loadedCount, total);
      if (loadedCount === total) {
        this.loaded = true;
      }
      return res;
    });
    this.progressCallback(loadedCount, total);
    Promise.all([this.preloadBgAudio(), ...flatImages].map(patchAddCountPromise));
  }

  onProgress(fn) {
    this.progressCallback = fn;
  }

  preloadBgAudio() {
    return new Promise((resolve, reject) => {
      if (this.bgAudio) {
        const audio = document.createElement("audio");
        audio.style.display = "none";
        audio.autoplay = true;
        audio.addEventListener("canplaythrough", () => {
          resolve(audio);
        });
        audio.addEventListener("ended", () => {
          audio.play();
        });
        audio.onerror = (err) => reject(err);
        // window.addEventListener("click", () => audio.play());
        document.body.appendChild(audio);
        audio.src = this.bgAudio;
        audio.load();
        this.audio = audio;
      }
    });
  }

  playAudio() {
    this.audio.play();
  }

  preloadImg(url) {
    return new Promise(resolve => {
      var img = new Image();
      img.onload = function() {
        if (this.complete === true) {
          resolve(url);
          img = null;
        }
      };
      img.onerror = function() {
        resolve(false);
        img = null;
      };
      img.src = url;
    });
  }

  setAnimations(ls) {
    this.animations = ls;
  }

  setRoutePathList(ls) {
    this.routePathList = ls;
  }

  createAnimation(forward, back, duration) {
    return new Animation(forward, back, duration);
  }

  getCurrentAnimation() {
    return this.animations[this.activeIdx];
  }

  updateNextIdx() {
    const { animations } = this;
    if (this.activeIdx >= animations.length - 1) {
      return false;
    }
    this.activeIdx++;
    return true;
  }

  updatePreIdx() {
    if (this.activeIdx <= 0) {
      return false;
    }
    this.activeIdx--;
    return true;
  }

  isWaiting() {
    return this.shouldWait && (this.locked || (this.currentAnimation && this.currentAnimation.active));
  }

  next() {
    this.hasStarted = true;
    if (this.isWaiting()) return;
    if (this.goingNext) {
      if (!this.updateNextIdx()) {
        return;
      }
    } else {
      this.goingNext = true;
    }
    const curr = this.getCurrentAnimation();
    if (curr) {
      this.currentAnimation = curr;
      curr.runForward().then(() => {
        this.shouldGoToNextRoute();
      });
    }
  }

  back() {
    if (this.isWaiting()) return;
    if (!this.hasStarted) {
      if (this.activeIdx <= 0) {
        this.activeIdx <= 0;
        this.shouldGoToPreRoute();
      }
      return;
    }
    if (this.goingNext) {
      this.goingNext = false;
    } else {
      if (!this.updatePreIdx()) {
        this.shouldGoToPreRoute();
        return;
      }
    }
    const curr = this.getCurrentAnimation();
    if (curr) {
      this.currentAnimation = curr;
      curr.runBack();
    }
  }

  async shouldGoToPreRoute() {
    if (this.activeRouteIdx <= 0) {
      return;
    }
    this.activeRouteIdx--;
    this.locked = true;
    await this.beforeGoBack();
    this.locked = false;
    this.changeRoute();
  }

  shouldGoToNextRoute() {
    if (this.activeRouteIdx >= this.routePathList.length - 1) {
      return;
    }
    this.activeRouteIdx++;
    this.changeRoute();
    this.locked = true;
  }

  changeRoute() {
    this.router.push(this.routePathList[this.activeRouteIdx]);
    this.activeIdx = -1;
    this.hasStarted = false;
    this.currentAnimation = null;
  }
}

class Animation {
  constructor(forward, back, duration) {
    this.forward = forward;
    this.back = back;
    this.duration = duration;
    this.active = false;
  }

  runForward() {
    return this.run(true);
  }

  runBack() {
    return this.run(false);
  }

  run(isForward) {
    const fn = isForward ? this.forward : this.back;
    this.active = true;
    return new Promise((resolve, reject) => {
      const res = fn();
      if (!res) {
        this.duration = 0.3;
      }
      if (this.duration) {
        setTimeout(() => {
          this.active = false;
          resolve(res);
        }, this.duration * 1000);
        return;
      }
      if (typeof res.then === "function") {
        res.then(() => {
          this.active = false;
          resolve();
        });
      }
    });
  }
}
