<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="统计范围"
                      :content="range"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="统计范围的平均时间"
                      :content="avgTime"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="统计范围的矿工数"
                      :content="totalDelegates" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area">
      <div class="chart">
        <div class="chart-top">
          <div class="top-title">
            <h4>出块统计(创世快不计)：</h4>
          </div>
          <div>
            统计初始高度：
            <a-input-number :min="1"
                            v-model="startHeight"
                            :disabled="!disabled"
                            size="small" />
          </div>
          <div>
            统计长度：
            <a-input-number :min="3"
                            v-model="len"
                            :disabled="!disabled"
                            size="small" />
          </div>
          <div class="top-switch">
            <a-switch @change="onSwitch"
                      checkedChildren="统计开"
                      unCheckedChildren="统计关">
            </a-switch>
          </div>
        </div>
        <div class="chart-center"
             id="fitsize"
             v-show="!disabled">
          <viserbar :vdata="vdata0" />
          <visersmoothline :vdata="vdata" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import visersmoothline from "@/components/viser/ViserSmoothLine";
import viserbar from "@/components/viser/ViserBar";
import headinfo from "@/components/tool/HeadInfo";

export default {
  data() {
    return {
      vdata0: {
        data: [],
        height: 250,
        width: 600,
        scale: [
          {
            dataKey: "time",
            min: 0
          }
        ],
        axis: [
          {
            key: "height"
          },
          {
            key: "time"
          }
        ]
      },
      vdata: {
        data: [],
        height: 250,
        width: 600,
        scale: [
          {
            dataKey: "count",
            tickInterval: 1,
            min: 0
          }
        ],
        axis: [
          {
            key: "username"
          },
          {
            key: "count",
            color: "blue",
            color2: "green"
          }
        ]
      },
      disabled: true,
      range: "0-0",
      avgTime: 0,
      totalDelegates: 0,
      startHeight: 1,
      len: 101
    };
  },
  components: {
    visersmoothline,
    viserbar,
    headinfo
  },
  methods: {
    onSwitch(checked) {
      this.disabled = !checked;

      if (checked) {
        this.getBlocks(this.startHeight - 1, this.len);
      } else {
        this.vdata0.data = [];
        this.vdata.data = [];
        this.totalDelegates = 0;
        this.avgTime = 0;
        this.range = "0--0";
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

      let generators = {};
      let timeDate = [];
      for (let i = 0; i < blocks.length; i++) {
        if (blocks[i].height === 1) {
          continue;
        }
        let generator = blocks[i].generatorPublicKey;
        if (generators[generator]) {
          generators[generator] += 1;
        } else {
          generators[generator] = 1;
        }

        if (blocks[i].height === 2 || i === 0) {
          timeDate.push({
            height: blocks[i].height.toString(),
            time: 3
          });
        } else {
          timeDate.push({
            height: blocks[i].height.toString(),
            time: blocks[i].timestamp - blocks[i - 1].timestamp
          });
        }
      }
      this.vdata0.width = document.getElementById("fitsize").clientWidth;
      this.vdata.width = document.getElementById("fitsize").clientWidth;
      this.vdata0.data = timeDate;

      let keys = Object.keys(generators);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let res = await server.get("/api/delegates/get", { publicKey: key });
        let username = "null";
        if (res.delegate && res.delegate.username) {
          username = res.delegate.username;
        }
        this.vdata.data.push({
          username: username,
          count: generators[key]
        });
      }

      let startBlock = null,
        avgLength = 0;
      if (blocks[0].height === 1) {
        startBlock = blocks[1];
        avgLength = blocks.length - 2;
      } else {
        startBlock = blocks[0];
        avgLength = blocks.length - 1;
      }
      this.avgTime = (
        (blocks[blocks.length - 1].timestamp - startBlock.timestamp) /
        avgLength
      ).toFixed(2);
      this.totalDelegates = keys.length;
      this.range = this.startHeight + "--" + (this.startHeight + this.len - 1);
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
      height: 580px;
      background-color: #fff;

      .chart-top {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .top-title {
          width: 200px;
        }
      }
    }
  }
}
</style>
