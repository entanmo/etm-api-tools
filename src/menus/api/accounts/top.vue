<template>
  <div class="wrapper-content">
    <limit :modules="modules"
           :item="item" />
    <offset :modules="modules"
            :item="item" />
  </div>
</template>

<script>
import limit from "@/components/widgets/limit.vue";
import offset from "@/components/widgets/offset.vue";
export default {
  data() {
    return {
      modules: "accounts",
      item: "getBalance"
    };
  },
  components: {
    limit,
    offset
  }
};
</script>

<style lang="less" scoped>
</style>
