<template>
  <div class="wrapper-content">
    <state :modules="modules"
        :item="item" />
    <os :modules="modules"
          :item="item" />
    <version :modules="modules"
          :item="item" />
    <limit :modules="modules"
          :item="item" />
    <orderBy :modules="modules"
          :item="item" />
    <offset :modules="modules"
          :item="item" />
    <port :modules="modules"
          :item="item" />
  </div>
</template>

<script>
import state from "@/components/widgets/state.vue";
import os from "@/components/widgets/os.vue";
import version from "@/components/widgets/version.vue";
import limit from "@/components/widgets/limit.vue";
import orderBy from "@/components/widgets/orderBy.vue";
import offset from "@/components/widgets/offset.vue";
import port from "@/components/widgets/port.vue";

export default {
  data() {
    return {
      modules: "peers",
      item: "peers"
    };
  },
  components: {
    state,
    os,
    version,
    limit,
    orderBy,
    offset,
    port
  }
};
</script>

<style lang="less" scoped>
</style>
