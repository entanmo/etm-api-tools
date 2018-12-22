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
                    placeholder="请输入接受者地址 (批量转账地址用【英文】逗号分隔)"
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
    <div class="tr-freeze-message">
      <returnmsg :message="message" />
    </div>
  </div>
</template>

<script>
import returnmsg from "../0_public/ReturnMsg.vue";

import Transaction from "./js/transaction.js";

export default {
  name: "Freeze",
  data() {
    return {
      secret: "",
      address: "",
      amounts: "",
      times: "",
      message: ""
    };
  },
  components: {
    returnmsg
  },
  methods: {
    freeze() {
      if (!this.secret || !this.address || !this.amounts || !this.times) {
        this.$message.error("请输入完整冻结信息！");
        return;
      }

      let secret = this.secret;
      let address = this.address.replace("，",",").split(",");
      let amounts = this.amounts.replace("，",",").split(",");
      let times = this.times.replace("，",",").split(",");
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
          amount: amounts[i] * 100000000,
          time: times[i]
        };

        tr.freeze(data)
          .then(res => {
            this.message += JSON.stringify(res);
          })
          .then(err => {
            if (err) {
              this.message += JSON.stringify(err);
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

  .tr-freeze-message {
    padding-top: 20px;
  }
}
</style>
