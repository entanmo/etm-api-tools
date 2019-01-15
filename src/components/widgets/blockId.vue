<template>
  <div class="widgets-blockId">
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
      name: "blockId",
      prompt: "请输入blockId..."
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
.widgets-blockId {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
