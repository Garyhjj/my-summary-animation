import Vue from "vue";

import "normalize.css/normalize.css"; // A modern alternative to CSS resets
import "amfe-flexible";

import App from "./App.vue";
import router from "./router";

import store from "./store";
import initialize from "./initialize";

import "@/styles/index.scss";
import "@/layout/index.js";

import animationCtr from "@/libs/animation-controller";

Vue.config.productionTip = false;

Vue.use(animationCtr, router);

initialize({ Vue, router, store });

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount("#app");
