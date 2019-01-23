import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import Viser from "viser-vue";
import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

Vue.use(Viser);
Vue.use(Antd);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
