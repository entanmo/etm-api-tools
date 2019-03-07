<template>
  <div class="tr-lock">
    <div class="tr-lock-center">
      <div class="tr-lock-sender">
        <div class="sender-title">发送者列表：</div>
        <a-textarea class="sender-input"
                    placeholder="请输入锁仓者secret【批量锁仓，账号用逗号分隔】"
                    :rows="10"
                    v-model="secret" />
      </div>
      <div class="tr-lock-amount">
        <div class="amount-title">锁定金额列表：</div>
        <a-textarea class="username-input"
                    placeholder="请输入锁定金额 【相同锁定金额只需要输入一个，不同锁定金额与账户数量一致】"
                    :rows="10"
                    v-model="amounts" />
      </div>
    </div>
    <div class="tr-lock-button">
      <a-button class="button-left"
                type="primary"
                @click="lock">批量锁仓</a-button>
      <a-button class="button-right"
                type="primary"
                disabled
                @click="unlock">批量解锁</a-button>
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
      amounts: "",
      id: "",
      alertError: ""
    };
  },
  components: {},
  methods: {
    lock() {
      let secret = Utils.processArray(this.secret);
      let amounts = Utils.processArray(this.amounts);
      if (
        secret.length > 1 &&
        amounts.length > 1 &&
        secret.length !== amounts.length
      ) {
        this.$message.error("发送者与金额格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < secret.length; i++) {
        let amonut = 0;
        if (amounts.length === 1) {
          amonut = amounts[0];
        } else {
          amonut = amounts[i];
        }
        let data = {
          secret: secret[i],
          args: [Utils.processMoney(amonut).toString()]
        };

        tr.lock(data)
          .then(res => {
            let message = "锁仓操作：" + JSON.stringify(res, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = "锁仓异常：" + JSON.stringify(err, null, 2);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      }
    },
    unlock() {}
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-lock {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .tr-lock-center {
    padding-bottom: 20px;
    width: calc(95% - @btnWidth);

    .tr-lock-sender {
      width: 49%;
      float: left;
    }

    .tr-lock-amount {
      width: 49%;
      float: right;
    }
  }
  .tr-lock-button {
    padding-bottom: 20px;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    .button-left {
      width: @btnWidth;
      margin-top: 20px;
      margin-bottom: 50px;
    }

    .button-right {
      width: @btnWidth;
    }
  }
}
</style>
