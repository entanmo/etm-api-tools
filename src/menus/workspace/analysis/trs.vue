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
                      @click="onSend">查询</a-button>
          </div>
        </div>
        <div class="chart-center">
          <div class="center-pie">
            发送交易：
            <viserpie :vdata="vdata1" />
          </div>
          <div class="center-pie">
            接收交易：
            <viserpie :vdata="vdata2" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Server from "@/scripts/server.js";
import viserpie from "@/components/viser/ViserPie";
import headinfo from "@/components/tool/HeadInfo";

export default {
  data() {
    return {
      vdata1: {
        data: [],
        height: 250,
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
        height: 250,
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
    headinfo
  },
  methods: {
    async onSend() {
      let server = new Server();
      let res1 = await server.get("api/transactions", {
        senderId: this.address
      });
      for (let i = 0; i < res1.transactions.length; i++) {
        this.vdata1.data.push({
          type: res1.transactions[i].type.toString(),
          count: 1
        });
      }

      let res2 = await server.get("api/transactions", {
        recipientId: this.address
      });
      for (let i = 0; i < res2.transactions.length; i++) {
        this.vdata2.data.push({
          type: res2.transactions[i].type.toString(),
          count: 1
        });
      }

      let res3 = await server.get("api/accounts", { address: this.address });
      this.balance = res3.account.balance;
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
          padding: 10px;
        }
      }
    }
  }
}
</style>
