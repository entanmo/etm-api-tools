<template>
  <div class="header">
    <h1 class="header-title">En-Tan-Mo 集成工具</h1>
    <div class="header-button">
      <setting />
    </div>
  </div>
</template>

<script>
import setting from "./0_public/Setting.vue";

export default {
  components: {
    setting
  }
};
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  height: 4rem;
  line-height: 4rem;
  background: deepskyblue;
  position: absolute;
  z-index: 5;
  top: 0;
  display: flex;

  .header-title {
    display: block;
    width: calc(95% - 50px);
    text-align: center;
  }
  .header-button {
    margin: auto;
  }
}
</style>
