<template>
  <!-- <a-input :placeholder="prompt"
           @change="onChange"
           v-model="value"
           ref="valueInput">
    <div slot="addonBefore"
         style="width: 150px; text-align: left;">{{name}}</div> -->
  <a-input :addonBefore="name"
           :placeholder="prompt"
           @change="onChange"
           v-model="value"
           ref="valueInput">
    <a-icon v-show="value"
            slot="suffix"
            type="close-circle"
            @click="emitEmpty" />
  </a-input>
</template>

<script>
// 需要转换为数字的输入类型
const integerType = [
  "amount",
  "limit",
  "offset",
  "height",
  "fee",
  "lifetime",
  "min",
  "mode",
  "orderByAmount",
  "orderByHeight",
  "reward",
  "state",
  "totalAmount",
  "totalFee",
  "type"
];
const arrayType = [
  "args",
  "delegates",
  "keysgroup"
]

export default {
  data() {
    return {
      value: ""
    };
  },
  props: {
    modules: String,
    item: String,
    name: String,
    prompt: String
  },
  mounted() {
    this.setStoreValue("");
  },
  methods: {
    emitEmpty() {
      this.$refs.valueInput.focus();
      this.value = "";
      this.setStoreValue(this.value);
    },
    onChange(e) {
      if (e.type && e.type === "change") {
        this.setStoreValue(this.value);
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
        if (integerType.indexOf(this.name) >= 0) {
          val = parseInt(val);
        }
        if (arrayType.indexOf(this.name) >= 0) {
          try {
            val = JSON.parse(val);
          } catch (e) {
            console.error(e.toString());
          }
        }
        console.log("input:",this.modules,this.item,this.name,val)
        this.$store.state.api[this.modules][this.item][this.name] = val;
      }
    }
  }
};
</script>

<style lang="less" scoped>
</style>
