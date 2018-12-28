<template>
  <div class="transactions">
    <div class="tr-title">交易页面：</div>
    <div v-show="panes.length > 0"
         class="tr-content">
      <a-tabs v-model="activeKey"
              type="editable-card"
              hideAdd
              @edit="onEdit">
        <a-tab-pane v-for="pane in panes"
                    :tab="pane.title"
                    :key="pane.key"
                    :closable="pane.closable">
          <Transfer v-show="pane.title === titles[0]"></Transfer>
          <Delegate v-show="pane.title === titles[1]"></Delegate>
          <Lock v-show="pane.title === titles[2]"></Lock>
          <Vote v-show="pane.title === titles[3]"></Vote>
          <Freeze v-show="pane.title === titles[4]"></Freeze>
          <Second v-show="pane.title === titles[5]"></Second>
          <Multi v-show="pane.title === titles[6]"></Multi>
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
import Transfer from "./Transfer.vue";
import Delegate from "./Delegate.vue";
import Lock from "./Lock.vue";
import Vote from "./Vote.vue";
import Freeze from "./Freeze.vue";
import Second from "./Second.vue";
import Multi from "./Multi.vue";

export default {
  components: {
    Transfer,
    Delegate,
    Lock,
    Vote,
    Freeze,
    Second,
    Multi
  },
  data() {
    const titles = [
      "转账",
      "代理",
      "锁仓",
      "投票",
      "冻结",
      "二级密码",
      "多重签名"
    ];
    return {
      activeKey: null,
      panes: [],
      newTabIndex: 0,
      titles
    };
  },
  props: {
    choose1: Object
  },
  watch: {
    choose1: {
      handler() {
        let items = this.choose1.items;
        let key = this.choose1.key;
        let num = 0;
        for (let i = 0; i < items.length; i++) {
          if (items[i].key === key) {
            num = i;
            break;
          }
        }

        this.add(num);
      },
      // immediate: true,
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
.tr-title {
  padding-bottom: 10px;
}
</style>
