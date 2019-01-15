<template>
  <div class="wrapper-content">
    <blockId :modules="modules"
               :item="item" />
    <height :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import blockId from "@/components/widgets/blockId.vue";
import height from "@/components/widgets/height.vue";

export default {
  data() {
    return {
      modules: "blocks",
      item: "getBlock"
    };
  },
  components: {
    blockId,
    height
  }
};
</script>

<style lang="less" scoped>
</style>
