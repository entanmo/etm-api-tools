<template>
  <div class="widgets-secondsecret">
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
      name: "secondSecret",
      prompt: "请输入用户二级密码..."
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
.widgets-secondsecret {
  width: 100%;
  //max-width: 720px;
  padding: 10px 0;
}
</style>
