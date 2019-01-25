<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="vdata.height"
             :data="vdata.data"
             :scale="vdata.scale"
             :padding="{top: 15, right: 50, bottom: 85, left: 50 }">
      <v-tooltip :showTitle="false"
                 :dataKey="vdata.axis[0].key+'*'+vdata.axis[1].key" />
      <v-axis />
      <v-legend dataKey="type" />
      <v-pie :position="vdata.axis[1].key"
             :color="vdata.axis[0].key"
             :v-style="pieStyle"
             :label="labelConfig" />
      <v-coord type="theta" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        this.vdata.axis[1].key,
        {
          formatter: (val, item) => {
            return (
              this.vdata.axis[0].key +
              "=" +
              item.point[this.vdata.axis[0].key] +
              ": " +
              val
            );
          }
        }
      ]
    };
  },
  props: {
    vdata: Object
  }
};
</script>

<style scoped>
</style>
