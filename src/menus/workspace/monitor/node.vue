<template>
  <div class="node">
    <div class="record">
      <a-card :bordered="false">
        <a-row>
          <a-col :sm="6" :xs="24">
            <headinfo title="服务器故障数" :content="fault" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <headinfo title="最新区块高度" :content="height" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <headinfo title="平均出块时间" :content="avg" :bordered="true" />
          </a-col>
          <a-col :sm="6" :xs="24">
            <headinfo title="最新快交易量" :content="trs" />
          </a-col>
        </a-row>
      </a-card>
    </div>
    <div class="node miner">
      <div class="title">矿机节点</div>
      <a-list :grid="{ gutter: 16, column: 3 }" :dataSource="miner">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-collapse @change="changeActivekey">
            <a-collapse-panel>
              <template slot="header">
                <span>{{item.name||item.ip}}</span>
                <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                <a-badge class="status" status="warning" v-else-if="item.status===1" text="更新中" />
                <a-badge class="status" status="error" v-else text="异常" />
              </template>

              <div>
                <div class="entry">
                  <div class="entry-title">IP</div>
                  <div class="entry-text">{{item.ip}}:{{item.port}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">状态</div>
                  <div class="entry-text">
                    <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                    <a-badge
                      class="status"
                      status="warning"
                      v-else-if="item.status===1"
                      text="更新中"
                    />
                    <a-badge class="status" status="error" v-else text="异常" />
                  </div>
                </div>
                <div class="entry">
                  <div class="entry-title">最新区块高度</div>
                  <div class="entry-text">{{item.lastestHeight}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">最后出块时间</div>
                  <div class="entry-text">{{$utils.timestampToTime(item.blockDate)}}</div>
                </div>

                <a-divider class="delegate" orientation="left">代理人</a-divider>

                <div v-for="(v,i) in item.delegates" :key="i">
                  <div class="entry">
                    <div class="entry-title">{{v.name}}</div>
                    <div
                      :class="[v.address == item.address?'active':'entry-text']"
                    >{{$utils.timestampToTime(v.blockDate)}}</div>
                  </div>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-list-item>
      </a-list>
    </div>
    <div class="node seed">
      <div class="title">种子节点</div>
      <a-list :grid="{ gutter: 16, column: 3 }" :dataSource="seed">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-collapse @change="changeActivekey">
            <a-collapse-panel>
              <template slot="header">
                <span>{{item.name||item.ip}}</span>
                <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                <a-badge class="status" status="warning" v-else-if="item.status===1" text="更新中" />
                <a-badge class="status" status="error" v-else text="异常" />
              </template>

              <div>
                <div class="entry">
                  <div class="entry-title">IP</div>
                  <div class="entry-text">{{item.ip}}:{{item.port}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">状态</div>
                  <div class="entry-text">
                    <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                    <a-badge
                      class="status"
                      status="warning"
                      v-else-if="item.status===1"
                      text="更新中"
                    />
                    <a-badge class="status" status="error" v-else text="异常" />
                  </div>
                </div>
                <div class="entry">
                  <div class="entry-title">最新区块高度</div>
                  <div class="entry-text">{{item.lastestHeight}}</div>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-list-item>
      </a-list>
    </div>
    <div class="node wallet">
      <div class="title">钱包节点</div>
      <a-list :grid="{ gutter: 16, column: 3 }" :dataSource="wallet">
        <a-list-item slot="renderItem" slot-scope="item, index" :key="index">
          <a-collapse @change="changeActivekey">
            <a-collapse-panel>
              <template slot="header">
                <span>{{item.name||item.ip}}</span>
                <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                <a-badge class="status" status="warning" v-else-if="item.status===1" text="更新中" />
                <a-badge class="status" status="error" v-else text="异常" />
              </template>

              <div>
                <div class="entry">
                  <div class="entry-title">IP</div>
                  <div class="entry-text">{{item.ip}}:{{item.port}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">状态</div>
                  <div class="entry-text">
                    <a-badge class="status" status="success" v-if="item.status===0" text="正常" />
                    <a-badge
                      class="status"
                      status="warning"
                      v-else-if="item.status===1"
                      text="更新中"
                    />
                    <a-badge class="status" status="error" v-else text="异常" />
                  </div>
                </div>
                <div class="entry">
                  <div class="entry-title">最新区块高度</div>
                  <div class="entry-text">{{item.lastestHeight}}</div>
                </div>
              </div>
            </a-collapse-panel>
          </a-collapse>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import headinfo from "@/components/tool/HeadInfo";
import Monitor from "@/scripts/monitor.js";
let monitor = new Monitor();

export default {
  data() {
    return {
      fault: 0,
      height: 0,
      avg: 0,
      trs: 0,
      miner: [],
      seed: [],
      wallet: []
    };
  },
  components: {
    headinfo
  },
  created() {
    this.getAllData();
  },
  sockets: {
    "node/add": function() {
      this.getAllData();
    },
    "node/remove": function() {
      this.getAllData();
    },
    "delegate/add": function() {
      this.getAllData();
    },
    "delegate/remove": function() {
      this.getAllData();
    },
    "height/update": function(res) {
      // console.log(res)
      if (res.lastestHeight > this.height) {
        this.height = res.lastestHeight;
      }

      this.getAllData();
    },
    "node/update": function() {
      this.getAllData();
    },
    "delegate/update": function() {
      this.getAllData();
    },
    "status/update": function() {
      this.getAllData();
    }
  },
  methods: {
    changeActivekey() {},
    getAllData() {
      monitor
        .get("/api/chain/all", { withDelegates: true })
        .then(res => {
          // console.log(res);
          if (res.success) {
            let miner = [];
            let seed = [];
            let wallet = [];
            let fault = 0;
            for (let i = 0; i < res.data.length; i++) {
              let node = res.data[i];

              if (node.type === 0) {
                miner.push(node);
              } else if (node.type === 1) {
                seed.push(node);
              } else if (node.type === 2) {
                wallet.push(node);
              }

              if (node.status === -1) {
                fault++;
              }
            }
            this.miner = miner;
            this.seed = seed;
            this.wallet = wallet;
            this.fault = fault;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style lang="less" scoped>
.node {
  .record {
    padding-bottom: 20px;
  }
  .node {
    background-color: #e1e4e8;
    padding: 15px;
    margin-bottom: 20px;

    .title {
      padding-bottom: 10px;
      font-size: 14px;
      font-weight: 600;
    }
    .delegate {
      font-size: 12px;
      // font-weight: 600;
    }
    .edit {
      text-align: center;
    }
    .status {
      padding-right: 10px;
      float: right;
    }
    .entry {
      display: flex;

      .entry-title {
        width: 100px;
        text-align: right;
        font-weight: 600;
        padding-right: 10px;
      }
      .active {
        color: red;
      }
    }
  }
}
</style>
