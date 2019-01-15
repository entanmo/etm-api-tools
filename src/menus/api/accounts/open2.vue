<template>
  <div class="wrapper-content">
    <publickey :modules="modules" :item="item"/>
  </div>
</template>

<script>
import publickey from "@/components/widgets/publicKey.vue";

export default {
  data() {
    return {
      modules: "accounts",
      item: "open2"
    };
  },
  components: {
    publickey
  }
};
</script>

<style lang="less" scoped>
</style>
