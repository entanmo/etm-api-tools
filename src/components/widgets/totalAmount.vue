<template>
  <div class="widgets-totalAmount">
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
      name: "totalAmount",
      prompt: "请输入totalAmount..."
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
.widgets-totalAmount {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
