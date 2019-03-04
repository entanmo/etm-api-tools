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
      <div class="chart">
        <div class="chart-top">
          <div class="top-title">
            <h4>TPS计算：</h4>
          </div>
          <div>
            开始高度：
            <a-input-number :min="2"
                            v-model="startHeight"
                            @change="onChange"
                            size="small" />
          </div>
          <div>
            结束高度
            <a-input-number :min="2"
                            v-model="endHeight"
                            @change="onChange"
                            size="small" />
          </div>
          <div class="top-btn">
            <a-button type='primary'
                      @click='calc'
                      :disabled="!canCalc">
              计算
            </a-button>
          </div>
        </div>
        <div class="chart-center">
          <viserdouble :vdata="vdata" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headinfo from "@/components/tool/HeadInfo";
import viserdouble from "@/components/viser/ViserDouble";
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
      totalTrs: 0,
      startHeight: "",
      endHeight: "",
      canCalc: false,
      vdata: {
        data: [],
        height: 250,
        scale: [
          {
            dataKey: "height",
            tickInterval: 1
          },
          {
            dataKey: "time",
            min: 0
          },
          {
            dataKey: "trs",
            min: 0
          }
        ],
        axis: [
          {
            key: "height"
          },
          {
            key: "time",
            color: "#3182bd"
          },
          {
            key: "trs",
            color: "#fdae6b"
          }
        ]
      }
    };
  },
  components: {
    headinfo,
    viserdouble
  },
  mounted() {},
  methods: {
    calc() {
      let start = parseInt(this.startHeight);
      let end = parseInt(this.endHeight);
      if (start > end) {
        console.log("input start height bigger then end height!");
      } else {
        let len = end - start + 2;
        this.getBlocks(start - 2, len);
      }
    },
    onChange() {
      let start = parseInt(this.startHeight);
      let end = parseInt(this.endHeight);
      if (end > start) {
        this.canCalc = true;
      } else {
        this.canCalc = false;
      }
    },
    async getBlocks(startHeight, len) {
      let blocks = [];
      let server = new Server();
      for (let i = 0; i < len; i += 100) {
        let limit = 100;
        let offset = startHeight + i;
        if (i + 100 > len) {
          limit = len - i;
        }
        let res = await server.get("api/blocks", { limit, offset });
        blocks = blocks.concat(res.blocks);
      }

      this.calcTps(blocks);
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
      let o_data = [];

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
            let blockTime = useBlocks[i].timestamp - useBlocks[i - 1].timestamp;
            if (blockTime > maxgap) {
              maxgap = blockTime;
            }

            o_data.push({
              height: useBlocks[i].height,
              trs: useBlocks[i].numberOfTransactions,
              time: blockTime
            });
          }
        }
        tps = totalTrs / totalTimes;
      }
      this.tps = tps.toFixed(2);
      this.maxtrs = maxtrs;
      this.maxgap = maxgap;
      this.len = len - 1;
      this.totalTrs = totalTrs;

      this.vdata.data = o_data;

      // let message = "TPS统计区块:" + JSON.stringify(useBlocks, null, 2);
      // this.$store.state.api.returnMsg =
      //   message + "\r\n" + this.$store.state.api.returnMsg;
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper-content {
  padding-bottom: 20px;

  .head-area {
    padding-bottom: 20px;
  }
  .body-area {
    .chart {
      height: 300px;
      background-color: #fff;

      .chart-top {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .top-title {
          width: 100px;
        }
      }
    }
  }
}
</style>
