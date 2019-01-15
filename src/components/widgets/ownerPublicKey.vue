<template>
  <div class="widgets-ownerPublicKey">
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
      name: "ownerPublicKey",
      prompt: "请输入ownerPublicKey..."
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
.widgets-ownerPublicKey {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
