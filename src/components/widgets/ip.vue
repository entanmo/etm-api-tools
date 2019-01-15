<template>
  <div class="widgets-ip">
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
      name: "ip",
      prompt: "请输入ip..."
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
.widgets-ip {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
