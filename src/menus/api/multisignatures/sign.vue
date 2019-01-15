<template>
  <div class="wrapper-content">
    <secret :modules="modules"
               :item="item" />
    <secondSecret :modules="modules"
               :item="item" />
    <publicKey :modules="modules"
               :item="item" />
    <transactionId :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
import secondSecret from "@/components/widgets/secondSecret.vue";
import publicKey from "@/components/widgets/publicKey.vue";
import transactionId from "@/components/widgets/transactionId.vue";

export default {
  data() {
    return {
      modules: "multisignatures",
      item: "sign"
    };
  },
  components: {
    secret,
    secondSecret,
    publicKey,
    transactionId
  }
};
</script>

<style lang="less" scoped>
</style>
