<template>
  <div class="tr-delegate">
    <div class="tr-delegate-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input" placeholder="请输入发送者secret"/>
      <a-button class="sender-button-left" type="primary" @click="fransfer">注册</a-button>
      <a-button class="sender-button-right" type="primary" @click="fransfer">注消</a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "Delegate",
  data() {
    return {};
  },
  methods: {}
};
</script>

<style lang="less" scoped>
.tr-delegate {
  padding-bottom: 10px;

  .sender-title{
      padding-bottom: 10px;
  }

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
</style>
