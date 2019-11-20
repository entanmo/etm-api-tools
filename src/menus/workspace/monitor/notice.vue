<template>
  <div class="notice">
    <a-card>
      <a-switch
        :checked="isRun"
        @change="changeRun"
        checkedChildren="开启通知"
        unCheckedChildren="关闭通知"
      />
      <a-table :columns="columns" :dataSource="data" :pagination="false" :loading="memberLoading">
        <template
          v-for="(col, i) in ['name', 'mail', 'phone','status']"
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
          <span v-else-if="col === 'status'" :key="i">
            <a-switch :defaultChecked="1===parseInt(record.status)" @change="onChange" />
          </span>
          <template v-else>{{ text }}</template>
        </template>

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
            <!-- <a @click="edit(record.id)">编辑</a> -->
            <!-- <a-divider type="vertical" /> -->
            <a-popconfirm title="是否要删除此行？" @confirm="remove(record)">
              <a>删除</a>
            </a-popconfirm>
          </span>
        </template>
      </a-table>

      <a-button class="create-btn" type="dashed" icon="plus" @click="create">新增接收者</a-button>
    </a-card>
  </div>
</template>

<script>
import Monitor from "@/scripts/monitor.js";
let monitor = new Monitor();

const columns = [
  {
    title: "接收者",
    dataIndex: "name",
    key: "name",
    width: "20%",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "邮箱",
    dataIndex: "mail",
    key: "mail",
    width: "25%",
    scopedSlots: { customRender: "mail" }
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone",
    width: "15%",
    scopedSlots: { customRender: "phone" }
  },
  // {
  //   title: "状态",
  //   dataIndex: "status",
  //   key: "status",
  //   width: "15%",
  //   scopedSlots: { customRender: "status" }
  // },
  { title: "操作", key: "action", scopedSlots: { customRender: "operation" } }
];

export default {
  data() {
    return {
      memberLoading: false,
      columns,
      data: [],
      isRun: true
    };
  },
  components: {},
  sockets: {},
  created() {
    this.checkRunning();
    this.getAllData();
  },
  methods: {
    changeRun(checked) {
      // console.log("changeRun", checked);
      this.isRun = checked;
      if (checked) {
        monitor
          .get("/api/chain/mail/start")
          .then(res => {
            console.log("start notice", res);
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        monitor
          .get("/api/chain/mail/stop")
          .then(res => {
            console.log("stop notice", res);
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    onChange(checked) {},
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
        mail: "",
        phone: "",
        status: "",
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
      const { id, name, mail, phone, status } = record;
      if (!name || !mail || [0, 1, "0", "1"].indexOf(status) < 0) {
        this.memberLoading = false;
        this.$message.error("请填写完整节点信息。");
        return;
      }

      monitor
        .post("/api/chain/mail/add", {
          name,
          address: mail,
          phone
        })
        .then(res => {
          // console.log("add", res);
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
          .post("/api/chain/mail/del", { id: record.id })
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

    checkRunning() {
      monitor
        .get("/api/chain/mail/isrunning")
        .then(res => {
          // console.log("checkRunning", res);
          if (res.success) {
            this.isRun = res.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    getAllData() {
      monitor
        .get("/api/chain/mail/all")
        .then(res => {
          // console.log("getAllData", res);
          if (res.success) {
            let dataArr = [];
            for (let i = 0; i < res.data.length; i++) {
              let reciver = res.data[i];
              dataArr.push({
                id: reciver.id,
                name: reciver.name,
                mail: reciver.address,
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
.notice {
  .create-btn {
    width: 100%;
    margin-top: 16px;
    margin-bottom: 8px;
  }
}
</style>
