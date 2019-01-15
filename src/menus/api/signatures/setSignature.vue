<template>
  <div class="wrapper-content">
    <secret :modules="modules"
        :item="item" />
    <publicKey :modules="modules"
          :item="item" />
    <secondSecret :modules="modules"
          :item="item" />
    <multisigAccountPublicKey :modules="modules"
          :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
import publicKey from "@/components/widgets/publicKey.vue";
import secondSecret from "@/components/widgets/secondSecret.vue";
import multisigAccountPublicKey from "@/components/widgets/multisigAccountPublicKey.vue";

export default {
  data() {
    return {
      modules: "signatures",
      item: "setSignature"
    };
  },
  components: {
    secret,
    publicKey,
    secondSecret,
    multisigAccountPublicKey
  }
};
</script>

<style lang="less" scoped>
</style>
