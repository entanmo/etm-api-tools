<template>
  <div class="wrapper-content">
    <publicKey :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import publicKey from "@/components/widgets/publicKey.vue";

export default {
  data() {
    return {
      modules: "multisignatures",
      item: "accounts"
    };
  },
  components: {
    publicKey
  }
};
</script>

<style lang="less" scoped>
</style>
