<template>
  <div class="queryinfo">
    <div class="qi-title"> 查询页面： </div>
    <div v-show="panes.length > 0"
         class="qi-content">
      <a-tabs v-model="activeKey"
              type="editable-card"
              hideAdd
              @edit="onEdit">
        <a-tab-pane v-for="pane in panes"
                    :tab="pane.title"
                    :key="pane.key"
                    :closable="pane.closable">
          <Account v-show="pane.title === titles[0]"></Account>
          <Transaction v-show="pane.title === titles[1]"></Transaction>
          <Block v-show="pane.title === titles[2]"></Block>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import Block from "./Block.vue";
import Account from "./Account.vue";
import Transaction from "./Transaction.vue";

export default {
  components: {
    Block,
    Account,
    Transaction
  },
  data() {
    const titles = ["账户信息", "交易信息", "区块信息"];
    return {
      activeKey: null,
      panes: [],
      newTabIndex: 0,
      titles
    };
  },
  props: {
    choose2: Object
  },
  watch: {
    choose2: {
      handler() {
        let items = this.choose2.items;
        let key = this.choose2.key;
        let num = 0;
        for (let i = 0; i < items.length; i++) {
          if (items[i].key === key) {
            num = i;
            break;
          }
        }

        this.add(num);
      },
      deep: true
    }
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    add(num) {
      let activeKey = `newTab${num}`;
      let title = this.titles[num];
      let has = false;
      for (let i = 0; i < this.panes.length; i++) {
        if (this.panes[i].title === title) {
          has = true;
          break;
        }
      }
      if (!has) {
        this.panes.push({
          title: title,
          key: activeKey
        });
      }
      this.activeKey = activeKey;
    },
    remove(targetKey) {
      let activeKey = this.activeKey;
      let lastIndex;
      this.panes.forEach((pane, i) => {
        if (pane.key === targetKey) {
          lastIndex = i - 1;
        }
      });
      const panes = this.panes.filter(pane => pane.key !== targetKey);
      if (lastIndex >= 0 && activeKey === targetKey) {
        activeKey = panes[lastIndex].key;
      }
      this.panes = panes;
      this.activeKey = activeKey;
    }
  }
};
</script>

<style lang="less" scoped>
.qi-title {
  padding-bottom: 10px;
}
</style>
