<template>
  <div class="configure">
    <a-card>
      <a-table :columns="columns" :dataSource="data" :pagination="false" :loading="memberLoading">
        <template
          v-for="(col, i) in ['name', 'ip', 'port','type']"
          :slot="col"
          slot-scope="text, record"
        >
          <a-input
            :key="i"
            v-if="record.isEdit"
            style="margin: -5px 0"
            :value="text"
            :placeholder="columns[i].title"
            @change="e => handleChange(e.target.value, record.id, col)"
          />
          <span v-else-if="col === 'type'" :key="i">
            <a-tag color="green" v-if="parseInt(record.type)===0">GPU</a-tag>
            <a-tag color="cyan" v-else-if="parseInt(record.type)===1">Seed</a-tag>
            <a-tag color="purple" v-else text="Wallet">Wallet</a-tag>
          </span>
          <template v-else>{{ text }}</template>
        </template>

        <span slot="status" slot-scope="text, record" v-show="!record.isNew">
          <a-badge status="success" v-if="record.status===0" text="正常" />
          <a-badge status="warning" v-else-if="record.status===1" text="更新中" />
          <a-badge status="error" v-else text="异常" />
        </span>

        <template slot="operation" slot-scope="text, record">
          <template v-if="record.isEdit">
            <span v-if="record.isNew">
              <a @click="save(record)">添加</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="remove(record)">
                <a>删除</a>
              </a-popconfirm>
            </span>
            <span v-else>
              <a @click="save(record)">保存</a>
              <a-divider type="vertical" />
              <a @click="cancel(record.id)">取消</a>
            </span>
          </template>
          <span v-else>
            <a @click="edit(record.id)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>

        <template slot="expandedRowRender" slot-scope="record,index" v-if="record.type===0">
          <!-- 二级表格 -->
          <a-table
            class="sub-table"
            :columns="innerColumns"
            :dataSource="record.delegates"
            :pagination="false"
            size="small"
          >
            <template v-for="(col, i) in ['name', 'publicKey']" :slot="col" slot-scope="t, r">
              <a-input
                :key="i"
                v-if="r.isEdit"
                style="margin: -5px 0"
                :value="t"
                :placeholder="innerColumns[i].title"
                @change="e => inner_handleChange(e.target.value, col, r, index)"
              />
              <template v-else-if="col === 'publicKey'">{{ r.address }}</template>
              <template v-else>{{ t }}</template>
            </template>

            <template slot="operation" slot-scope="t, r">
              <template v-if="r.isEdit">
                <span v-if="r.isNew">
                  <a @click="inner_save(r, index)">添加</a>
                  <a-divider type="vertical" />
                  <a-popconfirm title="是否要删除此行？" @confirm="inner_remove(r, index)">
                    <a>删除</a>
                  </a-popconfirm>
                </span>
                <span v-else>
                  <a @click="inner_save(r, index)">保存</a>
                  <a-divider type="vertical" />
                  <a @click="inner_cancel(r, index)">取消</a>
                </span>
              </template>
              <span v-else>
                <a @click="inner_edit(r,index)">编辑</a>
                <a-divider type="vertical" />
                <a-popconfirm title="是否要删除此行？" @confirm="inner_remove(r, index)">
                  <a>删除</a>
                </a-popconfirm>
              </span>
            </template>
          </a-table>

          <a-button class="create-btn2" type="dashed" icon="plus" @click="inner_create(index)">新增受托人</a-button>
        </template>
      </a-table>

      <a-button class="create-btn" type="dashed" icon="plus" @click="create">新增节点</a-button>
    </a-card>
  </div>
</template>

<script>
import Monitor from "@/scripts/monitor.js";
let monitor = new Monitor();

const columns = [
  {
    title: "节点名称",
    dataIndex: "name",
    key: "name",
    width: "160px",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "IP",
    dataIndex: "ip",
    key: "ip",
    width: "130px",
    scopedSlots: { customRender: "ip" }
  },
  {
    title: "Port",
    dataIndex: "port",
    key: "port",
    width: "70px",
    scopedSlots: { customRender: "port" }
  },
  {
    title: "类型",
    dataIndex: "type",
    key: "type",
    width: "90px",
    scopedSlots: { customRender: "type" }
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: "8%",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "最新区块高度",
    dataIndex: "lastestHeight",
    key: "lastestHeight",
    width: "12%",
    scopedSlots: { customRender: "lastestHeight" }
  },
  {
    title: "最后出块时间",
    dataIndex: "blockTimestamp",
    key: "blockTimestamp",
    width: "18%",
    scopedSlots: { customRender: "blockTimestamp" }
  },
  { title: "操作", key: "action", scopedSlots: { customRender: "operation" } }
];
const innerColumns = [
  {
    title: "受托人名称",
    dataIndex: "name",
    key: "name",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "受托人地址 / 公钥(编辑用)",
    dataIndex: "publicKey",
    key: "publicKey",
    scopedSlots: { customRender: "publicKey" }
  },
  { title: "最后出块高度", dataIndex: "blockHeight", key: "blockHeight" },
  { title: "最后出块时间", dataIndex: "blockTimestamp", key: "blockTimestamp" },
  { title: "操作", key: "action", scopedSlots: { customRender: "operation" } }
];

export default {
  data() {
    return {
      memberLoading: false,
      columns,
      innerColumns,
      data: []
    };
  },
  components: {},
  sockets: {
    "node/add": function(res) {
      this.getAllData();
    },
    "node/remove": function(res) {
      this.getAllData();
    },
    "delegate/add": function(res) {
      this.getAllData();
    },
    "delegate/remove": function(res) {
      this.getAllData();
    },
    "node/update": function(res) {
      this.getAllData();
    },
    "delegate/update": function(res) {
      this.getAllData();
    },
    "height/update": function(res){
      if (this.data.length > 0) {
        let index = this.data.findIndex(item => {
          return item.id === res.id;
        });
        if (index >= 0) {
          this.data[index].lastestHeight = res.lastestHeight;
        }
      }
      // this.getAllData();
    },
    "status/update": function(res) {
       if (this.data.length > 0) {
        let index = this.data.findIndex(item => {
          return item.id === res.id;
        });
        if (index >= 0) {
          this.data[index].status = res.status;
        }
      }
      // this.getAllData();
    }
  },
  created() {
    this.getAllData();
  },
  methods: {
    handleChange(value, id, column) {
      const newData = [...this.data];
      const target = newData.filter(item => id === item.id)[0];
      if (target) {
        target[column] = value;
        this.data = newData;
      }
    },
    create() {
      const length = this.data.length;
      this.data.push({
        id: length === 0 ? "1" : (length + 1).toString(),
        name: "",
        ip: "",
        port: "",
        type: "",
        isEdit: true,
        isNew: true
      });
    },
    edit(id) {
      const target = this.data.filter(item => item.id === id)[0];
      target.isEdit = !target.isEdit;
    },
    save(record) {
      this.memberLoading = true;
      const { id, name, ip, port, type } = record;
      if (!ip || [0, 1, 2, "0", "1", "2"].indexOf(type) < 0) {
        this.memberLoading = false;
        this.$message.error("请填写完整节点信息。");
        return;
      }

      monitor
        .post("/api/chain", {
          name,
          ip,
          port: parseInt(port),
          type: parseInt(type)
        })
        .then(res => {
          console.log("add", res);
          if (res.success) {
            let target = this.data.filter(item => item.id === id)[0];
            target.id = res.data.id;
            target.isEdit = false;
            target.isNew = false;
            this.memberLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove(record) {
      if (record.isNew) {
        const newData = this.data.filter(item => item.id !== record.id);
        this.data = newData;
      } else {
        monitor
          .post("/api/chain/del", { id: record.id })
          .then(res => {
            if (res.success) {
              const newData = this.data.filter(item => item.id !== record.id);
              this.data = newData;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    cancel(id) {
      const target = this.data.filter(item => item.id === id)[0];
      target.isEdit = false;
    },

    inner_handleChange(value, column, record, index) {
      const newData = [...this.data[index].delegates];
      const target = newData.filter(
        item => record.publicKey === item.publicKey
      )[0];
      if (target) {
        target[column] = value;
        this.data[index].delegates = newData;
      }
    },
    inner_create(index) {
      const length = this.data[index].delegates.length;
      this.data[index].delegates.push({
        // id: length === 0 ? "1" : (length + 1).toString(),
        name: "",
        publicKey: "",
        isEdit: true,
        isNew: true
      });
    },
    inner_edit(record, index) {
      const target = this.data[index].delegates.filter(
        item => item.publicKey === record.publicKey
      )[0];
      target.isEdit = !target.isEdit;
    },
    inner_save(record, index) {
      this.memberLoading = true;
      let id = this.data[index].id;
      let { name, publicKey } = record;
      if (!name || !publicKey) {
        this.memberLoading = false;
        this.$message.error("请填写完整节点信息。");
        return;
      }

      monitor
        .post("/api/chain/delegate", {
          id,
          name,
          publicKey
        })
        .then(res => {
          console.log("add delegate", res);
          if (res.success) {
            const target = this.data[index].delegates.filter(
              item => item.publicKey === record.publicKey
            )[0];
            target.isEdit = false;
            target.isNew = false;
            this.memberLoading = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    inner_remove(record, index) {
      if (record.isNew) {
        const newData = this.data[index].delegates.filter(
          item => item.publicKey !== record.publicKey
        );
        this.data[index].delegates = newData;
      } else {
        monitor
          .post("/api/chain/delegate/del", { publicKey: record.publicKey })
          .then(res => {
            if (res.success) {
              const newData = this.data[index].delegates.filter(
                item => item.publicKey !== record.publicKey
              );
              this.data[index].delegates = newData;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    inner_cancel(record, index) {
      const target = this.data[index].delegates.filter(
        item => item.publicKey === record.publicKey
      )[0];
      target.isEdit = false;
    },

    getAllData() {
      monitor
        .get("/api/chain/all", { withDelegates: true })
        .then(res => {
          // console.log(res);
          if (res.success) {
            // this.data = res.data;
            let dataArr = [];
            for (let i = 0; i < res.data.length; i++) {
              let miner = res.data[i];
              let delegatesArr = [];
              for (let j = 0; j < miner.delegates.length; j++) {
                let delegate = miner.delegates[j];
                delegatesArr.push({
                  // id: delegate.id,
                  name: delegate.name,
                  address: delegate.address,
                  publicKey: delegate.publicKey,
                  blockHeight: delegate.blockHeight,
                  blockTimestamp: delegate.blockTimestamp,
                  isEdit: false,
                  isNew: false
                });
              }

              dataArr.push({
                id: miner.id,
                name: miner.name,
                ip: miner.ip,
                port: miner.port,
                type: miner.type,
                status: miner.status,
                lastestHeight: miner.lastestHeight,
                blockTimestamp: miner.blockTimestamp,
                delegates: delegatesArr,
                isEdit: false,
                isNew: false
              });
            }
            this.data = dataArr;
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
.configure {
  .create-btn {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }
  .create-btn2 {
    width: 100%;
    margin-top: 26px;
    margin-bottom: 8px;
  }
  .sub-table {
    margin-top: -10px;
  }
}
</style>
