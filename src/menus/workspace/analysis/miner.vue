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
            <h4>矿工得票权重总览：</h4>
          </div>
          <div class="top-btn">
            <a-switch checkedChildren="统计开"
                      unCheckedChildren="统计关"
                      @change="onSwitch" />
          </div>
        </div>
        <viserstackbar v-show="vdata0.data.length>0"
                       :vdata="vdata0" />
      </div>
    </div>
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="受托人名称"
                      :content="delegateName"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="受托人总票数"
                      :content="votes"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="投票人数"
                      :content="voter"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="投票排名"
                      :content="rate" />
          </a-col>
        </a-row>
      </a-card>
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="出块奖励"
                      :content="rewards"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="出块总数"
                      :content="producedblocks"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="丢失块数"
                      :content="missedblocks"
                      :bordered="true" />
          </a-col>
          <a-col :sm="6"
                 :xs="18">
            <headinfo title="出块率"
                      :content="productivity" />
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
      checkData: [],
      delegateName: "",
      votes: 0,
      voter: 0,
      rate: 0,
      rewards: 0,
      producedblocks: 0,
      missedblocks: 0,
      productivity: 0 + "%"
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
      } else {
        this.totalDelegates = 0; //受托人总数
        this.hasVotes = 0; //得票人总数
        this.totalVoters = 0; //投票人总数
        this.vdata0.data = [];

        this.vdata1.data = [];
        this.delegateName = "";
        this.votes = 0; //总票数
        this.rate = 0; //排名
        this.voter = 0; //投票人数
        this.rewards = 0;
        this.producedblocks = 0;
        this.missedblocks = 0;
        this.productivity = 0 + "%";
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
          voters: [],
          rewards: delegates[i].rewards,
          producedblocks: delegates[i].producedblocks,
          missedblocks: delegates[i].missedblocks,
          productivity: delegates[i].productivity
        };

        let resVoters = await server.get("api/delegates/voters", { publicKey });
        let accounts = resVoters.accounts.reverse();
        if (accounts.length) {
          hasVotes++;
        } else {
          data0.push({
            num: "无投票人",
            username: username,
            weight: 0
          });
        }
        for (let j = accounts.length - 1; j >= 0; j--) {
          data0.push({
            num: "第" + (j + 1) + "投票人",
            username: username,
            weight: accounts[j].weight
          });

          checkData[username].voters.push({
            num: "第" + (j + 1) + "投票人",
            username: username,
            weight: accounts[j].weight
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
      this.delegateName = username;
      this.votes = data.vote;
      this.rate = data.rate;
      this.voter = data.voters.length;
      this.rewards = data.rewards;
      this.producedblocks = data.producedblocks;
      this.missedblocks = data.missedblocks;
      this.productivity = data.productivity + "%";
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
