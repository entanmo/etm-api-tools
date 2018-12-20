<template>
  <div class="transactions">
    <div class="tr-title">交易页面：
      <a-button size="small" @click="add(0)">转账</a-button>
      <a-button size="small" @click="add(1)">注册代理</a-button>
      <a-button size="small" @click="add(2)">锁仓</a-button>
      <a-button size="small" @click="add(3)">解锁仓</a-button>
      <a-button size="small" @click="add(4)">投票</a-button>
      <a-button size="small" @click="add(5)">取消投票</a-button>
      <a-button size="small" @click="add(6)">冻结</a-button>
    </div>
    <div v-show="panes.length > 0" class="tr-content">
      <a-tabs v-model="activeKey" type="editable-card" hideAdd @edit="onEdit">
        <a-tab-pane
          v-for="pane in panes"
          :tab="pane.title"
          :key="pane.key"
          :closable="pane.closable"
        >{{pane.content}}</a-tab-pane>
      </a-tabs>
    </div>
    <Transfer/>
    <!-- <Delegate/> -->
    <Lock/>
    <Unlock/>
    <Vote/>
    <Unvote/>
    <Freeze/>
  </div>
</template>

<script>
import Transfer from "./transactions/Transfer.vue";
import Delegate from "./transactions/Delegate.vue";
import Lock from "./transactions/Lock.vue";
import Unlock from "./transactions/Unlock.vue";
import Vote from "./transactions/Vote.vue";
import Unvote from "./transactions/Unvote.vue";
import Freeze from "./transactions/Freeze.vue";

export default {
  name: "Transactions",
  components: {
    Transfer,
    Delegate,
    Lock,
    Unlock,
    Vote,
    Unvote,
    Freeze
  },
  data() {
    const titles = [
      "转账",
      "注册代理",
      "锁仓",
      "解锁仓",
      "投票",
      "取消投票",
      "冻结"
    ];
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

<style lang="less" scoped>
.transactions {
  .tr-title {
    padding-bottom: 10px;
  }
}
</style>
