<template>
  <div class="widgets-args">
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
      name: "args",
      prompt: "请输入args，格式如：['123',100,true]"
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
.widgets-args {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
