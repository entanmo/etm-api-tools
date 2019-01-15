<template>
  <div class="wrapper-content">
    <publicKey :modules="modules"
               :item="item" />
    <username :modules="modules"
              :item="item" />
  </div>
</template>

<script>
import publicKey from "@/components/widgets/publicKey.vue";
import username from "@/components/widgets/username.vue";

export default {
  data() {
    return {
      modules: "delegates",
      item: "getDelegate"
    };
  },
  components: {
    publicKey,
    username
  }
};
</script>

<style lang="less" scoped>
</style>
