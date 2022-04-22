import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./plugins/element";
import "animate.css";
import store from "@/store";

Vue.config.productionTip = false;
Vue.prototype.$bus = new Vue();
new Vue({
  router,
  render: h => h(App),
  store
}).$mount("#app");
