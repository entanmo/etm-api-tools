<template>
  <div class="wrapper-content">
    <secret :modules="modules"
            :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";

export default {
  data() {
    return {
      modules: "delegates",
      item: "unDelegate"
    };
  },
  components: {
    secret
  }
};
</script>
<style lang="less" scoped>
</style>
