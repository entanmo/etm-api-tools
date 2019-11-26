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

                <a-badge
                  class="status"
                  status="success"
                  v-if="parseInt(item.status)===0"
                  text="正常"
                />
                <a-badge
                  class="status"
                  status="warning"
                  v-else-if="parseInt(item.status)===1"
                  text="更新中"
                />
                <a-badge class="status" status="error" v-else text="异常" />

                <span class="height">{{item.lastestHeight}}</span>
              </template>

              <div>
                <div class="entry">
                  <div class="entry-title">IP</div>
                  <div class="entry-text">{{item.ip}}:{{item.port}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">状态</div>
                  <div class="entry-text">
                    <a-badge
                      class="status"
                      status="success"
                      v-if="parseInt(item.status)===0"
                      text="正常"
                    />
                    <a-badge
                      class="status"
                      status="warning"
                      v-else-if="parseInt(item.status)===1"
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

                <a-badge
                  class="status"
                  status="success"
                  v-if="parseInt(item.status)===0"
                  text="正常"
                />
                <a-badge
                  class="status"
                  status="warning"
                  v-else-if="parseInt(item.status)===1"
                  text="更新中"
                />
                <a-badge class="status" status="error" v-else text="异常" />

                <span class="height">{{item.lastestHeight}}</span>
              </template>

              <div>
                <div class="entry">
                  <div class="entry-title">IP</div>
                  <div class="entry-text">{{item.ip}}:{{item.port}}</div>
                </div>
                <div class="entry">
                  <div class="entry-title">状态</div>
                  <div class="entry-text">
                    <a-badge
                      class="status"
                      status="success"
                      v-if="parseInt(item.status)===0"
                      text="正常"
                    />
                    <a-badge
                      class="status"
                      status="warning"
                      v-else-if="parseInt(item.status)===1"
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

                <span class="height">{{item.lastestHeight}}</span>
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
      // console.log("node/add")
      this.getAllData();
    },
    "node/remove": function() {
      // console.log("node/remove")
      this.getAllData();
    },
    "delegate/add": function() {
      // console.log("delegate/add")
      this.getAllData();
    },
    "delegate/remove": function() {
      // console.log("delegate/remove")
      this.getAllData();
    },
    "height/update": function(res) {
      // console.log("height/update", res);
      if (res.lastestHeight > this.height) {
        this.height = res.lastestHeight;
      }

      if (res.type === 0) {
        if (this.miner.length > 0) {
          let index = this.miner.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.miner[index].lastestHeight = res.lastestHeight;
          }
        }
      } else if (res.type === 1) {
        if (this.seed.length > 0) {
          let index = this.seed.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.seed[index].lastestHeight = res.lastestHeight;
          }
        }
      } else if (res.type === 2) {
        if (this.wallet.length > 0) {
          let index = this.wallet.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.wallet[index].lastestHeight = res.lastestHeight;
          }
        }
      }

      // this.getAllData();
    },
    "node/update": function(res) {
      // console.log("node/update")
      if (res.type === 0) {
        if (this.miner.length > 0) {
          let index = this.miner.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.miner[index].blockDate = res.blockDate;
            this.miner[index].blockHeight = res.blockHeight;
            this.miner[index].blockId = res.blockId;
            this.miner[index].blockTimestamp = res.blockTimestamp;
            this.miner[index].generatorAddress = res.generatorAddress;
            this.miner[index].generatorPublicKey = res.generatorPublicKey;
          }
        }
      } else if (res.type === 1) {
        if (this.seed.length > 0) {
          let index = this.seed.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.seed[index].blockDate = res.blockDate;
            this.seed[index].blockHeight = res.blockHeight;
            this.seed[index].blockId = res.blockId;
            this.seed[index].blockTimestamp = res.blockTimestamp;
            this.seed[index].generatorAddress = res.generatorAddress;
            this.seed[index].generatorPublicKey = res.generatorPublicKey;
          }
        }
      } else if (res.type === 2) {
        if (this.wallet.length > 0) {
          let index = this.wallet.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.seed[index].blockDate = res.blockDate;
            this.seed[index].blockHeight = res.blockHeight;
            this.seed[index].blockId = res.blockId;
            this.seed[index].blockTimestamp = res.blockTimestamp;
            this.seed[index].generatorAddress = res.generatorAddress;
            this.seed[index].generatorPublicKey = res.generatorPublicKey;
          }
        }
      }
      // this.getAllData();
    },
    "delegate/update": function(res) {
      // console.log("delegate/update")
      if (res.type === 0) {
        if (this.miner.length > 0) {
          let index = this.miner.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0 && this.miner[index].delegates.length > 0) {
            let index2 = this.miner[index].delegates.findIndex(item2 => {
              return item2.publicKey === res.publicKey;
            });
            this.miner[index].delegates[index2].blockId = res.blockId;
            this.miner[index].delegates[index2].blockHeight = res.blockHeight;
            this.miner[index].delegates[index2].blockDate = res.blockDate;
            this.miner[index].delegates[index2].blockTimestamp =
              res.blockTimestamp;
          }
        }
      } else if (res.type === 1) {
        if (this.seed.length > 0) {
          let index = this.seed.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0 && this.seed[index].delegates.length > 0) {
            let index2 = this.seed[index].delegates.findIndex(item2 => {
              return item2.publicKey === res.publicKey;
            });
            this.seed[index].delegates[index2].blockId = res.blockId;
            this.seed[index].delegates[index2].blockHeight = res.blockHeight;
            this.seed[index].delegates[index2].blockDate = res.blockDate;
            this.seed[index].delegates[index2].blockTimestamp =
              res.blockTimestamp;
          }
        }
      } else if (res.type === 2) {
        if (this.wallet.length > 0) {
          let index = this.wallet.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0 && this.wallet[index].delegates.length > 0) {
            let index2 = this.wallet[index].delegates.findIndex(item2 => {
              return item2.publicKey === res.publicKey;
            });
            this.wallet[index].delegates[index2].blockId = res.blockId;
            this.wallet[index].delegates[index2].blockHeight = res.blockHeight;
            this.wallet[index].delegates[index2].blockDate = res.blockDate;
            this.wallet[index].delegates[index2].blockTimestamp =
              res.blockTimestamp;
          }
        }
      }
      // this.getAllData();
    },
    "status/update": function(res) {
      // console.log("status/update")
      if (res.type === 0) {
        if (this.miner.length > 0) {
          let index = this.miner.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.miner[index].status = res.status;
          }
        }
      } else if (res.type === 1) {
        if (this.seed.length > 0) {
          let index = this.seed.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.seed[index].status = res.status;
          }
        }
      } else if (res.type === 2) {
        if (this.wallet.length > 0) {
          let index = this.wallet.findIndex(item => {
            return item.id === res.id;
          });
          if (index >= 0) {
            this.wallet[index].status = res.status;
          }
        }
      }
      // this.getAllData();
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

    .height {
      padding-right: 50px;
      float: right;
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
