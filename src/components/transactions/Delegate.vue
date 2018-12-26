<template>
  <div class="tr-delegate">
    <div class="tr-delegate-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <div class="sender-next">
        <a-input class="sender-username"
                 placeholder="请输入注册名称"
                 v-model="username" />
        <a-button class="sender-button-left"
                  type="primary"
                  @click="delegate">注册</a-button>
        <a-button class="sender-button-right"
                  type="primary"
                  @click="undelegate">注消</a-button>
      </div>

    </div>
    <div class="tr-delegate-message">
      <returnmsg :message="message" />
    </div>
  </div>
</template>

<script>
import returnmsg from "../0_public/ReturnMsg.vue";

import Transaction from "../../scripts/transactions/transaction.js";
import Utils from "../../scripts/utils/utils.js";

export default {
  name: "Delegate",
  data() {
    return {
      secret: "",
      username: "",
      message: ""
    };
  },
  components: {
    returnmsg
  },
  methods: {
    delegate() {
      if (!this.secret || !this.username) {
        this.$message.error("请输入完整注册人账户信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let username = Utils.processString(this.username);
      let tr = new Transaction();
      tr.delegate({ secret, username })
        .then(res => {
          this.message += "注册代理人操作：" + JSON.stringify(res, null, 2) + "\r\n";
        })
        .then(err => {
          if (err) {
            this.message += "注册代理人异常：" + JSON.stringify(err, null, 2) + "\r\n";
          }
        });
    },
    undelegate() {
      if (!this.secret) {
        this.$message.error("请输入完整注册人账户信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let tr = new Transaction();
      tr.undelegate({ secret })
        .then(res => {
          this.message += "注销代理人操作：" + JSON.stringify(res, null, 2) + "\r\n";
        })
        .then(err => {
          if (err) {
            this.message += "注销代理人异常：" + JSON.stringify(err, null, 2) + "\r\n";
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-delegate {
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  .tr-delegate-sender {
    .sender-next {
      padding-top: 20px;
      display: flex;
      justify-content: space-between;

      .sender-username {
        width: calc(90% - @btnWidth * 2);
      }
      .sender-button-left {
        width: @btnWidth;
      }

      .sender-button-right {
        width: @btnWidth;
      }
    }
  }

  .tr-delegate-message {
    padding-top: 20px;
  }
}
</style>
