<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale">
      <v-tooltip :showTitle="false"
                 :dataKey="position" />
      <v-axis />
      <v-legend dataKey="height" />
      <v-pie position="trs"
             color="height"
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
      // data: [
      //   { height: "123456", trs: 40 },
      //   { height: "123457", trs: 21 },
      //   { height: "123458", trs: 17 },
      //   { height: "123459", trs: 13 },
      //   { height: "123460", trs: 90 }
      // ],
      // scale: [
      //   {
      //     dataKey: "trs",
      //     min: 0
      //   }
      // ],
      // height: 300,
      pieStyle: {
        stroke: "#fff",
        lineWidth: 1
      },
      labelConfig: [
        "trs",
        {
          formatter: (val, item) => {
            return "height=" + item.point.height + ": " + val;
          }
        }
      ]
    };
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
