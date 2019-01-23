<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="4"
                 :xs="12">
            <headinfo title="TPS"
                      :content="tps"
                      :bordered="true" />
          </a-col>
          <a-col :sm="5"
                 :xs="15">
            <headinfo title="最多交易区块数量"
                      :content="maxtrs"
                      :bordered="true" />
          </a-col>
          <a-col :sm="5"
                 :xs="15">
            <headinfo title="最大出块间隔时间"
                      :content="maxgap"
                      :bordered="true" />
          </a-col>
          <a-col :sm="5"
                 :xs="15">
            <headinfo title="包含交易区间数量"
                      :content="len"
                      :bordered="true" />
          </a-col>
          <a-col :sm="5"
                 :xs="15">
            <headinfo title="交易总量"
                      :content="totalTrs" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area">
      <a-form @submit="handleSubmit"
              :form="form">
        <a-form-item label='开始高度'
                     :labelCol="{ span: 6 }"
                     :wrapperCol="{ span: 14 }">
          <a-input v-decorator="[
          'start',
          {rules: [{ required: true, message: '起始高度必须输入' }]}
        ]"
                   placeholder='请输入计算TPS的结束高度!' />
        </a-form-item>
        <a-form-item label='结束高度'
                     :labelCol="{ span: 6 }"
                     :wrapperCol="{ span: 14 }">
          <a-input v-decorator="[
          'end',
          {rules: [{ required: true, message: '结束高度必须输入' }]}
        ]"
                   placeholder='请输入计算TPS的结束高度!'>
          </a-input>
        </a-form-item>
        <a-form-item :wrapperCol="{ span: 5, offset: 6 }">
          <a-button type='primary'
                    htmlType='submit'>
            计算
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>
import headinfo from "@/components/tool/HeadInfo";
import Server from "@/scripts/server.js";

export default {
  data() {
    return {
      formLayout: "horizontal",
      form: this.$form.createForm(this),
      tps: 0,
      maxtrs: 0,
      maxgap: 0,
      len: 0,
      totalTrs: 0
    };
  },
  components: {
    headinfo
  },
  mounted() {},
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log("Received values of form: ", values);
          if (values.start > values.end) {
            console.log("input start height less then end height!");
          } else {
            let limit = values.end - values.start + 2;

            let server = new Server();
            server
              .get("api/blocks", { limit: limit, offset: values.start - 2 })
              .then(res => {
                let blocks = res.blocks;

                if (blocks.length > 0) {
                  this.calcTps(blocks);
                }
              })
              .catch(() => {});
          }
        }
      });
    },
    calcTps(blocks) {
      let useBlocks = [];
      let startBlockNum = -1;
      let ensBlockNum = -1;
      let tps = 0;
      let maxtrs = 0;
      let maxgap = 0;
      let len = 0;
      let totalTrs = 0;

      for (let i = 1; i < blocks.length; i++) {
        if (blocks[i].numberOfTransactions > 0 && startBlockNum < 0) {
          startBlockNum = i - 1;
          break;
        }
      }
      for (let j = blocks.length - 1; j >= 0; j--) {
        if (blocks[j].numberOfTransactions > 0 && ensBlockNum < 0) {
          ensBlockNum = j;
          break;
        }
      }
      if (startBlockNum > -1 && ensBlockNum > -1) {
        useBlocks = blocks.slice(startBlockNum, ensBlockNum + 1);

        len = useBlocks.length;

        let totalTimes = useBlocks[len - 1].timestamp - useBlocks[0].timestamp;
        for (let i = 0; i < len; i++) {
          totalTrs += useBlocks[i].numberOfTransactions;

          if (useBlocks[i].numberOfTransactions > maxtrs) {
            maxtrs = useBlocks[i].numberOfTransactions;
          }

          if (i > 0) {
            if (useBlocks[i].timestamp - useBlocks[i - 1].timestamp > maxgap) {
              maxgap = useBlocks[i].timestamp - useBlocks[i - 1].timestamp;
            }
          }
        }
        tps = totalTrs / totalTimes;
      }
      this.tps = tps.toFixed(2);
      this.maxtrs = maxtrs;
      this.maxgap = maxgap;
      this.len = len - 1;
      this.totalTrs = totalTrs;

      let message = "TPS统计区块:" + JSON.stringify(useBlocks, null, 2);
      this.$store.state.api.returnMsg =
        message + "\r\n" + this.$store.state.api.returnMsg;
    }
  }
};
</script>

<style lang="less" scoped>
.head-area {
  padding-bottom: 20px;
}
</style>
