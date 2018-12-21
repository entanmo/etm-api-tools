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
      <a-button class="recipient-button-left"
                type="primary"
                @click="vote">投票</a-button>
      <a-button class="recipient-button-right"
                type="primary"
                @click="unvote">取消投票</a-button>
    </div>
    <div class="tr-vote-message">
      <div class="message-title">返回信息：</div>
      <a-textarea class="message-input"
                  placeholder
                  :rows="8"
                  v-model="message" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Vote",
  data() {
    return {
      secret: "",
      recipient: "",
      message: ""
    };
  },
  methods: {
    vote() {},
    unvote() {}
  }
};
</script>

<style lang="less" scoped>
.tr-vote {
  display: flex;
  flex-direction: column;

  .tr-vote-sender {
    padding-bottom: 20px;
  }

  .tr-vote-recipient {
    .recipient-button-left {
      width: 100px;
      margin: 10px 0;
      float: left;
    }
    .recipient-button-right {
      width: 100px;
      margin: 10px 0;
      float: right;
    }
  }

  .tr-vote-message {
    padding-top: 20px;
  }
}
</style>
