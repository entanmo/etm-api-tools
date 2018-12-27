<template>
  <div class="pub-return-msg">
    <div class="message-top">
      <div class="message-title">返回信息：</div>
      <a-button class="message-clear"
                shape="circle"
                icon="delete"
                @click="clear"></a-button>
    </div>
    <div class="message-content" v-show="message !=''">
      <pre>{{message}}</pre>
    </div>
  </div>
</template>

<script>
import eventBus from "../../eventBus.js";

export default {
  data() {
    return {
      message: ""
    };
  },
  mounted() {
    this.getEvenData();
  },
  methods: {
    getEvenData() {
      let that = this;
      eventBus.$on("returnMsg", msg => {
        that.message += msg + "\r\n";
      });
    },
    clear() {
      this.message = "";
    }
  }
};
</script>

<style lang="less" scoped>
.pub-return-msg {
  padding-top: 10px;

  .message-top {
    display: flex;
    justify-content: space-between;

    .message-clear{
      position: fixed;
      right:40px;
    }
  }
  .message-content {
    background-color: #f6f8fa;
    padding: 10px;
  }
}
</style>