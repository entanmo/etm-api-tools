<template>
  <div class="widgets-orderby">
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
      name: "orderBy",
      prompt: "请输入排序字段..."
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
.widgets-orderby {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
