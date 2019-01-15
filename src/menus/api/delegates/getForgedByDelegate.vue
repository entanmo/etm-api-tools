<template>
  <div class="wrapper-content">
    <generatorPublicKey :modules="modules"
                        :item="item" />
  </div>
</template>

<script>
import generatorPublicKey from "@/components/widgets/generatorPublicKey.vue";

export default {
  data() {
    return {
      modules: "delegates",
      item: "getForgedByDelegate"
    };
  },
  components: {
    generatorPublicKey
  }
};
</script>

<style lang="less" scoped>
</style>
