<template>
  <div class="chart-content">
    <div class="chart-title">
      <h4>对应高度出块时间：</h4>
    </div>
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale">
      <v-tooltip />
      <v-axis />
      <v-bar position="height*avgTime" />
    </v-chart>
  </div>
</template>

<script>
const scale = [
  {
    dataKey: "avgTime",
    tickInterval: 3
  }
];
const data = [
  // { height: "670406", avgTime: 0 },
  // { height: "670405", avgTime: 3.6 },
  // { height: "670404", avgTime: 3.27 },
  // { height: "670403", avgTime: 3.22 },
  // { height: "670402", avgTime: 3.27 },
  // { height: "670401", avgTime: 0 },
  // { height: "670400", avgTime: 3.8 },
  // { height: "670399", avgTime: 3.8 },
  // { height: "670398", avgTime: 3.5 },
  // { height: "670397", avgTime: 3 }
];
export default {
  data() {
    return {
      scale,
      // data,
      height: 250
    };
  },
  props: {
    data: Array
  }
};
</script>

<style scoped>
.chart-title {
  padding: 10px;
}
</style>
