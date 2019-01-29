<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="受托人总数"
                      :content="totalDelegates"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="得票人总数"
                      :content="hasVotes"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="投票人总数"
                      :content="totalVoters" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area1">
      <div class="chart1">
        <div class="chart-top">
          <div class="top-title">
            <h4>投票人总览：</h4>
          </div>
          <div class="top-btn">
            <a-switch checkedChildren="开"
                      unCheckedChildren="关"
                      @change="onSwitch" />
          </div>
        </div>
        <viserstackbar :vdata="vdata0" />
      </div>
    </div>
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="受托人总票数"
                      :content="votes"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="投票人数"
                      :content="voter"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="投票排名"
                      :content="rate" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area2">
      <div class="chart2">
        <div class="chart-top">
          <div class="top-title">
            <h4>受托人票数详情：</h4>
          </div>
        </div>
        <div class="chart-center">
          <div class="center-pie"
               v-show="vdata1.data.length>0">
            <visersecotr :vdata="vdata1" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import headinfo from "@/components/tool/HeadInfo";
import visersecotr from "@/components/viser/ViserSector";
import viserstackbar from "@/components/viser/ViserStackBar";

export default {
  data() {
    return {
      vdata0: {
        data: [],
        height: 220,
        scale: [
          {
            dataKey: "weight",
            min: 0
          }
        ],
        axis: [
          {
            key: "username"
          },
          {
            key: "weight"
          },
          {
            key: "num"
          }
        ],
        onClick: (ev, chart) => {
          var point = {
            x: ev.x,
            y: ev.y
          };
          var items = chart.getTooltipItems(point);
          this.onCheck(items[0].title);
        }
      },
      vdata1: {
        data: [],
        height: 200,
        scale: [
          {
            dataKey: "weight",
            min: 0
          }
        ],
        axis: [
          {
            key: "num"
          },
          {
            key: "weight"
          }
        ]
      },
      totalDelegates: 0,
      hasVotes: 0,
      totalVoters: 0,
      votes: 0,
      voter: 0,
      rate: 0,
      publickey: "",
      checkData: []
    };
  },
  components: {
    headinfo,
    visersecotr,
    viserstackbar
  },
  mounted() {},
  methods: {
    onSwitch(checked) {
      if (checked) {
        this.getData();
      }
    },
    async getData() {
      let server = new Server();
      let delegates = [];
      let checkData = {};
      let res = await server.get("api/delegates", {});
      delegates = res.delegates;
      if (delegates.length < res.totalCount) {
        for (let i = res.delegates.length; i < res.totalCount; i += 100) {
          let resNext = await server.get("api/delegates", {
            offset: delegates.length,
            limit: 100
          });
          delegates = delegates.concat(resNext.delegates);
        }
      }

      let data0 = [];
      let hasVotes = 0;
      for (let i = 0; i < delegates.length; i++) {
        let publicKey = delegates[i].publicKey;
        let username = delegates[i].username;

        checkData[username] = {
          rate: delegates[i].rate,
          vote: delegates[i].vote,
          voters: []
        };

        let resVoters = await server.get("api/delegates/voters", { publicKey });
        if (resVoters.accounts.length) {
          hasVotes++;
        }
        for (let j = 0; j < resVoters.accounts.length; j++) {
          data0.push({
            num: "投票人" + (j + 1),
            username: username,
            weight: resVoters.accounts[j].weight
          });

          checkData[username].voters.push({
            num: "投票人" + (j + 1),
            username: username,
            weight: resVoters.accounts[j].weight
          });
        }
      }
      this.vdata0.data = data0;
      this.totalDelegates = delegates.length;
      this.hasVotes = hasVotes;
      this.totalVoters = data0.length;

      this.checkData = checkData;
    },
    onCheck(username) {
      let data = this.checkData[username];
      this.vdata1.data = data.voters;
      this.votes = data.vote;
      this.rate = data.rate;
      this.voter = data.voters.length;
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
  .body-area1 {
    padding-bottom: 20px;
    .chart1 {
      height: 300px;
      background-color: #fff;

      .chart-top {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .body-area2 {
    .chart2 {
      height: 280px;
      background-color: #fff;

      .chart-top {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .top-title {
          width: 120px;
        }
      }
    }
  }
}
</style>
