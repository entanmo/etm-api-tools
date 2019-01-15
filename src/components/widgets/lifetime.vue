<template>
  <div class="widgets-lifetime">
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
      name: "lifetime",
      prompt: "请输入最大挂起时间..."
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
.widgets-lifetime {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
