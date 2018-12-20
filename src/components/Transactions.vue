<template>
  <div class="transactions">
    <div class="tr-title"> 交易页面：
      <a-button @click="add(0)">转账</a-button>
      <a-button @click="add(1)">注册代理</a-button>
      <a-button @click="add(2)">锁仓</a-button>
      <a-button @click="add(3)">解锁仓</a-button>
      <a-button @click="add(4)">投票</a-button>
      <a-button @click="add(5)">取消投票</a-button>
    </div>
    <div class="tr-content">
      <a-tabs v-model="activeKey"
              type="editable-card"
              hideAdd
              @edit="onEdit">
        <a-tab-pane v-for="pane in panes"
                    :tab="pane.title"
                    :key="pane.key"
                    :closable="pane.closable">
          {{pane.content}}
        </a-tab-pane>
      </a-tabs>
      <Transfer />
    </div>
  </div>
</template>

<script>
import Transfer from "./transactions/Transfer.vue";

export default {
  name: "Transactions",
  components: {
    Transfer
  },
  data() {
    const titles = ["转账", "注册代理", "锁仓", "解锁仓", "投票", "取消投票"];
    return {
      activeKey: null,
      panes: [],
      newTabIndex: 0,
      titles
    };
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
          content: this.panes.length,
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.transactions {
  margin: 10px;
}
.tr-title {
  padding-bottom: 10px;
}
</style>
