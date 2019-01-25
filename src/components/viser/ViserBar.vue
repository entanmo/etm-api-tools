<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="vdata.height"
             :data="vdata.data"
             :scale="vdata.scale"
             :padding="{top: 15, right: 50, bottom: 85, left: 50 }">
      <v-tooltip />
      <v-axis />
      <v-bar :position="vdata.axis[0].key+'*'+vdata.axis[1].key" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    vdata: Object
  }
};
</script>

<style scoped>
</style>
