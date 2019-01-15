<template>
  <div class="widgets-fee">
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
      name: "fee",
      prompt: "请输入手续费..."
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
.widgets-fee {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
