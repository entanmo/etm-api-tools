<template>
  <div class="wrapper-content">
    <senderPublicKey :modules="modules"
               :item="item" />
    <myaddress :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import senderPublicKey from "@/components/widgets/senderPublicKey.vue";
import myaddress from "@/components/widgets/myaddress.vue";

export default {
  data() {
    return {
      modules: "transactions",
      item: "getUnconfirmed"
    };
  },
  components: {
    senderPublicKey,
    myaddress
  }
};
</script>

<style lang="less" scoped>
</style>
