<template>
  <div class="home">
    <div class="home-menus">
      <a-menu mode="inline"
              :openKeys="openKeys"
              @openChange="onOpenChange"
              @select="onSelect"
              style="width: 256px">
        <a-sub-menu v-for="(menu,key) in menus"
                    :key="key">
          <span slot="title">
            <a-icon :type="menu.icon" />
            <span>{{menu.name}}</span>
          </span>
          <a-menu-item v-for="sub in menu.subItems"
                       :key="sub.key">{{sub.name}}
          </a-menu-item>
        </a-sub-menu>
      </a-menu>
    </div>
    <div class="home-body">
      <transactions v-show="openKeys[0] === 'sub1'" :choose = "choose"/>
      <seleteInfo v-show="openKeys[0] === 'sub2'" :choose = "choose"/>
      <createFlie v-show="openKeys[0] === 'sub3'" :choose = "choose"/>
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
      openKeys: ["sub1"],
      menus: {
        sub1:{
          name: "交易",
          icon: "swap",
          key: "sub1",
          subItems: [
            { name: "转账", key: "sub1-1" },
            { name: "代理", key: "sub1-2" },
            { name: "锁仓", key: "sub1-3" },
            { name: "投票", key: "sub1-4" },
            { name: "冻结", key: "sub1-5" },
            { name: "二级密码", key: "sub1-6" },
            { name: "多重签名", key: "sub1-7" }
          ]
        },
        sub2:{
          name: "查询",
          icon: "search",
          key: "sub2",
          subItems: [
            { name: "账户信息", key: "sub2-1" },
            { name: "交易信息", key: "sub2-2" },
            { name: "区块信息", key: "sub2-3" }
          ]
        },
        sub3:{
          name: "生成",
          icon: "form",
          key: "sub3",
          subItems: [{ name: "创世快", key: "sub3-1" }]
        }
      },
      choose:{
        items:[],
        key:""
      }
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
    },
    onSelect(selectedKeys){
      this.choose.items = this.menus[this.openKeys[0]].subItems;
      this.choose.key = selectedKeys.key;
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  // max-width: 1080px;
  overflow: auto;
  top: 4rem;
  bottom: 4rem;
  position: absolute;
  z-index: 10;
  display: flex;
  justify-content: flex-end;

  .home-menu {
    width: 260px;
  }
  .home-body {
    margin: 15px;
    width: calc(100% - 270px);
  }
}
</style>
