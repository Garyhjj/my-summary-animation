import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets

import App from "./App.vue";
import router from "./router";

import store from "./store";

import "@/styles/index.scss";
import "@/components";
import "@/layout/index.js";
// svg 图标
import "@/assets/svg-icons";
import animation from "@/libs/animation";

Vue.config.productionTip = false;

Vue.use(animation);

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
