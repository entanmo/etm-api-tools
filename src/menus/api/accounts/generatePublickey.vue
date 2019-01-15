<template>
  <div class="wrapper-content">
    <secret :modules="modules" 
            :item="item" />
  </div>
</template>

<script>
import secret from "@/components/widgets/secret.vue";
export default {
  data() {
    return {
      modules: "accounts",
      item: "generatePublickey"
    };
  },
  components: {
    secret
  },
  methods: {}
};
</script>

<style lang="less" scoped>
</style>
