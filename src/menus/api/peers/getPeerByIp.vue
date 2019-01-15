<template>
  <div class="wrapper-content">
    <ip :modules="modules"
        :item="item" />
    <port :modules="modules"
          :item="item" />
  </div>
</template>

<script>
import ip from "@/components/widgets/ip.vue";
import port from "@/components/widgets/port.vue";

export default {
  data() {
    return {
      modules: "peers",
      item: "getPeerByIp"
    };
  },
  components: {
    ip,
    port
  }
};
</script>

<style lang="less" scoped>
</style>
