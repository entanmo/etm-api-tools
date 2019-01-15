<template>
  <div class="widgets-multisigAccountPublicKey">
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
      name: "multisigAccountPublicKey",
      prompt: "请输入用户多重签名公钥..."
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
.widgets-multisigAccountPublicKey {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
