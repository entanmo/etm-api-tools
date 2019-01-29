<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="vdata.height"
             :data="vdata.data"
             :scale="vdata.scale"
             :padding="{top: 15, right: 50, bottom: 85, left: 50 }"
             :onClick="vdata.onClick">
      <v-tooltip />
      <v-axis />
      <v-legend />
      <v-stack-bar :position="vdata.axis[0].key+'*'+vdata.axis[1].key"
                   :color="vdata.axis[2].key"
                   :vStyle="stackBarStyle" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      stackBarStyle: {
        stroke: "#fff",
        lineWidth: 1
      }
    };
  },
  props: {
    vdata: Object
  }
};
</script>

<style scoped>
</style>
