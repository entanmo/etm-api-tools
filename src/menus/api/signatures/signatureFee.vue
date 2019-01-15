<template>
  <div class="wrapper-content">
    <norequest />
  </div>
</template>

<script>
import norequest from "@/components/widgets/norequest.vue";

export default {
  data() {
    return {
      modules: "signatures",
      item: "signatureFee"
    };
  },
  components: {
    norequest
  }
};
</script>

<style lang="less" scoped>
</style>
