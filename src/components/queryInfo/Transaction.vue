<template>
  <div class="qi-transaction">
    <div class="qi-transaction-sender">
      <div class="sender-title">交易：</div>
      <a-input class="sender-input"
               placeholder="请输入交易id"
               v-model="secret" />
      <a-button class="sender-button"
                type="primary"
                @click="query">查询</a-button>
    </div>
    <div class="qi-transaction-message">
      <returnmsg :message="message" />
    </div>
  </div>
</template>

<script>
import returnmsg from "../0_public/ReturnMsg.vue";

export default {
  data() {
    return {
      secret: "",
      message: ""
    };
  },
  components: {
    returnmsg
  },
  methods: {
    query() {}
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.qi-transaction-sender {
  padding-bottom: 20px;

  .sender-input {
    width: calc(95% - @btnWidth);
  }
  .sender-button {
    width: @btnWidth;
    float: right;
  }
}
</style>
