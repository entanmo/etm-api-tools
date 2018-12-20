<template>
  <div class="tr-transfer">
    <div class="tr-transfer-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input" placeholder="请输入发送者secret"/>
      <a-button class="sender-button" type="primary" @click="fransfer">转账</a-button>
    </div>
    <div class="tr-transfer-center">
      <div class="tr-transfer-recipient">
        <div class="recipient-title">接收者列表：</div>
        <a-textarea class="recipient-input" placeholder="请输入接受者地址 (批量转账输入地址数组)" :rows="4"/>
      </div>
      <div class="tr-transfer-amount">
        <div class="amount-title">金额列表：</div>
        <a-textarea class="amount-input" placeholder="请输入转账金额 (保持与接受者地址形式一致)" :rows="4"/>
      </div>
    </div>
    <div class="tr-transfer-message">
      <div class="message-title">返回信息：</div>
      <a-textarea class="message-input" placeholder :rows="4"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Transfer",
  data() {
    return {
      secret: "",
      address: [],
      amonts: []
    };
  },
  methods: {
    fransfer() {}
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-transfer {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction:column;

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
