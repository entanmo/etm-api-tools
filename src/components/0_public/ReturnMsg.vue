<template>
  <div class="pub-return-msg">
    <!-- <div class="message-title">返回信息：</div>
    <a-textarea class="message-input"
                disabled
                placeholder
                :rows="8"
                v-model="message" /> -->
  </div>
</template>

<script>
export default {
  name: "ReturnMsg",
  props:{
    message:String
  }
};
</script>

<style lang="less" scoped>
</style>