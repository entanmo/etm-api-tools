<template>
  <div class="home">
    <div class="home-show">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <head-info title="最新区块高度"
                       :content="height"
                       :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <head-info title="平均出块时间"
                       :content="avgTime"
                       :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <head-info title="交易总量"
                       :content="tps" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="home-avg">
      <viserbar :data="avgData" />
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import HeadInfo from "../../components/tool/HeadInfo";
import viserbar from "../../components/viser/ViserBar";

export default {
  data() {
    return {
      range: 505,
      height: 0,
      avgTime: 0,
      tps: 0,
      avgData: [],
      prevHeight: 0
    };
  },
  components: {
    HeadInfo,
    viserbar
  },
  mounted() {
    this.getHeight();
    this.calcAvgTime();

    setInterval(() => {
      this.getHeight();
    }, 3000);

    setInterval(() => {
      this.changeAvgData();
    }, 10000);
  },
  methods: {
    onChange() {},
    getHeight() {
      let server = new Server();
      server
        .get("api/blocks/getHeight", {})
        .then(res => {
          this.height = res.height;

          if (this.height !== this.prevHeight) {
            this.prevHeight = this.height;

            this.calcAvgTime(505, (err, avg) => {
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
          server
            .get("api/blocks/get", { height: height2 })
            .then(res => {
              block2 = res.block;
              if (block1 && block1.timestamp && block2 && block2.timestamp) {
                let avg = (block1.timestamp - block2.timestamp) / range;
                cb(null, avg);
              } else {
                cb("get height error1");
              }
            })
            .catch(() => {});
        })
        .catch(() => {});
    },
    changeAvgData() {
      // let server = new Server();
      // server
      //   .get("api/blocks", { limit: 10, offset: this.height - 10 })
      //   .then(res => {
      //     let blocks = res.blocks;console.log(blocks)

      //     let timeDate = [];
      //     for (let i = 0; i < blocks.length; i++) {
      //       timeDate.push({
      //         height: blocks[i].height.toString(),
      //         avgTime: blocks[i].timestamp
      //       });
      //     }
      //     this.avgData = timeDate;
      //   })
      //   .catch(() => {});

      // let dataNum = 10;
      // let dataTemp = this.avgData;
      // let avgTime;

      // if (dataTemp.length === 0) {
      //   for (let i = 0; i < dataNum; i++) {
      //     dataTemp.push({
      //       height: (this.height - (10 - i)).toString(),
      //       avgTime: 0
      //     });
      //   }
      // }
      // this.calcAvgTime(1, (err, avg) => {
      //   if (!err) {
      //     avgTime = avg.toFixed(2);
      //     dataTemp.push({
      //       height: this.height.toString(),
      //       avgTime: avgTime
      //     });
      //     this.avgData = dataTemp.slice(-dataNum);
      //   }
      // });
    }
  }
};
</script>

<style lang="less" scoped>
.home {
  .home-show {
    padding-bottom: 20px;
  }
  .home-avg {
    height: 250px;
    background-color: #fff;
  }
}
</style>
