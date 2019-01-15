<template>
  <div class="wrapper-content">
    <secret :modules="modules" :item="item"/>
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";

export default {
  data() {
    return {
      modules: "accounts",
      item: "open"
    };
  },
  components: {
    secret
  }
};
</script>

<style lang="less" scoped>
</style>
