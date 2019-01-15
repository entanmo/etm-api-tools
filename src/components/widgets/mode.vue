<template>
  <div class="widgets-mode">
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
      name: "mode",
      prompt: "请输入查询类别 [0,1]..."
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
.widgets-mode {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
