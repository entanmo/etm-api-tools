<template>
  <div class="tr-freeze">
    <div class="tr-freeze-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
      <a-button class="sender-button"
                type="primary"
                @click="freeze">冻结</a-button>
    </div>
    <div class="tr-freeze-center">
      <div class="tr-freeze-recipient">
        <div class="recipient-title">接收者列表：</div>
        <a-textarea class="recipient-input"
                    placeholder="请输入接受者地址 (批量转账输入地址数组)"
                    :rows="4"
                    v-model="address" />
      </div>
      <div class="tr-freeze-amount">
        <div class="amount-title">金额列表：</div>
        <a-textarea class="amount-input"
                    placeholder="请输入冻结金额 (保持与接受者地址形式一致)"
                    :rows="4"
                    v-model="amonts" />
      </div>
      <div class="tr-freeze-time">
        <div class="time-title">时间列表：</div>
        <a-textarea class="time-input"
                    placeholder="请输入冻结时间 (保持与接受者地址形式一致)"
                    :rows="4"
                    v-model="times" />
      </div>
    </div>
    <div class="tr-freeze-message">
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
  name: "Freeze",
  data() {
    return {
      secret: "",
      address: "",
      amonts: "",
      times: "",
      message: ""
    };
  },
  methods: {
    freeze() {}
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-freeze {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;

  .tr-freeze-sender {
    padding-bottom: 20px;

    .sender-input {
      width: calc(95% - @btnWidth);
    }
    .sender-button {
      width: @btnWidth;
      float: right;
    }
  }

  .tr-freeze-recipient {
    width: 49%;
    float: left;
  }

  .tr-freeze-amount {
    width: 24%;
    float: left;
    padding-left: 3%;
  }

  .tr-freeze-time {
    width: 24%;
    float: right;
  }

  .tr-freeze-message {
    padding-top: 20px;
  }
}
</style>
