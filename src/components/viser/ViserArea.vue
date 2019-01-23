<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-line :position="position" :size="2" />
      <v-area :position="position" />
    </v-chart>
  </div>
  <!-- <v-chart :forceFit="true" :height="height" :data="data" :scale="scale">
    <v-tooltip />
    <v-axis />
    <v-line position="year*value" :size="2" />
    <v-area position="year*value" />
  </v-chart> -->
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
