<template>
  <div class="widgets-orderByAmount">
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
      name: "orderByAmount",
      prompt: "请输入锁仓量排序规则..."
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
.widgets-orderByAmount {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
