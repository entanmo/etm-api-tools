<template>
  <div class="widgets-min">
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
      name: "min",
      prompt: "请输入需要签名的最少个数..."
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
.widgets-min {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
