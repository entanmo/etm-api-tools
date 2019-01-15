<template>
  <div class="tr-freeze">
    <div class="tr-freeze-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <a-button class="sender-button"
                type="primary"
                @click="freeze">冻结</a-button>
    </div>
    <div class="tr-freeze-center">
      <div class="tr-freeze-recipient">
        <div class="recipient-title">接收者列表：</div>
        <a-textarea class="recipient-input"
                    placeholder="请输入接受者地址 (批量转账地址用逗号分隔)"
                    :rows="4"
                    v-model="address" />
      </div>
      <div class="tr-freeze-amount">
        <div class="amount-title">金额列表：</div>
        <a-textarea class="amount-input"
                    placeholder="请输入冻结金额 (保持与接受者地址形式一致)"
                    :rows="4"
                    v-model="amounts" />
      </div>
      <div class="tr-freeze-time">
        <div class="time-title">时间列表：</div>
        <a-textarea class="time-input"
                    placeholder="请输入冻结时间 (保持与接受者地址形式一致)"
                    :rows="4"
                    v-model="times" />
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from "../../scripts/transactions/transaction.js";
import Utils from "../../scripts/utils/utils.js";

export default {
  data() {
    return {
      secret: "",
      address: "",
      amounts: "",
      times: ""
    };
  },
  components: {},
  methods: {
    freeze() {
      if (!this.secret || !this.address || !this.amounts || !this.times) {
        this.$message.error("请输入完整冻结信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let address = Utils.processArray(this.address);
      let amounts = Utils.processArray(this.amounts);
      let times = Utils.processArray(this.times);
      if (
        address.length !== amounts.length ||
        address.length !== times.length
      ) {
        this.$message.error("接受者与金额或者锁定时间格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < address.length; i++) {
        let data = {
          secret: secret,
          recipientId: address[i],
          amount: Utils.processMoney(amounts[i]),
          args: [times[i]]
        };

        tr.freeze(data)
          .then(res => {
            let message = "冻结操作：" + JSON.stringify(res, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = "冻结异常：" + JSON.stringify(err, null, 2);
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

.tr-freeze {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .tr-freeze-sender {
    padding-bottom: 20px;

    .sender-input {
      width: calc(95% - @btnWidth);
    }
    .sender-button {
      width: @btnWidth;
      float: right;
    }
  }
  .tr-freeze-center {
    display: flex;
    justify-content: space-between;

    .tr-freeze-recipient {
      width: 45%;
    }

    .tr-freeze-amount {
      width: 25%;
    }

    .tr-freeze-time {
      width: 25%;
    }
  }
}
</style>
