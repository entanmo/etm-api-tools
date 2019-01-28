<template>
  <div>
    <a-tooltip title="设置中心"
               placement="bottomRight">
      <a-button class="api-btn"
                shape="circle"
                icon="setting"
                @click="showModal"></a-button>
    </a-tooltip>
    <a-modal class="setting-modal"
             title="设置中心"
             v-model="visible"
             @ok="handleOk"
             okText="确认"
             cancelText="取消"
             :destroyOnClose="true">
      <div class="setting-modal-url">
        <div>
          <div class="setting-url-title">端口设置：(当前配置：{{curtype}}{{curip}})</div>
          <div style="padding: 10px 0">
            <a-input :defaultValue="curip"
                     v-model="ip">
              <a-select slot="addonBefore"
                        :defaultValue="curtype"
                        style="width: 90px"
                        @change="handleSelect">
                <a-select-option value="http://">http://</a-select-option>
                <a-select-option value="https://">https://</a-select-option>
              </a-select>
            </a-input>
          </div>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import config from "@/assets/ipconfig";

export default {
  data() {
    return {
      visible: false,
      curtype: "",
      curip: "",
      type: "",
      ip: ""
    };
  },
  computed: {
    isLoading() {
      return this.$store.state.setting.isLoading;
    }
  },
  methods: {
    handleSelect(val) {
      this.type = val;
    },
    showModal() {
      this.visible = true;

      let url = localStorage.getItem("url");
      if (url) {
        url = JSON.parse(url);
        config.type = url.type;
        config.ip = url.ip;
      }
      this.curtype = config.type;
      this.curip = config.ip;
      this.type = config.type;
      this.ip = config.ip;
    },
    handleOk() {
      this.visible = false;

      config.type = this.type;
      config.ip = this.ip;
      localStorage.setItem(
        "url",
        JSON.stringify({ type: config.type, ip: config.ip })
      );
    },
    onChange(checked) {
      this.$store.state.setting.isLoading = checked;
    }
  }
};
</script>

<style lang="less" scoped>
</style>
