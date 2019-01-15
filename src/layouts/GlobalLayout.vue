<template>
  <a-layout>
    <drawer v-if="isMobile"
            :openDrawer="collapsed"
            @change="onDrawerChange">
      <sider-menu :theme="theme"
                  :menuData="menuData"
                  :collapsed="false"
                  :collapsible="false"
                  @menuSelect="onMenuSelect" />
    </drawer>
    <sider-menu v-else-if="layout === 'side'"
                :theme="theme"
                :menuData="menuData"
                :collapsed="collapsed"
                :collapsible="true" />
    <a-layout>
      <global-header :menuData="menuData"
                     :collapsed="collapsed"
                     @toggleCollapse="toggleCollapse" />
      <a-layout-content :style="{minHeight: minHeight, margin: '24px 24px 0'}">
        <slot></slot>
      </a-layout-content>
      <!-- <a-layout-footer style="padding: 0px">
        <global-footer :link-list="linkList" :copyright="copyright" />
      </a-layout-footer> -->
    </a-layout>
  </a-layout>
</template>

<script>
import GlobalHeader from "./GlobalHeader";
// import GlobalFooter from "./GlobalFooter";
import Drawer from "../components/tool/Drawer";
import SiderMenu from "../components/menu/SiderMenu";

// const minHeight = window.innerHeight - 64 - 24 - 122;
const minHeight = window.innerHeight - 64 - 24 - 1;

let menuData = [];

export default {
  name: "GlobalLayout",
  components: {
    SiderMenu,
    Drawer,
    // GlobalFooter,
    GlobalHeader
  },
  data() {
    return {
      minHeight: minHeight + "px",
      collapsed: false,
      menuData: menuData,
      showSetting: false
    };
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    theme() {
      return this.$store.state.setting.theme;
    },
    layout() {
      return this.$store.state.setting.layout;
    },
    linkList() {
      return this.$store.state.setting.footerLinks;
    },
    copyright() {
      return this.$store.state.setting.copyright;
    }
  },
  methods: {
    toggleCollapse() {
      this.collapsed = !this.collapsed;
    },
    onDrawerChange(show) {
      this.collapsed = show;
    },
    onMenuSelect() {
      this.toggleCollapse();
    },
    onSettingDrawerChange(val) {
      this.showSetting = val;
    }
  },
  beforeCreate() {
    menuData = this.$router.options.routes.find(item => item.path === "/")
      .children;
  }
};
</script>

<style lang="less" scoped>
</style>
