<template>
  <div class="wrapper-content">
    <myaddress :modules="modules"
               :item="item" />
    <mode :modules="modules"
          :item="item" />
  </div>
</template>

<script>
import myaddress from "@/components/widgets/myaddress.vue";
import mode from "@/components/widgets/mode.vue";

export default {
  data() {
    return {
      modules: "accounts",
      item: "delayOrders"
    };
  },
  components: {
    myaddress,
    mode
  }
};
</script>

<style lang="less" scoped>
</style>
