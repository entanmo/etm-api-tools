<template>
  <div class="wrapper-content">
    <myaddress :modules="modules" :item="item"/>
  </div>
</template>

<script>
import myaddress from "@/components/widgets/myaddress.vue";

export default {
  data() {
    return {
      modules: "accounts",
      item: "getBalance"
    };
  },
  components: {
    myaddress
  }
};
</script>

<style lang="less" scoped>
</style>
