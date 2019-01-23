<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="12"
                 :xs="36">
            <headinfo title="当前轮出块矿工数"
                      :content="totalDelegates"
                      :bordered="true" />
          </a-col>
          <a-col :sm="12"
                 :xs="36">
            <headinfo title="统计范围"
                      :content="range" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area">
      <div class="chart">
        <div class="chart-top">
          <div class="top-title">
            <h4>矿工统计：</h4>
          </div>
          <div>
            统计轮初始高度：
            <a-input-number :min="1"
                            v-model="startHeight"
                            :disabled="!disabled"
                            size="small" />
          </div>
          <div>
            统计轮长度：
            <a-input-number :min="101"
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
        <div class="chart-center">
          <viserbar :data="data"
                    :height="height"
                    :scale="scale"
                    :position="position" />
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import viserbar from "@/components/viser/ViserSmoothLine";
import headinfo from "@/components/tool/HeadInfo";

export default {
  data() {
    return {
      data: [],
      height: 250,
      scale: [
        {
          dataKey: "count",
          tickInterval: 1
        }
      ],
      position: "username*count",
      disabled: true,
      totalDelegates: 0,
      range: "1--505",
      startHeight: 1,
      len: 505
    };
  },
  components: {
    viserbar,
    headinfo
  },
  methods: {
    onSwitch(checked) {
      this.disabled = !checked;

      if (checked) {
        this.getBlocks(this.startHeight, this.len);
      } else {
        this.data = [];
        this.totalDelegates = 0;
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
      for (let i = 0; i < blocks.length; i++) {
        let generator = blocks[i].generatorPublicKey;
        if (generators[generator]) {
          generators[generator] += 1;
        } else {
          generators[generator] = 1;
        }
      }
      let keys = Object.keys(generators);
      for (let i = 0; i < keys.length; i++) {
        let key = keys[i];
        let res = await server.get("/api/delegates/get", { publicKey: key });
        this.data.push({
          username: res.delegate.username,
          count: generators[key]
        });
      }

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
      height: 300px;
      background-color: #fff;

      .chart-top {
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
