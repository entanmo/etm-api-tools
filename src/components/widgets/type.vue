<template>
  <div class="widgets-type">
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
      name: "type",
      prompt: "请输入交易类型..."
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
.widgets-type {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
