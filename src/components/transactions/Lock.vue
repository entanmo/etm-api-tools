<template>
  <div class="tr-lock">
    <div class="tr-lock-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
    </div>
    <div class="tr-lock-amount">
      <div class="amount-title">锁定金额：</div>
      <a-input class="amount-input"
               placeholder="请输入锁定金额"
               v-model="amonts" />
      <a-button class="amount-button"
                type="primary"
                @click="lock">锁定</a-button>
    </div>
    <div class="tr-lock-unlocks">
      <div class="unlocks-title">解锁列表：</div>
      <a-textarea class="unlocks-input"
                  placeholder="请输入解锁仓交易id (解锁多个时输入数组)"
                  :rows="4"
                  v-model="unlocks" />
      <a-button class="unlocks-button"
                type="primary"
                @click="unlock">解锁</a-button>
    </div>
    <div class="tr-lock-message">
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
  name: "Lock",
  data() {
    return {
      secret: "",
      amonts: "",
      unlocks: "",
      message: ""
    };
  },
  methods: {
    lock() {},
    unlock() {}
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-lock {
  display: flex;
  flex-direction: column;

  .tr-lock-sender {
    padding-bottom: 20px;

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

  .tr-lock-amount {
    padding-bottom: 20px;

    .amount-input {
      width: calc(95% - @btnWidth);
    }
    .amount-button {
      width: @btnWidth;
      float: right;
    }
  }

  .tr-lock-unlocks {
    .unlocks-input {
      width: calc(95% - @btnWidth);
    }
    .unlocks-button {
      width: @btnWidth;
      float: right;
    }
  }

  .tr-lock-message {
    padding-top: 20px;
  }
}
</style>
