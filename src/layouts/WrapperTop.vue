<template>
  <div class="wrapper-top">
    <div class="wrapper-top-api">
      <a-tooltip title="查看文档"
                 placement="bottomLeft">
        <a-button class="api-btn"
                  shape="circle"
                  icon="file-unknown"
                  @click="openApi"></a-button>
      </a-tooltip>
      <a-drawer :visible="visible"
                width="640px"
                :title="name"
                @close="onClose">
        <div class="api-desc">
          <pre> 接口地址：{{uri}} <br /> 请求方式：{{method}} <br /> 接口备注：{{remark}}</pre>
        </div>
        <div class="api-req">
          <a-table v-if="reqData.length>0"
                   :columns="req_columns"
                   :dataSource="reqData"
                   size="small"
                   bordered
                   :pagination="{hideOnSinglePage:true}">
            <template slot="title"
                      slot-scope="currentPageData">
              <strong>请求参数说明：</strong>
            </template>
          </a-table>
          <div v-else><strong>请求参数说明：无</strong></div>
        </div>
        <div class="api-res">
          <a-table :columns="res_columns"
                   :dataSource="resData"
                   size="small"
                   bordered
                   :pagination="{hideOnSinglePage:true}">
            <template slot="title"
                      slot-scope="currentPageData">
              <strong>返回参数说明：</strong>
            </template>
          </a-table>
        </div>
      </a-drawer>
    </div>
    <a-button type="primary"
              class="top-btn"
              @click="submit">发送</a-button>
  </div>
</template>

<script>
import api from "@/assets/APIData.js";
import Server from "@/scripts/server.js";

const req_columns = [
  {
    title: "参数名",
    dataIndex: "name",
    width: 130
  },
  {
    title: "类型",
    dataIndex: "type",
    width: 70
  },
  {
    title: "是否必须",
    dataIndex: "isRequired",
    width: 80
  },
  {
    title: "说明",
    dataIndex: "desc"
  }
];
const res_columns = [
  {
    title: "参数名",
    dataIndex: "name",
    width: 130
  },
  {
    title: "类型",
    dataIndex: "type",
    width: 150
  },
  {
    title: "说明",
    dataIndex: "desc"
  }
];

export default {
  data() {
    return {
      visible: false,
      name: "",
      uri: "",
      method: "",
      remark: "",
      req_columns,
      reqData: [],
      res_columns,
      resData: []
    };
  },
  methods: {
    openApi() {
      let paths = this.$route.path.split("/");
      if (paths[1] != "api") {
        return;
      }
      this.visible = true;

      let modules = paths[2];
      let item = paths[3];
      let apiData = api[modules][item];

      this.name = apiData.name;
      this.uri = apiData.uri;
      this.method = apiData.method;
      this.remark = apiData.remark;
      this.reqData = apiData.req;
      this.resData = apiData.res;

      for (let i = 0; i < apiData.req.length; i++) {
        if (apiData.req[i].isRequired) {
          this.reqData[i].isRequired = "是";
        } else {
          this.reqData[i].isRequired = "否";
        }
      }
    },
    onClose() {
      this.visible = false;
    },
    submit() {
      let paths = this.$route.path.split("/");
      if (paths[1] != "api") {
        return;
      }
      let modules = paths[2];
      let item = paths[3];
      let apiData = api[modules][item];

      let name = apiData.name;
      let uri = apiData.uri;
      let method = apiData.method;

      let msg = this.$store.state.api[modules][item];
      let server = new Server();
      console.log(modules, item, uri, msg, this.$store.state.api);
      if (method === "get") {
        server
          .get(uri, msg)
          .then(res => {
            let message = name + ":" + JSON.stringify(res, null, 2);
            // console.log("returnMsg", message);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = name + ":" + JSON.stringify(err, null, 2);
              // console.log("returnMsg", message);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      } else if (method === "put") {
        server
          .put(uri, msg)
          .then(res => {
            let message = name + ":" + JSON.stringify(res, null, 2);
            // console.log("returnMsg", message);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = name + ":" + JSON.stringify(err, null, 2);
              // console.log("returnMsg", message);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      } else if (method === "post") {
        server
          .post(uri, msg)
          .then(res => {
            let message = name + ":" + JSON.stringify(res, null, 2);
            // console.log("returnMsg", message);
            this.$store.state.api.returnMsg =
              message + "\r\n" + this.$store.state.api.returnMsg;
          })
          .then(err => {
            if (err) {
              let message = name + ":" + JSON.stringify(err, null, 2);
              // console.log("returnMsg", message);
              this.$store.state.api.returnMsg =
                message + "\r\n" + this.$store.state.api.returnMsg;
            }
          });
      }
    }
  }
};
</script>

<style lang="less" scoped>
.wrapper-top {
  display: flex;
  justify-content: space-between;
}
.api-desc {
  pre {
    padding: 10px 0;
    background: #f2f4f5;
  }
}
.api-req {
  padding: 10px 0;
}
.api-res {
  padding: 10px 0;
}
</style>
