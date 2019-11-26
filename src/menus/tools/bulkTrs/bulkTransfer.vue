<template>
  <div class="tr-transfer">
    <div class="tr-transfer-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <a-button class="sender-button"
                type="primary"
                @click="fransfer">批量转账</a-button>
    </div>
    <div class="tr-transfer-center">
      <div class="tr-transfer-recipient">
        <div class="recipient-title">接收者列表：</div>
        <a-textarea class="recipient-input"
                    placeholder="请输入接受者地址 【批量转账接受者地址用逗号分隔】"
                    :rows="10"
                    v-model="address" />
      </div>
      <div class="tr-transfer-amount">
        <div class="amount-title">金额列表(ETM)：</div>
        <a-textarea class="amount-input"
                    placeholder="请输入转账金额 【相同金额只输入一个值，不同金额保持与接受者地址数量一致】"
                    :rows="10"
                    v-model="amounts" />
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from "@/scripts/transactions/transaction.js";
import Utils from "@/scripts/utils/utils.js";

export default {
  data() {
    return {
      secret: "",
      address: "",
      amounts: "",
      alertError: ""
    };
  },
  components: {},
  methods: {
    fransfer() {
      if (!this.secret || !this.address || !this.amounts) {
        this.$message.error("请输入完整转账信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let address = Utils.processArray(this.address);
      let amounts = Utils.processArray(this.amounts);

      if (
        address.length > 1 &&
        amounts.length > 1 &&
        address.length !== amounts.length
      ) {
        this.$message.error("接受者与金额格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < address.length; i++) {
        let amonut = 0;
        if (amounts.length === 1) {
          amonut = amounts[0];
        } else {
          amonut = amounts[i];
        }
        let data = {
          secret: secret,
          recipientId: address[i],
          amount: Utils.processMoney(amonut)
        };

        tr.transfer(data)
          .then(res => {
            let message = "转账操作：" + JSON.stringify(res, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = "转账异常：" + JSON.stringify(err, null, 2);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-transfer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .tr-transfer-sender {
    padding-bottom: 20px;

    .sender-input {
      width: calc(95% - @btnWidth);
    }
    .sender-button {
      width: @btnWidth;
      float: right;
    }
  }

  .tr-transfer-center {
    padding-bottom: 20px;

    .tr-transfer-recipient {
      width: 49%;
      float: left;
    }

    .tr-transfer-amount {
      width: 49%;
      float: right;
    }
  }
}
</style>
