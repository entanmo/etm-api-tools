<template>
  <div class="widgets-os">
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
      name: "os",
      prompt: "请输入内核版本..."
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
.widgets-os {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
