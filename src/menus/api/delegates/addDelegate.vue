<template>
  <div class="wrapper-content">
    <secret :modules="modules"
            :item="item" />
    <publicKey :modules="modules"
               :item="item" />
    <secondSecret :modules="modules"
                  :item="item" />
    <username :modules="modules"
              :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
import publicKey from "@/components/widgets/publicKey.vue";
import secondSecret from "@/components/widgets/secondSecret.vue";
import username from "@/components/widgets/username.vue";

export default {
  data() {
    return {
      modules: "delegates",
      item: "addDelegate"
    };
  },
  components: {
    secret,
    publicKey,
    secondSecret,
    username
  }
};
</script>

<style lang="less" scoped>
</style>
