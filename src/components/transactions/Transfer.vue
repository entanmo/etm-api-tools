<template>
  <div class="tr-transfer">
    <div class="tr-transfer-top">
      <div class="top-title">发送者：</div>
      <a-input class="top-left" placeholder="请输入发送者secret..."/>
      <a-button class="top-right" type="primary" @click="fransfer">转账</a-button>
    </div>
    <div class="tr-transfer-left">接收者：
      <a-textarea placeholder="请输入接受者地址 (批量转账输入地址数组)..." :rows="4"/>
    </div>
    <div class="tr-transfer-right">金额：
      <a-textarea placeholder="请输入转账金额 (保持与接受者地址形式一致)..." :rows="4"/>
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
  methods:{
    fransfer(){

    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.tr-transfer {
  height: 100%;
  width: 100%;
}
.tr-transfer-top{
  padding-bottom: 10px;
}
.top-left{
  width: 80%;
}
.top-right{
  width: 15%;
  float: right;
}
.tr-transfer-left{
  width:49%;
  float: left;
}
.tr-transfer-right{
  width:49%;
  float: right;
}
</style>
