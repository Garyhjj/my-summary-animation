export default {
  install(vue) {
    vue.prototype.$animation = new AnimationContorller();
  }
};

class AnimationContorller {
  constructor() {
    this.sortIdArr = []; // 动画的排序
    this.blockAnimationArr = [];
    this.forwardTransitions = []; // 前进的过度效果
    this.backTransitions = []; // 后退的过度效果
    this.activeIdx = -1;
    this.activeSubIdx = 0;
    this.currentAnimation = null; // 当前的主动画，不包含过度动画
    this.hasStarted = false; // 是否已前进过
    this.goingNext = true; // 是否往前走
    this.hasCallForwardTransistion = false; // 实现过度效果来回进行的变量
    this.hasCallBackTransistion = false; // 实现过度效果来回进行的变量
    this.inTransition = false;
    this.latestTransistionIdx = -1; // 判断是否要进行过度效果
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

  createPageAnimation(id, animations) {
    const target = this.blockAnimationArr.find((a) => a.id === id);
    const data = new BlockAnimation(id, animations);
    if (target) {
      Object.assign(target, data);
    } else {
      this.blockAnimationArr.push(data);
    }
  }

  addBlockAnimation(blockAnimation) {
    const idx = this.blockAnimationArr.findIndex(
      (a) => a.id === blockAnimation.id
    );
    if (idx > -1) {
      this.blockAnimationArr.splice(idx, 1, blockAnimation);
    } else {
      this.blockAnimationArr.push(blockAnimation);
    }
    this.updateTransitions();
  }

  updateTransitions() {
    const { blockAnimationArr } = this;
    const lg = blockAnimationArr.length;
    const forward = [];
    const back = [];
    blockAnimationArr.forEach((a, idx) => {
      if (idx < lg - 1) {
        forward.push(
          this.patchTransition(() =>
            Promise.all([
              a.leaveAnimation.runForward(),
              blockAnimationArr[idx + 1].enterAnimation.runForward()
            ])
          )
        );
        back.push(
          this.patchTransition(() =>
            Promise.all([
              a.leaveAnimation.runBack(),
              blockAnimationArr[idx + 1].enterAnimation.runBack()
            ])
          )
        );
      } else {
        if (a.leaveAnimation) {
          forward.push(this.patchTransition(() => a.leaveAnimation.runForward()));
          back.push(this.patchTransition(() => a.leaveAnimation.runBack()));
        }
      }
    });
    this.forwardTransitions = forward;
    this.backTransitions = back;
  }

  patchTransition(fn) {
    return function() {
      this.inTransition = true;
      return fn().then(() => {
        this.inTransition = false;
      });
    }.bind(this);
  }

  callTransition(isForward, idx) {
    if (isForward) {
      this.hasCallForwardTransistion = true;
      this.hasCallBackTransistion = false;
    } else {
      this.hasCallBackTransistion = true;
      this.hasCallForwardTransistion = false;
    }
    (isForward ? this.forwardTransitions : this.backTransitions)[
      idx !== undefined ? idx : this.activeIdx
    ]();
  }

  createAnimation(forward, back, duration) {
    return new Animation(forward, back, duration);
  }

  getCurrentAnimation() {
    const { sortIdArr } = this;
    if (this.activeIdx >= sortIdArr.length) return;
    const pageId = sortIdArr[this.activeIdx];
    const pageAnimation = this.blockAnimationArr.find((a) => a.id === pageId);
    return pageAnimation.animations[this.activeSubIdx];
  }

  updateNextIdx() {
    const { sortIdArr } = this;
    const pageId = sortIdArr[this.activeIdx];
    const pageAnimation = this.blockAnimationArr.find((a) => a.id === pageId);
    if (!pageAnimation) {
      if (this.activeIdx < sortIdArr.length - 1) {
        this.activeIdx++;
        this.activeSubIdx = -1;
        return this.updateNextIdx();
      } else {
        return false;
      }
    }
    const { animations } = pageAnimation;
    if (this.activeSubIdx >= animations.length - 1) {
      if (this.activeIdx < sortIdArr.length - 1) {
        this.activeIdx++;
        this.activeSubIdx = -1;
        return this.updateNextIdx();
      } else {
        return false;
      }
    }
    this.activeSubIdx++;
    return true;
  }

  updatePreIdx() {
    if (this.activeSubIdx === 0 && this.activeIdx > 0) {
      this.activeIdx--;
      this.activeSubIdx = Infinity;
      return this.updatePreIdx();
    }
    const { sortIdArr } = this;
    const pageId = sortIdArr[this.activeIdx];
    const pageAnimation = this.blockAnimationArr.find((a) => a.id === pageId);
    if (!pageAnimation) {
      if (this.activeIdx > 0) {
        this.activeId--;
        this.activeSubIdx = Infinity;
        return this.updatePreIdx();
      } else {
        return false;
      }
    }
    const { animations } = pageAnimation;
    this.activeSubIdx =
      this.activeSubIdx > animations.length - 1 ? animations.length : this.activeSubIdx;
    if (this.activeSubIdx <= 0) {
      if (this.activeIdx > 0) {
        this.activeIdx--;
        this.activeSubIdx = Infinity;
        return this.updatePreIdx();
      } else {
        return false;
      }
    }
    this.activeSubIdx--;
    return true;
  }

  isWaiting() {
    return (
      (this.currentAnimation && this.currentAnimation.active) ||
      this.inTransition
    );
  }

  next() {
    this.hasStarted = true;
    if (this.isWaiting()) return;
    // if (this.hasCallBackTransistion && this.forwardTransitions.length > 0) {
    //   this.callTransition(true);
    //   return;
    // }
    if (this.goingNext) {
      // if (this.activeIdx >= 0 && this.activeSubIdx === this.blockAnimationArr[this.activeIdx].animations.length - 1 && this.latestTransistionIdx !== this.activeIdx && this.forwardTransitions.length > 0) {
      //   this.latestTransistionIdx = this.activeIdx;
      //   this.callTransition(true);
      //   const oldActiveIdx = this.activeIdx;
      //   this.updateNextIdx();
      //   if (oldActiveIdx < this.activeIdx) {
      //     // 给下一次next的时候添加回去
      //     this.activeSubIdx--;
      //   }
      //   return;
      // }
      if (!this.updateNextIdx()) return;
    } else {
      this.goingNext = true;
    }
    const curr = this.getCurrentAnimation();
    if (curr) {
      this.currentAnimation = curr;
      curr.runForward();
    }
    this.hasCallBackTransistion = false;
    this.hasCallForwardTransistion = false;
    this.latestTransistionIdx = -1;
  }

  back() {
    if (!this.hasStarted || this.isWaiting()) return;
    // if (this.hasCallForwardTransistion) {
    //   this.callTransition(false);
    //   return;
    // }
    if (this.goingNext) {
      this.goingNext = false;
    } else {
      // if (this.activeSubIdx === 0 && this.activeIdx > 0 && this.latestTransistionIdx !== this.activeIdx - 1) {
      //   this.updatePreIdx();
      //   this.latestTransistionIdx = this.activeIdx;
      //   this.callTransition(false);
      //   this.activeSubIdx++;
      //   return;
      // }
      if (!this.updatePreIdx()) return;
    }
    const curr = this.getCurrentAnimation();
    if (curr) {
      this.currentAnimation = curr;
      curr.runBack();
    }
    this.hasCallBackTransistion = false;
    this.hasCallForwardTransistion = false;
    this.latestTransistionIdx = -1;
  }
}

export class BlockAnimation {
  constructor(id, animations) {
    this.id = id;
    this.animations = animations;
    this.enterAnimation = null;
    this.leaveAnimation = null;
  }

  addEnterAnimation(animation) {
    this.enterAnimation = animation;
  }
  addLeaveAnimation(animation) {
    this.leaveAnimation = animation;
  }

  addAnimation(animation) {
    animation = Array.isArray(animation) ? animation : [animation];
    this.animations.push(...animation);
  }
}

class Animation {
  constructor(forward, back, duration = 0.3) {
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
      setTimeout(() => {
        this.active = false;
        resolve(res);
      }, this.duration * 1000);
    });
  }
}
