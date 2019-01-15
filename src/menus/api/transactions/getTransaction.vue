<template>
  <div class="wrapper-content">
    <blockId :modules="modules"
             :item="item" />
    <type :modules="modules"
          :item="item" />
    <limit :modules="modules"
           :item="item" />
    <orderBy :modules="modules"
             :item="item" />
    <offset :modules="modules"
            :item="item" />
    <senderPublicKey :modules="modules"
                     :item="item" />
    <ownerPublicKey :modules="modules"
                    :item="item" />
    <ownerAddress :modules="modules"
                  :item="item" />
    <senderId :modules="modules"
              :item="item" />
    <recipientId :modules="modules"
                 :item="item" />
    <amount :modules="modules"
            :item="item" />
    <fee :modules="modules"
         :item="item" />
  </div>
</template>

<script>
import blockId from "@/components/widgets/blockId.vue";
import type from "@/components/widgets/type.vue";
import limit from "@/components/widgets/limit.vue";
import orderBy from "@/components/widgets/orderBy.vue";
import offset from "@/components/widgets/offset.vue";
import senderPublicKey from "@/components/widgets/senderPublicKey.vue";
import ownerPublicKey from "@/components/widgets/ownerPublicKey.vue";
import ownerAddress from "@/components/widgets/ownerAddress.vue";
import senderId from "@/components/widgets/senderId.vue";
import recipientId from "@/components/widgets/recipientId.vue";
import amount from "@/components/widgets/amount.vue";
import fee from "@/components/widgets/fee.vue";

export default {
  data() {
    return {
      modules: "transactions",
      item: "getTransaction"
    };
  },
  components: {
    blockId,
    type,
    limit,
    orderBy,
    offset,
    senderPublicKey,
    ownerPublicKey,
    ownerAddress,
    senderId,
    recipientId,
    amount,
    fee
  }
};
</script>

<style lang="less" scoped>
</style>
