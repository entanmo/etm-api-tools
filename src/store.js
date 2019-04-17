import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    setting: {
      isMobile: false,
      theme: "dark",
      layout: "side",
      multipage: true,
      systemName: "En-Tan-Mo Tools"
    },
    account: {
      user: {
        avatar: "@/assets/logo-sm.png"
      }
    },
    api: {
      accounts: {},
      transactions: {},
      blocks: {},
      delegates: {},
      peers: {},
      loader: {},
      signatures: {},
      multisignatures: {},
      lockvote: {},
      returnMsg: ""
    },
    signed: {}
  },
  mutations: {
    setDevice(state, isMobile) {
      state.setting.isMobile = isMobile;
    },
    setTheme(state, theme) {
      state.setting.theme = theme;
    },
    setLayout(state, layout) {
      state.setting.layout = layout;
    },
    setMultipage(state, multipage) {
      state.setting.multipage = multipage;
    },
    setuser(state, user) {
      state.account.user = user;
    }
  },
  actions: {}
});
