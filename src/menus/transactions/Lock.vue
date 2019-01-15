<template>
  <div class="tr-lock">
    <div class="tr-lock-sender">
      <div class="sender-title">发送者：</div>
      <a-input class="sender-input"
               placeholder="请输入发送者secret"
               v-model="secret" />
    </div>
    <div class="tr-lock-amount">
      <div class="amount-title">锁定金额：</div>
      <a-input class="amount-input"
               placeholder="请输入锁定金额"
               v-model="lockamount" />
      <a-button class="amount-button"
                type="primary"
                @click="lock">锁定</a-button>
    </div>
    <div class="tr-lock-unlocks">
      <div class="unlocks-title">锁仓列表：</div>
      <div class="unlocks-content">
        <a-table class="unlocks-table"
                 :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
                 :pagination="{defaultPageSize:3,hideOnSinglePage:true}"
                 :columns="columns"
                 :dataSource="data"
                 bordered />
        <div class="unlocks-button">
          <a-button class="unlocks-btn-refresh"
                    type="primary"
                    @click="getlocks">刷新列表</a-button>
          <a-button class="unlocks-btn-unlock"
                    type="primary"
                    @click="unlock">解锁</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Transaction from "../../scripts/transactions/transaction.js";
import Utils from "../../scripts/utils/utils.js";

const columns = [
  {
    title: "锁仓时间",
    dataIndex: "time",
    width: 100
  },
  {
    title: "锁定金额(ETM)",
    dataIndex: "amount",
    width: 140
  },
  {
    title: "交易Id",
    dataIndex: "id"
  }
];

const data = [];

export default {
  data() {
    return {
      secret: "",
      lockamount: "",
      data,
      columns,
      selectedRowKeys: []
    };
  },
  components: {},
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0;
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log("selectedRowKeys changed: ", selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    lock() {
      if (!this.secret || !this.lockamount) {
        this.$message.error("请输入完整锁仓信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let lockamount = Utils.processMoney(this.lockamount).toString();

      let tr = new Transaction();
      let data = {
        secret,
        args: [lockamount]
      };

      tr.lock(data)
        .then(res => {
          let message = "锁仓操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
        })
        .then(err => {
          if (err) {
            let message = "锁仓异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    },
    unlock() {
      if (!this.secret || this.selectedRowKeys.length < 1) {
        this.$message.error("请输入完整解锁仓信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let unlocks = [];
      for (let i = 0; i < this.selectedRowKeys.length; i++) {
        let index = this.selectedRowKeys[i];
        unlocks.push(this.data[index].id);
      }

      let tr = new Transaction();
      let data = {
        secret,
        args: unlocks
      };

      tr.unlock(data)
        .then(res => {
          let message = "解锁仓操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
        })
        .then(err => {
          if (err) {
            let message = "解锁仓异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    },
    getlocks() {
      if (!this.secret) {
        this.$message.error("请输入完整获取锁仓列表信息！");
        return;
      }

      let secret = Utils.processString(this.secret);
      let address = Utils.getAddressBySecret(secret);
      console.log(address);
      let tr = new Transaction();
      tr.getlocks({ address, state: 1 })
        .then(res => {
          let message = "刷新锁仓列表操作：" + JSON.stringify(res, null, 2);
          this.$store.state.api.returnMsg =
            message + "\r\n" + this.$store.state.api.returnMsg;
          if (res.success) {
            let trs = res.trs;
            this.data = [];
            this.selectedRowKeys = [];
            for (let i = 0; i < trs.length; i++) {
              this.data.push({
                key: i,
                time: Utils.convertTimeToLocal(trs[i].timestamp),
                amount: Utils.convertMoney(trs[i].asset.lockAmount),
                id: trs[i].id
              });
            }
          }
        })
        .then(err => {
          if (err) {
            let message = "刷新锁仓列表异常：" + JSON.stringify(err, null, 2);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
@btnWidth: 100px;

.tr-lock {
  display: flex;
  flex-direction: column;

  .tr-lock-sender {
    padding-bottom: 20px;

    .sender-button-left {
      width: 100px;
      margin: 10px 0;
      float: left;
    }
    .sender-button-right {
      width: 100px;
      margin: 10px 0;
      float: right;
    }
  }

  .tr-lock-amount {
    padding-bottom: 20px;

    .amount-input {
      width: calc(95% - @btnWidth);
    }
    .amount-button {
      width: @btnWidth;
      float: right;
    }
  }

  .tr-lock-unlocks {
    padding-bottom: 20px;

    .unlocks-content {
      display: flex;
      justify-content: space-between;

      .unlocks-table {
        width: calc(95% - @btnWidth);
      }
      .unlocks-button {
        width: @btnWidth;
        display: flex;
        flex-direction: column;
        justify-content: space-around;

        .unlocks-btn-refresh {
          width: @btnWidth;
        }

        .unlocks-btn-unlock {
          width: @btnWidth;
        }
      }
    }
  }
}
</style>
