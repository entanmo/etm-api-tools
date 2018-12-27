<template>
  <div class="qi-account">
    <div class="qi-account-sender">
      <div class="sender-title">账户：</div>
      <a-input class="sender-input"
               placeholder="请输入账户address"
               v-model="address" />
      <a-button class="sender-button"
                type="primary"
                @click="queryaccount">查询</a-button>
    </div>
  </div>
</template>

<script>
import QueryInfo from "../../scripts/queryInfo/queryInfo.js";
import Utils from "../../scripts/utils/utils.js";
import eventBus from "../../eventBus.js";

export default {
  data() {
    return {
      address: ""
    };
  },
  components: {},
  methods: {
    queryaccount() {
      if (!this.address) {
        this.$message.error("请输入完整账户查询信息！");
        return;
      }

      let address = Utils.processString(this.address);

      let qi = new QueryInfo();
      qi.queryaccount({ address })
        .then(res => {
          let message = "账户查询操作：" + JSON.stringify(res, null, 2);
          eventBus.$emit("returnMsg", message);
        })
        .then(err => {
          if (err) {
            let message = "账户查询异常：" + JSON.stringify(err, null, 2);
            eventBus.$emit("returnMsg", message);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.qi-account-sender {
  padding-bottom: 20px;

  .sender-input {
    width: calc(95% - @btnWidth);
  }
  .sender-button {
    width: @btnWidth;
    float: right;
  }
}
</style>
