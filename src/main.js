import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import VueSocketIO from "vue-socket.io";
import Viser from "viser-vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";
import utils from "@/scripts/utils/utils.js";

Vue.prototype.$utils = utils;
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

// let url = utils.getUrl();
Vue.use(
  new VueSocketIO({
    debug: false,
    // connection: url.type + url.ip
    connection: "http://47.110.42.170:5060"
  })
);

Vue.use(Viser);
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
