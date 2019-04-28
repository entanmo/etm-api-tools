<template>
  <div class="widgets-transactions">
    <a-textarea :placeholder="prompt"
                :rows="8"
                @change="onChange"
                v-model="value" />
    <a-divider />
    <div class="trs-buttons">
      <a-button type="primary"
                class="btn"
                @click="clearTrs"
                icon="delete">清空</a-button>
      <a-button type="primary"
                class="btn"
                @click="addTrs"
                icon="plus-circle">添加</a-button>
    </div>
    <a-tabs :defaultActiveKey="selectTab"
            @change="changeTab">
      <a-tab-pane tab="转账"
                  :key="tabkeys[0]">
        <transfer />
      </a-tab-pane>
      <a-tab-pane tab="代理"
                  :key="tabkeys[1]">
        <delegate />
      </a-tab-pane>
      <a-tab-pane tab="取消代理"
                  :key="tabkeys[2]">
        <undelegate />
      </a-tab-pane>
      <a-tab-pane tab="锁仓"
                  :key="tabkeys[3]"
                  forceRender>
        <lock />
      </a-tab-pane>
      <a-tab-pane tab="解锁仓"
                  :key="tabkeys[4]"
                  forceRender>
        <unlock />
      </a-tab-pane>
      <a-tab-pane tab="投票"
                  :key="tabkeys[5]">
        <vote />
      </a-tab-pane>
      <a-tab-pane tab="冻结"
                  :key="tabkeys[6]">
        <delay />
      </a-tab-pane>
      <a-tab-pane tab="二级密码"
                  :key="tabkeys[7]">
        <second />
      </a-tab-pane>
      <a-tab-pane tab="多重签名"
                  disabled
                  :key="tabkeys[8]">
        <multi />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import deepcopy from "deepcopy";
import etmjslib from "etm-js-lib";

import transfer from "@/menus/api/transactions/createTransaction.vue";
import delegate from "@/menus/api/delegates/addDelegate.vue";
import undelegate from "@/menus/api/delegates/unDelegate.vue";
import lock from "@/menus/api/lockvote/createLock.vue";
import unlock from "@/menus/api/lockvote/removeLock.vue";
import vote from "@/menus/api/accounts/vote.vue";
import delay from "@/menus/api/transactions/delay.vue";
import second from "@/menus/api/signatures/setSignature.vue";
import multi from "@/menus/api/multisignatures/setMulti.vue";

const tabkeys = [
  "transactions_createTransaction",
  "delegates_addDelegate",
  "delegates_unDelegate",
  "lockvote_createLock",
  "lockvote_removeLock",
  "accounts_vote",
  "transactions_delay",
  "signatures_setSignature",
  "multisignatures_setMulti"
];
export default {
  data() {
    return {
      name: "transactions",
      prompt: "请输入transactions,【包含在数组中，如：[{...},{...}]】",
      value: "",
      trs: [],
      tabkeys: tabkeys,
      selectTab: tabkeys[0]
    };
  },
  components: {
    transfer,
    delegate,
    undelegate,
    lock,
    unlock,
    vote,
    delay,
    second,
    multi
  },
  props: {
    modules: String,
    item: String
  },
  methods: {
    onChange(e) {
      if (e.type && e.type === "change") {
        this.setStoreValue(JSON.parse(this.value.replace(/'/g, `"`) || null));
      }
    },
    setStoreValue(val) {
      if (this.$store.state.api[this.modules]) {
        if (!this.$store.state.api[this.modules][this.item]) {
          this.$store.state.api[this.modules][this.item] = {};
        }
      } else {
        this.$store.state.api[this.modules] = {};
        this.$store.state.api[this.modules][this.item] = {};
      }

      if (!val) {
        delete this.$store.state.api[this.modules][this.item][this.name];
      } else {
        console.log("input:", this.modules, this.item, this.name, val);
        this.$store.state.api[this.modules][this.item][this.name] = val;
      }
    },
    changeTab(key) {
      this.selectTab = key;
    },
    addTrs() {
      let tabs = this.selectTab.split("_");
      if (!tabs || tabs.length !== 2) {
        console.error("tab key error");
        return;
      }
      let modules = tabs[0];
      let name = tabs[1];
      let trData = deepcopy(this.$store.state.signed[modules][name]);

      let tr = this.generateTr(this.selectTab, trData);
      this.trs.push(tr);
      this.value = JSON.stringify(this.trs);

      this.setStoreValue(JSON.parse(this.value.replace(/'/g, `"`) || null));
    },
    clearTrs() {
      this.value = "";
      this.trs = [];
    },
    generateTr(type, data) {
      let hash = etmjslib.crypto
        .createHash("sha256")
        .update(data.secret, "utf8")
        .digest();
      let keypair = etmjslib.utils.ed.MakeKeypair(hash);
      data.sender = {
        publicKey: keypair.publicKey.toString("hex")
      };
      data.keypair = keypair;

      if (data.secondSecret) {
        let secondHash = etmjslib.crypto
          .createHash("sha256")
          .update(data.secondSecret, "utf8")
          .digest();
        let secondKeypair = etmjslib.utils.ed.MakeKeypair(secondHash);
        data.secondKeypair = secondKeypair;
      }

      let tr;
      try {
        switch (type) {
          case "transactions_createTransaction":
            data.type = 0;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "delegates_addDelegate":
            data.type = 2;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "delegates_unDelegate":
            data.type = 120;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "lockvote_createLock":
            data.type = 101;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "lockvote_removeLock":
            data.type = 102;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "accounts_vote":
            data.type = 3;
            data.fee = 10000000;
            data.votes = data.delegates;
            tr = etmjslib.transaction.create(data);
            break;
          case "transactions_delay":
            data.type = 110;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
          case "signatures_setSignature":
            data.type = 1;
            data.fee = 500000000;

            console.log("11111111111", data);
            tr = etmjslib.transaction.create(data);
            break;
          case "multisignatures_setMulti":
            data.type = 4;
            data.fee = 10000000;
            tr = etmjslib.transaction.create(data);
            break;
        }
      } catch (err) {
        console.log(err);
      }

      return tr;
    }
  }
};
</script>

<style lang="less" scoped>
.widgets-transactions {
  width: 100%;
  padding: 10px 0;

  .trs-buttons {
    display: flex;
    justify-content: flex-end;

    .btn {
      margin-left: 20px;
    }
  }
}
</style>
