<template>
  <div class="chart-content">
    <v-chart :force-fit="false"
             :height="vdata.height"
             :width="vdata.width"
             :data="vdata.data"
             :scale="vdata.scale"
             :padding="{top: 15, right: 50, bottom: 85, left: 50 }">
      <v-tooltip :showTitle="false" />
      <v-coord type="polar"
               :innerRadius="0.4" />
      <v-sector :position="vdata.axis[0].key+'*'+vdata.axis[1].key"
                :color="vdata.axis[0].key"
                :vStyle="sectorStyle" />
      <v-legend :dataKey="vdata.axis[0].key" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sectorStyle: {
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
