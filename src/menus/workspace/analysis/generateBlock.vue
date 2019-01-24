<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="12"
                 :xs="36">
            <headinfo title="最新高度"
                      :content="lastHeight"
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
            <h4>出块统计图：</h4>
          </div>
          <div class="top-slider">
            <a-slider :defaultValue="barLength"
                      :min="10"
                      :max="50"
                      :disabled="disabled"
                      @afterChange="onSlider" />
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
import viserbar from "@/components/viser/ViserBar";
import headinfo from "@/components/tool/HeadInfo";

export default {
  data() {
    return {
      data: [],
      height: 250,
      scale: [
        {
          dataKey: "time",
          tickInterval: 3,
          min: 0
        }
      ],
      position: "height*time",
      disabled: true,
      barLength: 20,
      interval: null,
      lastHeight: 0,
      range: "0-0"
    };
  },
  components: {
    headinfo,
    viserbar
  },
  methods: {
    onSlider(value) {
      this.barLength = value;
    },
    onSwitch(checked) {
      this.disabled = !checked;

      if (checked) {
        this.changeAvgData();
        this.interval = setInterval(() => {
          this.changeAvgData();
        }, 3000);
      } else {
        clearInterval(this.interval);
      }
    },
    changeAvgData() {
      let server = new Server();
      server
        .get("api/blocks", { limit: this.barLength + 1, orderBy: "height" })
        .then(res => {
          let blocks = res.blocks.reverse();

          let timeDate = [];
          for (let i = 0; i < blocks.length - 1; i++) {
            timeDate.push({
              height: blocks[i + 1].height.toString(),
              time: blocks[i + 1].timestamp - blocks[i].timestamp
            });
          }
          this.lastHeight = blocks[blocks.length - 1].height;
          this.range =
            blocks[0].height + "--" + blocks[blocks.length - 1].height;
          this.data = timeDate;
        })
        .catch(() => {});
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
      height: 280px;
      background-color: #fff;

      .chart-top {
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .top-title {
          width: 100px;
        }
        .top-slider {
          width: calc(100% - 200px);
        }
      }
    }
  }
}
</style>
