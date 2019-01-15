<template>
  <a-layout-sider :class="[theme, 'sider', isMobile ? null : 'shadow']"
                  width="256px"
                  :collapsible="collapsible"
                  v-model="collapsed"
                  :trigger="null">
    <div :class="['logo', theme]">
      <router-link to="/">
        <img src="@/assets/logo-sm.png">
        <h1>{{systemName}}</h1>
      </router-link>
    </div>
    <i-menu class="menus"
            :theme="theme"
            :collapsed="collapsed"
            :menuData="menuData"
            @select="onSelect" />
  </a-layout-sider>
</template>

<script>
import IMenu from "./menu";
export default {
  name: "SiderMenu",
  components: { IMenu },
  props: {
    collapsible: {
      type: Boolean,
      required: false,
      default: false
    },
    collapsed: {
      type: Boolean,
      required: false,
      default: false
    },
    menuData: {
      type: Array,
      required: true
    },
    theme: {
      type: String,
      required: false,
      default: "dark"
    }
  },
  computed: {
    isMobile() {
      return this.$store.state.setting.isMobile;
    },
    systemName() {
      return this.$store.state.setting.systemName;
    }
  },
  methods: {
    onSelect(obj) {
      this.$emit("menuSelect", obj);
    }
  }
};
</script>

<style lang="less" scoped>
.shadow {
  box-shadow: 2px 0 6px rgba(0, 21, 41, 0.35);
}
.sider {
  z-index: 10;
  &.light {
    background-color: #fff;
  }
  &.dark {
    background-color: #001529;
  }
  .logo {
    height: 64px;
    position: relative;
    line-height: 64px;
    padding-left: 24px;
    -webkit-transition: all 0.3s;
    transition: all 0.3s;
    overflow: hidden;
    &.light {
      background-color: #fff;
      h1 {
        color: #1890ff;
      }
    }
    &.dark {
      background-color: #002140;
      h1 {
        color: #fff;
      }
    }
    h1 {
      color: #fff;
      font-size: 20px;
      margin: 0 0 0 12px;
      font-family: "Myriad Pro", "Helvetica Neue", Arial, Helvetica, sans-serif;
      font-weight: 600;
      display: inline-block;
      height: 32px;
      line-height: 32px;
      vertical-align: middle;
    }
    img {
      width: 32px;
      display: inline-block;
      vertical-align: middle;
    }
  }

  .menus {
    max-height: calc(100vh - 64px);
    overflow-y: auto;

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 1px; /*高宽分别对应横竖滚动条的尺寸*/
      height: 1px;
    }
    // &::-webkit-scrollbar-thumb {
    //   /*滚动条里面小方块*/
    //   border-radius: 5px;
    //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   background: rgba(0, 0, 0, 0.2);
    // }
    // &::-webkit-scrollbar-track {
    //   /*滚动条里面轨道*/
    //   -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    //   border-radius: 0;
    //   background: rgba(0, 0, 0, 0.1);
    // }
  }
}
</style>
