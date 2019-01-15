<template>
  <div class="wrapper-content">
    <secret :modules="modules"
            :item="item" />
    <publicKey :modules="modules"
               :item="item" />
    <secondSecret :modules="modules"
                  :item="item" />
    <min :modules="modules"
         :item="item" />
    <lifetime :modules="modules"
              :item="item" />
    <keysgroup :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
import publicKey from "@/components/widgets/publicKey.vue";
import secondSecret from "@/components/widgets/secondSecret.vue";
import min from "@/components/widgets/min.vue";
import lifetime from "@/components/widgets/lifetime.vue";
import keysgroup from "@/components/widgets/keysgroup.vue";

export default {
  data() {
    return {
      modules: "multisignatures",
      item: "setMulti"
    };
  },
  components: {
    secret,
    publicKey,
    secondSecret,
    min,
    lifetime,
    keysgroup
  }
};
</script>

<style lang="less" scoped>
</style>
