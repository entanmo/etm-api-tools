<template>
  <div>
    <secret :modules="modules"
            :item="item" />
    <publicKey :modules="modules"
               :item="item" />
    <secondSecret :modules="modules"
                  :item="item" />
    <delegates :modules="modules"
               :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
import publicKey from "@/components/widgets/publicKey.vue";
import secondSecret from "@/components/widgets/secondSecret.vue";
import delegates from "@/components/widgets/delegates.vue";

export default {
  data() {
    return {
      modules: "accounts",
      item: "vote"
    };
  },
  components: {
    secret,
    publicKey,
    secondSecret,
    delegates
  }
};
</script>

<style lang="less" scoped>
</style>
