<template>
  <div class="home">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="最新区块高度"
                      :content="height"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="平均出块时间"
                      :content="avgTime"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="最新块交易量"
                      :content="trsNumber" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area">
      <div class="chart-title">
        <h4>出块状态（最近{{barlenght}}块）:</h4>
      </div>
      <div id="fitsize">
        <viserbar :vdata="vdata" />
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import headinfo from "@/components/tool/HeadInfo";
import viserbar from "@/components/viser/ViserDouble";

// const AVG_LEN = 505;
const BAR_LEN = 50;

export default {
  data() {
    return {
      barlenght: BAR_LEN,
      isLoading: this.$store.state.setting.isLoading,
      height: 0,
      avgTime: 0,
      trsNumber: 0,
      prevHeight: 0,
      vdata: {
        data: [],
        height: 250,
        width: 600,
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
            color: "#67c7f396"
          },
          {
            key: "trs",
            color: "#fdae6b",
            color2: "#52c41a"
          }
        ]
      }
    };
  },
  components: {
    headinfo,
    viserbar
  },
  sockets: {
    "height/update": function(res) {
      if (res.lastestHeight > this.height) {
        this.getHeight();
      }
    }
  },
  methods: {
    getHeight() {
      let server = new Server();
      server
        .get("api/blocks/getHeight", {})
        .then(res => {
          this.height = res.height;

          if (this.height !== this.prevHeight) {
            this.prevHeight = this.height;

            this.calcAvgTime(BAR_LEN, (err, avg) => {
              if (!err) {
                this.avgTime = avg.toFixed(2);
              }
            });
            this.changeAvgData();
          }
        })
        .catch(() => {});
    },
    calcAvgTime(range, cb) {
      let height1 = this.height;
      let height2 = height1 - range;
      let block1, block2;

      let server = new Server();
      server
        .get("api/blocks/get", { height: height1 })
        .then(res => {
          block1 = res.block;
          this.trsNumber = block1.numberOfTransactions;

          server
            .get("api/blocks/get", { height: height2 })
            .then(res => {
              block2 = res.block;
              if (block1 && block1.timestamp && block2 && block2.timestamp) {
                let avg = (block1.timestamp - block2.timestamp) / range;
                cb(null, avg);
              } else {
                cb("get height error");
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    changeAvgData() {
      let server = new Server();
      server
        .get("api/blocks", { limit: BAR_LEN + 1, orderBy: "height" })
        .then(res => {
          let blocks = res.blocks.reverse();

          let data = [];
          for (let i = 0; i < blocks.length - 1; i++) {
            let avg = blocks[i + 1].timestamp - blocks[i].timestamp;
            let trs = blocks[i + 1].numberOfTransactions;
            data.push({
              height: blocks[i + 1].height.toString(),
              time: avg,
              trs: trs
            });
          }
          this.vdata.width = document.getElementById("fitsize").clientWidth;
          this.vdata.data = data;
        })
        .catch(() => {});
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  padding-bottom: 20px;

  .head-area {
    padding-bottom: 20px;
  }
  .body-area {
    height: 320px;
    background-color: #fff;

    .chart-title {
      padding: 10px;
    }
  }
}
</style>
