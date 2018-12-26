<template>
  <div class="tr-transfer">
    <div class="tr-transfer-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <a-button class="sender-button"
                type="primary"
                @click="fransfer">转账</a-button>
    </div>
    <div class="tr-transfer-center">
      <div class="tr-transfer-recipient">
        <div class="recipient-title">接收者列表：</div>
        <a-textarea class="recipient-input"
                    placeholder="请输入接受者地址 (批量转账地址用逗号分隔)"
                    :rows="4"
                    v-model="address" />
      </div>
      <div class="tr-transfer-amount">
        <div class="amount-title">金额列表：</div>
        <a-textarea class="amount-input"
                    placeholder="请输入转账金额 (保持与接受者地址形式和数量一致)"
                    :rows="4"
                    v-model="amounts" />
      </div>
    </div>
    <div class="tr-transfer-message">
      <returnmsg :message="message" />
    </div>
  </div>
</template>

<script>
import returnmsg from "../0_public/ReturnMsg.vue";

import Transaction from "../../scripts/transactions/transaction.js";
import Utils from "../../scripts/utils/utils.js";

export default {
  name: "Transfer",
  data() {
    return {
      secret: "",
      address: "",
      amounts: "",
      message: "",
      alertError: ""
    };
  },
  components: {
    returnmsg
  },
  methods: {
    fransfer() {
      if (!this.secret || !this.address || !this.amounts) {
        this.$message.error("请输入完整转账信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let address = Utils.processArray(this.address);
      let amounts = Utils.processArray(this.amounts);

      if (address.length !== amounts.length) {
        this.$message.error("接受者与金额格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < address.length; i++) {
        let data = {
          secret: secret,
          recipientId: address[i],
          amount: Utils.processMoney(amounts[i])
        };

        tr.transfer(data)
          .then(res => {
            this.message += "转账操作：" + JSON.stringify(res, null, 2) + "\r\n";
          })
          .then(err => {
            if (err) {
              this.message += "转账异常：" + JSON.stringify(err, null, 2) + "\r\n";
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

  .tr-transfer-recipient {
    width: 49%;
    float: left;
  }

  .tr-transfer-amount {
    width: 49%;
    float: right;
  }

  .tr-transfer-message {
    padding-top: 20px;
  }
}
</style>
