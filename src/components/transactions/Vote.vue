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
    <div class="tr-vote-message">
      <returnmsg :message="message" />
    </div>
  </div>
</template>

<script>
import returnmsg from "../0_public/ReturnMsg.vue";

import Transaction from "../../scripts/transactions/transaction.js";

export default {
  name: "Vote",
  data() {
    return {
      secret: "",
      recipient: "",
      message: ""
    };
  },
  components: {
    returnmsg
  },
  methods: {
    vote() {
      if (!this.secret || !this.recipient) {
        this.$message.error("请输入完整投票信息！");
        return;
      }

      let secret = this.secret;
      let recipient = "-" + this.recipient;
      let tr = new Transaction();
      tr.vote({ secret, recipient })
        .then(res => {
          this.message += JSON.stringify(res);
        })
        .then(err => {
          if (err) {
            this.message += JSON.stringify(err);
          }
        });
    },
    unvote() {
      if (!this.secret || !this.recipient) {
        this.$message.error("请输入完整取消投票信息！");
        return;
      }

      let secret = this.secret;
      let recipient = "-" + this.recipient;
      let tr = new Transaction();
      tr.vote({ secret, recipient })
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
    padding-top: 20px;
    display: flex;
    justify-content: space-between;

    .recipient-button-left {
      width: @btnWidth;
    }
    .recipient-button-right {
      width: @btnWidth;
    }
  }

  .tr-vote-message {
    padding-top: 20px;
  }
}
</style>
