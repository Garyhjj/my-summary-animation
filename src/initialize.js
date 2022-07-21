import { page1Assets, page2Assets, page3Assets, page4Assets, page5Assets } from "./config";

export default function({ store, router, Vue }) {
  let loaded = false;
  const animationCtr = Vue.prototype.$animationCtr;
  const routePathList = ["/index", "/page2", "/page3", "/page4", "/page5"];
  animationCtr.routePathList = routePathList;
  animationCtr.bgAudio = require("@/assets/audios/bg.mp3");
  animationCtr.images = [page1Assets, page2Assets, page3Assets, page4Assets, page5Assets];
  animationCtr.preloadAssets();

  router.beforeEach((to, from, next) => {
    if (!loaded) {
      loaded = true;
      store.dispatch("app/updateSummaryData", to.query);
    }
    const { path } = to;
    if (!animationCtr.loaded && path !== "/loading") {
      next("/loading");
      return;
    }
    const currentPathIdx = routePathList.findIndex(r => r === path);
    animationCtr.activeRouteIdx = Math.max(currentPathIdx, 0);
    next();
  });
}
