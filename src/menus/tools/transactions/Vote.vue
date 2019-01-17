<template>
  <div class="tr-vote">
    <div class="tr-vote-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
    </div>
    <div class="tr-vote-recipient">
      <div class="recipient-title">接收者：</div>
      <a-input class="recipient-input"
               placeholder="请输入接收者publickey"
               v-model="recipient" />
      <div class="recipient-center">
        <a-button class="recipient-button-left"
                  type="primary"
                  @click="vote">投票</a-button>
        <a-button class="recipient-button-right"
                  type="primary"
                  @click="unvote">取消投票</a-button>
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
      recipient: ""
    };
  },
  components: {},
  methods: {
    vote() {
      if (!this.secret || !this.recipient) {
        this.$message.error("请输入完整投票信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let recipient = "-" + Utils.processString(this.recipient);
      let tr = new Transaction();
      tr.vote({ secret, recipient })
        .then(res => {
          let message = "投票操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
        })
        .then(err => {
          if (err) {
            let message = "投票异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    },
    unvote() {
      if (!this.secret || !this.recipient) {
        this.$message.error("请输入完整取消投票信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let recipient = "-" + Utils.processString(this.recipient);
      let tr = new Transaction();
      tr.vote({ secret, recipient })
        .then(res => {
          let message = "取消投票操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
        })
        .then(err => {
          if (err) {
            let message = "取消投票异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-vote {
  display: flex;
  flex-direction: column;

  .tr-vote-sender {
    padding-bottom: 20px;
  }

  .recipient-center {
    padding: 20px 0;
    display: flex;
    justify-content: space-between;

    .recipient-button-left {
      width: @btnWidth;
    }
    .recipient-button-right {
      width: @btnWidth;
    }
  }
}
</style>
