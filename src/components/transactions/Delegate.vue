<template>
  <div class="tr-delegate">
    <div class="tr-delegate-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <a-button class="sender-button-left"
                type="primary"
                @click="register">注册</a-button>
      <a-button class="sender-button-right"
                type="primary"
                @click="unregister">注消</a-button>
    </div>
    <div class="tr-delegate-message">
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
  name: "Delegate",
  data() {
    return {
      secret: "",
      message: ""
    };
  },
  methods: {
    register() {},
    unregister() {}
  }
};
</script>

<style lang="less" scoped>
.tr-delegate {
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;

  .tr-delegate-sender {
    .sender-button-left {
      width: 100px;
      margin: 10px 0;
      float: left;
    }
    .sender-button-right {
      width: 100px;
      margin: 10px 0;
      float: right;
    }
  }

  .tr-transfer-message {
    padding-top: 20px;
  }
}
</style>
