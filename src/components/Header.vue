<template>
  <div class="header">
    <h1 class="header-title">En-Tan-Mo 集成工具</h1>
    <a-button class="header-setting"
              icon="setting"
              shape="circle"
              type="primary"
              @click="showModal" />
    <a-modal class="setting-modal"
             title="设置中心"
             v-model="visible"
             @ok="handleOk"
             okText="确认"
             cancelText="取消">
      <div class="setting-url">
        <div class="setting-url-title">端口设置：(当前配置：{{curip}}: {{curport}})</div>
        <div class="setting-url-input">
          <a-input class="setting-input-ip"
                   placeholder="请输入ip"
                   v-model="ip" />
          <a-input class="setting-input-port"
                   placeholder="请输入port"
                   v-model="port" />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import config from "../assets/config";

let configip = config.ip;
let configport = config.port;

export default {
  data() {
    return {
      visible: false,
      curip: configip,
      curport: configport,
      ip: "",
      port: ""
    };
  },
  methods: {
    showModal() {
      this.visible = true;
    },
    handleOk(e) {
      console.log(e);
      this.visible = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.header {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  background: deepskyblue;
  position: absolute;
  z-index: 5;
  top: 0;
  display: flex;

  .header-title {
    display: block;
    width: calc(95% - 50px);
    text-align: center;
  }
  .header-setting {
    margin: auto;
  }
  .setting-modal {
    .setting-url-input {
      display: flex;
      flex-direction: column;

      .setting-input-ip {
        width: 300px;
      }
      .setting-input-port {
        width: 100px;
      }
    }
  }
}
</style>
