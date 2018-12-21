import Vue from 'vue'
import App from './App.vue'
import Axios from 'axios'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false

Vue.use(Antd)

var $ajax = Axios.create({
  baseURL: 'http://47.107.148.76:4096',
  timeout: '3000', 
  headers: {
    'X-Custom-Header': 'foobar'
  } 
})
Vue.prototype.$ajax = $ajax;

new Vue({
  render: h => h(App),
}).$mount('#app')