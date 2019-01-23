<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line :position="position" shape="hv"/>
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    data: Array,
    height: Number,
    scale: Array,
    position: String
  }
};
</script>

<style scoped>
</style>
