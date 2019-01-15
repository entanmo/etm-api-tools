<template>
  <div class="widgets-version">
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
      name: "version",
      prompt: "请输入版本号..."
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
.widgets-version {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
