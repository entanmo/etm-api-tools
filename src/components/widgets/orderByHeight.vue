<template>
  <div class="widgets-orderByHeight">
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
      name: "orderByHeight",
      prompt: "请输入高度排序规则..."
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
.widgets-orderByHeight {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
