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
      modules: "loader",
      item: "status"
    };
  },
  components: {
    norequest
  }
};
</script>

<style lang="less" scoped>
</style>
