<template>
  <div class="widgets-delegates">
    <zinput :modules="modules"
            :item="item"
            :name="name"
            :prompt="prompt" />
  </div>
</template>

<script>
import zinput from "./z_input.vue";

export default {
  data() {
    return {
      name: "delegates",
      prompt: "请输入所投矿机的公钥，格式如：['+xxx','-yyy']"
    };
  },
  components: {
    zinput
  },
  props: {
    modules: String,
    item: String
  }
};
</script>

<style lang="less" scoped>
.widgets-delegates {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
