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
      <Layout class="home-body-layout"
              :resize="true"
              :edit="false"
              :splits="tree">
        <div class="layout-content">
          <transactions v-if="openKeys[0] === 'sub1'"
                        :choose1="choose1" />
          <queryInfo v-else-if="openKeys[0] === 'sub2'"
                     :choose2="choose2" />
          <createFlie v-else-if="openKeys[0] === 'sub3'"
                      :choose3="choose3" />
        </div>
        <Pane class="layout-pane"
              title="返回信息："></Pane>
      </Layout>
    </div>
  </div>
</template>

<script>
import Transactions from "./Transactions.vue";
import QueryInfo from "./QueryInfo.vue";
import CreateFlie from "./CreateFlie.vue";

import { Layout, Pane } from "vue-split-layout";

export default {
  name: "Home",
  components: {
    Transactions,
    QueryInfo,
    CreateFlie,
    Layout,
    Pane
  },
  data() {
    return {
      tree: {
        dir: "vertical",
        first: 0,
        second: 1,
        split: "70%"
      },
      rootSubmenuKeys: ["sub1", "sub2", "sub3"],
      openKeys: ["sub1"],
      menus: {
        sub1: {
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
        sub2: {
          name: "查询",
          icon: "search",
          key: "sub2",
          subItems: [
            { name: "账户信息", key: "sub2-1" },
            { name: "交易信息", key: "sub2-2" },
            { name: "区块信息", key: "sub2-3" }
          ]
        },
        sub3: {
          name: "生成",
          icon: "form",
          key: "sub3",
          subItems: [{ name: "创世快", key: "sub3-1" }]
        }
      },
      choose1: {
        items: [],
        key: ""
      },
      choose2: {
        items: [],
        key: ""
      },
      choose3: {
        items: [],
        key: ""
      }
    };
  },
  methods: {
    onOpenChange(openKeys) {
      console.log("openKeys", openKeys);
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
    },
    onSelect(selectedKeys) {
      console.log(selectedKeys, this.openKeys[0]);
      if (this.openKeys[0] === "sub1") {
        this.choose1.items = this.menus[this.openKeys[0]].subItems;
        this.choose1.key = selectedKeys.key;
      }
      if (this.openKeys[0] === "sub2") {
        this.choose2.items = this.menus[this.openKeys[0]].subItems;
        this.choose2.key = selectedKeys.key;
      }
      if (this.openKeys[0] === "sub3") {
        this.choose3.items = this.menus[this.openKeys[0]].subItems;
        this.choose3.key = selectedKeys.key;
      }
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  width: 100%;
  // max-width: 1080px;
  // overflow: auto;
  top: 4rem;
  bottom: 3rem;
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

    .layout-content {
      height: 100%;
      overflow: auto;
    }
  }
}
</style>
