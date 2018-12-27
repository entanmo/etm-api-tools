<template>
  <div class="qi-transaction">
    <div class="qi-transaction-sender">
      <div class="sender-title">交易：</div>
      <a-input class="sender-input"
               placeholder="请输入交易id"
               v-model="id" />
      <a-button class="sender-button"
                type="primary"
                @click="querytransaction">查询</a-button>
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
      id: ""
    };
  },
  components: {},
  methods: {
    querytransaction() {
      if (!this.id) {
        this.$message.error("请输入完整交易查询信息！");
        return;
      }

      let id = Utils.processString(this.id);

      let qi = new QueryInfo();
      qi.querytransaction({ id })
        .then(res => {
          let message = "交易查询操作：" + JSON.stringify(res, null, 2);
          eventBus.$emit("returnMsg", message);
        })
        .then(err => {
          if (err) {
            let message = "交易查询异常：" + JSON.stringify(err, null, 2);
            eventBus.$emit("returnMsg", message);
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.qi-transaction-sender {
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
