<template>
  <div class="home">
    <div class="home-menu">
      <a-menu mode="inline" :openKeys="openKeys" @openChange="onOpenChange" style="width: 256px">
        <a-sub-menu key="sub1">
          <span slot="title">
            <a-icon type="swap"/>
            <span>交易</span>
          </span>
          <a-menu-item key="tr-1">转账</a-menu-item>
          <a-menu-item key="tr-2">注册代理</a-menu-item>
          <a-menu-item key="tr-3">锁仓</a-menu-item>
          <a-menu-item key="tr-4">解锁仓</a-menu-item>
          <a-menu-item key="tr-5">投票</a-menu-item>
          <a-menu-item key="tr-6">取消投票</a-menu-item>
          <a-menu-item key="tr-7">冻结</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub2">
          <span slot="title">
            <a-icon type="search"/>
            <span>查询</span>
          </span>
          <a-menu-item key="si-1">账户信息</a-menu-item>
          <a-menu-item key="si-2">交易信息</a-menu-item>
          <a-menu-item key="si-3">区块信息</a-menu-item>
        </a-sub-menu>
        <a-sub-menu key="sub3">
          <span slot="title">
            <a-icon type="form"/>
            <span>生成</span>
          </span>
          <a-menu-item key="cf-1">创世快</a-menu-item>
          <a-menu-item key="cf-2">Option 10</a-menu-item>
          <a-menu-item key="cf-3">Option 11</a-menu-item>
          <a-menu-item key="cf-4">Option 12</a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="home-body">
      <div v-show="openKeys[0] === 'sub1'">
        <Transactions/>
      </div>
      <div v-show="openKeys[0] === 'sub2'">
        <SeleteInfo/>
      </div>
      <div v-show="openKeys[0] === 'sub3'">
        <CreateFlie/>
      </div>
    </div>
  </div>
</template>

<script>
import Transactions from "./Transactions.vue";
import SeleteInfo from "./SeleteInfo.vue";
import CreateFlie from "./CreateFlie.vue";

export default {
  name: "Home",
  components: {
    Transactions,
    SeleteInfo,
    CreateFlie
  },
  data() {
    return {
      rootSubmenuKeys: ["sub1", "sub2", "sub3"],
      openKeys: ["sub1"]
    };
  },
  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  max-width: 1080px;
  overflow: auto;
  top: 4rem;
  bottom: 4rem;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: space-between ;

  .home-menu {
    width: 260px;
  }
  .home-body {
    margin: 15px;
    width: calc(100% - 270px); 
  }
}
</style>
