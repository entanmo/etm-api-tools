<template>
  <div class="wrapper-bottom" v-show="this.$store.state.api.returnMsg!==''">
    <a-tooltip title="清除日志"
                 placement="bottomRight">
                 <a-button class="message-clear" shape="circle" icon="delete" @click="clear"></a-button>
    </a-tooltip>
    <pre>{{returnMsg}}</pre>
  </div>
</template>

<script>
export default {
  computed: {
    returnMsg() {
      return this.$store.state.api.returnMsg;
    }
  },
  methods: {
    clear() {
      this.$store.state.api.returnMsg = "";
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper-bottom {
  background-color: gainsboro;
  padding: 10px 10px 0;

  .message-clear {
    right: 35px;
    position: absolute;
  }
}
</style>
