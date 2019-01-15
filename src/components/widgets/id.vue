<template>
  <div class="widgets-id">
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
      name: "id",
      prompt: "请输入id..."
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
.widgets-id {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
