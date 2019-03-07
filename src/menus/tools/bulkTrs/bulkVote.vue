<template>
  <div class="tr-vote">
    <div class="tr-vote-center">
      <div class="tr-vote-sender">
        <div class="sender-title">发送者列表：</div>
        <a-textarea class="sender-input"
                    placeholder="请输入投票者secret【批量投票，账号用逗号分隔】"
                    :rows="10"
                    v-model="secret" />
      </div>
      <div class="tr-vote-publickey">
        <div class="publickey-title">矿工公钥列表：</div>
        <a-textarea class="username-input"
                    placeholder="请输入被投矿工公钥 【前面带 '+' 表示添加投票，'-' 表示取消投票】【相同矿工只需要输入一个，不同矿工与账户数量一致】"
                    :rows="10"
                    v-model="publickey" />
      </div>
    </div>
    <div class="tr-vote-button">
      <a-button class="button-left"
                type="primary"
                @click="vote">批量投票</a-button>
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
      publickey: "",
      alertError: ""
    };
  },
  components: {},
  methods: {
    vote() {
      let secret = Utils.processArray(this.secret);
      let publickey = Utils.processArray(this.publickey);
      if (
        secret.length > 1 &&
        publickey.length > 1 &&
        secret.length !== publickey.length
      ) {
        this.$message.error("发送者与矿工公钥格式不匹配！");
        return;
      }

      let tr = new Transaction();
      for (let i = 0; i < secret.length; i++) {
        let delegates = "";
        if (publickey.length === 1) {
          delegates = publickey[0];
        } else {
          delegates = publickey[i];
        }
        let data = {
          secret: secret[i],
          delegates: [delegates.toString()]
        };

        tr.vote(data)
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
      }
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-vote {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .tr-vote-center {
    padding-bottom: 20px;
    width: calc(95% - @btnWidth);

    .tr-vote-sender {
      width: 49%;
      float: left;
    }

    .tr-vote-publickey {
      width: 49%;
      float: right;
    }
  }
  .tr-vote-button {
    padding-bottom: 20px;

    .button-left {
      width: @btnWidth;
      margin-top: 20px;
    }
  }
}
</style>
