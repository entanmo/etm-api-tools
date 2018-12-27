<template>
  <div class="setting">
    <a-button
      class="setting-button"
      icon="setting"
      shape="circle"
      type="primary"
      @click="showModal"
    />
    <a-modal
      class="setting-modal"
      title="设置中心"
      v-model="visible"
      @ok="handleOk"
      okText="确认"
      cancelText="取消"
      :destroyOnClose="true"
    >
      <div class="setting-modal-url">
        <div class="setting-url-title">端口设置：(当前配置：{{curip}}: {{curport}})</div>
        <div class="setting-url-input" style="display: flex; justify-content: space-between;">
          <a-input class="setting-input-ip" placeholder="请输入ip" v-model="ip" style="width:60%"/>
          <a-input
            class="setting-input-port"
            placeholder="请输入port"
            v-model="port"
            style="width:30%"
          />
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import config from "../assets/config";

export default {
  data() {
    return {
      visible: false,
      curip: "",
      curport: "",
      ip: "",
      port: ""
    };
  },
  methods: {
    showModal() {
      this.visible = true;

      this.curip = config.ip;
      this.curport = config.port;
      this.ip = "";
      this.port = "";
    },
    handleOk() {
      this.visible = false;

      config.ip = this.ip;
      config.port = this.port;
    }
  }
};
</script>

<style lang="less" scoped>
// .setting {
//   .setting-modal {
//     .setting-url-input {
//       display: flex;
//       flex-direction: column;

//       .setting-input-ip {
//         width: 300px;
//       }
//       .setting-input-port {
//         width: 100px;
//       }
//     }
//   }
// }
</style>
