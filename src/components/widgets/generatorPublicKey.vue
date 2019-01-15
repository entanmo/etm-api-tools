<template>
  <div class="widgets-generatorPublicKey">
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
      name: "generatorPublicKey",
      prompt: "请输入generatorPublicKey..."
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
.widgets-generatorPublicKey {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
