<template>
  <div class="wrapper-content">
    <myaddress :modules="modules"
               :item="item" />
    <limit :modules="modules"
           :item="item" />
    <offset :modules="modules"
            :item="item" />
    <orderBy :modules="modules"
             :item="item" />
  </div>
</template>

<script>
import myaddress from "@/components/widgets/myaddress.vue";
import limit from "@/components/widgets/limit.vue";
import offset from "@/components/widgets/offset.vue";
import orderBy from "@/components/widgets/orderBy.vue";

export default {
  data() {
    return {
      modules: "delegates",
      item: "getAllDelegates"
    };
  },
  components: {
    myaddress,
    limit,
    offset,
    orderBy
  }
};
</script>

<style lang="less" scoped>
</style>
