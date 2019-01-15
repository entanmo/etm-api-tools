<template>
  <div class="widgets-publickey">
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
      name: "publicKey",
      prompt: "请输入用户publicKey..."
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
.widgets-publickey {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
