<template>
  <div class="qi-block">
    <div class="qi-block-sender">
      <div class="sender-title">区块：</div>
      <a-input-group class="sender-input"
                     compact>
        <a-select class="sender-input-type"
                  defaultValue="height"
                  @change="handleChange">
          <a-select-option value="height">height</a-select-option>
          <a-select-option value="id">id</a-select-option>
        </a-select>
        <a-input class="sender-input-value"
                 defaultValue="请输入区块查询参数"
                 v-model="value" />
      </a-input-group>
      <a-button class="sender-button"
                type="primary"
                @click="queryblock">查询</a-button>
    </div>
  </div>
</template>

<script>
import QueryInfo from "../../scripts/queryInfo/queryInfo.js";
import Utils from "../../scripts/utils/utils.js";

export default {
  data() {
    return {
      value: "",
      type: "height"
    };
  },
  components: {},
  methods: {
    queryblock() {
      if (!this.value) {
        this.$message.error("请输入完整区块查询信息！");
        return;
      }

      let value = Utils.processString(this.value);

      let qi = new QueryInfo();
      let data = {};
      data[this.type] = value;
      qi.queryblock(data)
        .then(res => {
          let message = "区块查询操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
        })
        .then(err => {
          if (err) {
            let message = "区块查询异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    },
    handleChange(value) {
      console.log(`selected ${value}`);
      this.type = value;
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.qi-block-sender {
  padding-bottom: 20px;

  .sender-input {
    width: calc(95% - @btnWidth);
    display: inline-block;

    .sender-input-type {
      width: @btnWidth;
    }

    .sender-input-value {
      width: calc(100% - @btnWidth);
    }
  }
  .sender-button {
    width: @btnWidth;
    float: right;
  }
}
</style>
