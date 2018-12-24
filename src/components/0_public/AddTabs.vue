<template>
  <div class="pub-addtabs">
    <div v-show="panes.length > 0"
         class="pub-addtabs-content">
      <a-tabs v-model="activeKey"
              type="editable-card"
              hideAdd
              @edit="onEdit">
        <a-tab-pane v-for="pane in panes"
                    :tab="pane.title"
                    :key="pane.key"
                    :closable="pane.closable">
        </a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      
    };
  },
  props: {
    panes: Array,
    activeKey: String
  },
  methods: {
    onEdit(targetKey, action) {
      this[action](targetKey);
    },
    remove(targetKey) {
      console.log(targetKey)
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
</style>
