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
                    placeholder="请输入接受者地址 (批量转账输入地址数组)"
                    :rows="4"
                    v-model="address" />
      </div>
      <div class="tr-transfer-amount">
        <div class="amount-title">金额列表：</div>
        <a-textarea class="amount-input"
                    placeholder="请输入转账金额 (保持与接受者地址形式一致)"
                    :rows="4"
                    v-model="amonts" />
      </div>
    </div>
    <div class="tr-transfer-message">
      <div class="message-title">返回信息：</div>
      <a-textarea class="message-input"
                  placeholder
                  :rows="8"
                  v-model="message" />
    </div>
    <a-alert v-show="alertError"
             type="error"
             message="alertError"
             banner />
  </div>
</template>

<script>
// import Application from "../../scripts/src/application.js";
import Transaction from "./js/transaction.js";

export default {
  name: "Transfer",
  data() {
    return {
      secret: "",
      address: "",
      amonts: "",
      message: "",
      alertError: ""
    };
  },
  methods: {
    fransfer() {
      // let that = this;
      // this.$ajax
      //   .get("/api/blocks/getHeight")
      //   .then(res => {
      //     // console.log(res);
      //     this.message = JSON.stringify(res.data);
      //   })
      //   .catch(res => {
      //     this.amonts = JSON.stringify(res);
      //     // console.log(res);
      //   });

      if (!this.secret || !this.address || !this.amonts) {
        this.$message.info("请输入完整转账信息！");
        return;
      }

      let secret = this.secret;
      let address = JSON.parse(this.address);
      let amonts = JSON.parse(this.amonts);
      if (
        !Array.isArray(address) ||
        !Array.isArray(amonts) ||
        address.length !== amonts.length
      ) {
        this.$message.info("接受者或者金额格式不对！");
        return;
      }

      let tr = new Transaction();
      tr.transfer({ secret, address, amonts })
        .then(res => {
          this.message += JSON.stringify(res);
        })
        .then(res => {
          this.message += JSON.stringify(res);
        });

      // let app = new Application();
      // app
      //   .batchTransfer(
      //     [{
      //       sender: "race forget pause shoe trick first abuse insane hope budget river enough",
      //       recipient: "A9UgMsDcVLswLYoFfEhMKyfxaD6DS1KsCj",
      //       amount: 123
      //     }]
      //   )
      //   .then(res => {
      //     void res;
      //     //console.log("Finish");
      //     this.message += JSON.stringify(res);
      //   })
      //   .then(err => {
      //     //console.log(err);
      //     this.message += JSON.stringify(err);
      //   });
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
