<template>
  <div class="wrapper-content">
    <myaddress :modules="modules"
               :item="item" />
    <state :modules="modules"
           :item="item" />
    <limit :modules="modules"
           :item="item" />
    <offset :modules="modules"
            :item="item" />
    <orderByHeight :modules="modules"
                   :item="item" />
    <orderByAmount :modules="modules"
                   :item="item" />
  </div>
</template>

<script>
import myaddress from "@/components/widgets/myaddress.vue";
import state from "@/components/widgets/state.vue";
import limit from "@/components/widgets/limit.vue";
import offset from "@/components/widgets/offset.vue";
import orderByHeight from "@/components/widgets/orderByHeight.vue";
import orderByAmount from "@/components/widgets/orderByAmount.vue";

export default {
  data() {
    return {
      modules: "lockvote",
      item: "getAllLocks"
    };
  },
  components: {
    myaddress,
    state,
    limit,
    offset,
    orderByHeight,
    orderByAmount
  }
};
</script>

<style lang="less" scoped>
</style>
