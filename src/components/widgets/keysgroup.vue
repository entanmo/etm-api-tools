<template>
  <div class="widgets-keysgroup">
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
      name: "keysgroup",
      prompt: "请输入其它签名人的公钥数组..."
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
.widgets-keysgroup {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
