<template>
  <div class="tr-delegate">
    <div class="tr-delegate-center">
      <div class="tr-delegate-sender">
        <div class="sender-title">发送者列表：</div>
        <a-textarea class="sender-input"
                    placeholder="请输入注册人secret【批量注册，账号用逗号分隔】"
                    :rows="10"
                    v-model="secret" />
      </div>
      <div class="tr-delegate-username">
        <div class="username-title">注册名列表：</div>
        <a-textarea class="username-input"
                    placeholder="请输入注册名称 【注册名称与账户数量一致，且不能重复】"
                    :rows="10"
                    v-model="username" />
      </div>
    </div>
    <div class="tr-delegate-button">
      <a-button class="button-left"
                type="primary"
                @click="delegate">批量注册</a-button>
      <a-button class="button-right"
                type="primary"
                @click="undelegate">批量注销</a-button>
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
      username: "",
      alertError: ""
    };
  },
  components: {},
  methods: {
    delegate() {
      let secret = Utils.processArray(this.secret);
      let username = Utils.processArray(this.username);
      if (secret.length !== username.length) {
        this.$message.error("注册者与名称格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < secret.length; i++) {
        let data = {
          secret: secret[i],
          username: username[i]
        };

        tr.delegate(data)
          .then(res => {
            let message = "注册代理人操作：" + JSON.stringify(res, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = "注册代理人异常：" + JSON.stringify(err, null, 2);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      }
    },
    undelegate() {
      let secret = Utils.processArray(this.secret);

      let tr = new Transaction();
      for (let i = 0; i < secret.length; i++) {
        let data = {
          secret: secret[i]
        };

        tr.undelegate(data)
          .then(res => {
            let message = "注销代理人操作：" + JSON.stringify(res, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = "注销代理人异常：" + JSON.stringify(err, null, 2);
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

.tr-delegate {
  height: 100%;
  width: 100%;
  display: flex;
  // flex-direction: column;
  justify-content: space-between;

  .tr-delegate-center {
    padding-bottom: 20px;
    width: calc(95% - @btnWidth);

    .tr-delegate-sender {
      width: 49%;
      float: left;
    }

    .tr-delegate-username {
      width: 49%;
      float: right;
    }
  }

  .tr-delegate-button {
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
