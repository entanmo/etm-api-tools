<template>
  <div class="widgets-state">
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
      name: "state",
      prompt: "请输入state..."
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
.widgets-state {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
