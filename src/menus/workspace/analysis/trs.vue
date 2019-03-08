<template>
  <div class="wrapper-content">
    <div class="head-area">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="账户余额"
                      :content="balance"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="发送交易总数"
                      :content="sendcount"
                      :bordered="true" />
          </a-col>
          <a-col :sm="8"
                 :xs="24">
            <headinfo title="接收交易总数"
                      :content="recivecount" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="body-area">
      <div class="chart">
        <div class="chart-top">
          <div class="top-title">
            <h4>交易统计：</h4>
          </div>
          <div class="top-input">
            <a-input v-model="address"
                     addonBefore="账户地址" />
          </div>
          <div class="top-btn">
            <a-button type="primary"
                      @click="onSend"
                      :disabled="address==''">查询</a-button>
          </div>
        </div>
        <div class="chart-center">
          <div class="center-pie"
               id="fitsize1">
            <div v-show="vdata1.data.length>0">
              所发送交易：
              <visersecotr :vdata="vdata1" />
            </div>
          </div>
          <div class="center-pie"
               id="fitsize2">
            <div v-show="vdata2.data.length>0">
              所接收交易：
              <viserpie :vdata="vdata2" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import viserpie from "@/components/viser/ViserPie";
import visersecotr from "@/components/viser/ViserSector";
import headinfo from "@/components/tool/HeadInfo";

export default {
  data() {
    return {
      vdata1: {
        data: [],
        height: 300,
        scale: [
          {
            dataKey: "count",
            min: 0
          }
        ],
        axis: [
          {
            key: "type"
          },
          {
            key: "count"
          }
        ]
      },
      vdata2: {
        data: [],
        height: 300,
        scale: [
          {
            dataKey: "count",
            min: 0
          }
        ],
        axis: [
          {
            key: "type"
          },
          {
            key: "count"
          }
        ]
      },
      balance: 0,
      sendcount: 0,
      recivecount: 0,
      address: ""
    };
  },
  components: {
    viserpie,
    visersecotr,
    headinfo
  },
  methods: {
    async onSend() {
      let server = new Server();
      let res1 = await server.get("api/transactions", {
        senderId: this.address
      });
      this.sendcount = res1.transactions.length;
      this.vdata1.width = document.getElementById("fitsize1").clientWidth;
      this.vdata1.data = this.dealTrs(res1.transactions);

      let res2 = await server.get("api/transactions", {
        recipientId: this.address
      });
      this.recivecount = res2.transactions.length;
      this.vdata2.width = document.getElementById("fitsize2").clientWidth;
      this.vdata2.data = this.dealTrs(res2.transactions);

      let res3 = await server.get("api/accounts", { address: this.address });
      this.balance = res3.account.balance;
    },
    dealTrs(trs) {
      let trs1 = {};
      let data = [];
      for (let i = 0; i < trs.length; i++) {
        if (trs1[trs[i].type]) {
          trs1[trs[i].type] += 1;
        } else {
          trs1[trs[i].type] = 1;
        }
      }
      let keys = Object.keys(trs1);
      for (let i = 0; i < keys.length; i++) {
        data.push({
          type: "type=" + keys[i].toString(),
          count: trs1[keys[i]]
        });
      }
      return data;
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
      height: 400px;
      background-color: #fff;

      .chart-top {
        height: 50px;
        padding: 10px;
        display: flex;
        justify-content: space-between;

        .top-title {
          width: 100px;
        }
        .top-input {
          width: calc(100% - 300px);
        }
        // .top-btn {
        //   width: 100px;
        // }
      }
      .chart-center {
        display: flex;
        justify-content: space-between;

        .center-pie {
          width: 50%;
          padding: 20px 10px 10px;
        }
      }
    }
  }
}
</style>
