<template>
  <div class="wrapper-content">
    <limit :modules="modules"
           :item="item" />
    <orderBy :modules="modules"
             :item="item" />
    <offset :modules="modules"
            :item="item" />
    <generatorPublicKey :modules="modules"
                        :item="item" />
    <totalAmount :modules="modules"
                 :item="item" />
    <totalFee :modules="modules"
              :item="item" />
    <reward :modules="modules"
            :item="item" />
    <previousBlock :modules="modules"
                   :item="item" />
    <height :modules="modules"
            :item="item" />
  </div>
</template>

<script>
import limit from "@/components/widgets/limit.vue";
import orderBy from "@/components/widgets/orderBy.vue";
import offset from "@/components/widgets/offset.vue";
import generatorPublicKey from "@/components/widgets/generatorPublicKey.vue";
import totalAmount from "@/components/widgets/totalAmount.vue";
import totalFee from "@/components/widgets/totalFee.vue";
import reward from "@/components/widgets/reward.vue";
import previousBlock from "@/components/widgets/previousBlock.vue";
import height from "@/components/widgets/height.vue";

export default {
  data() {
    return {
      modules: "blocks",
      item: "getBlockByField"
    };
  },
  components: {
    limit,
    orderBy,
    offset,
    generatorPublicKey,
    totalAmount,
    totalFee,
    reward,
    previousBlock,
    height
  }
};
</script>

<style lang="less" scoped>
</style>
