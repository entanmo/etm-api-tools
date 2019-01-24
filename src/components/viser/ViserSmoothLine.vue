<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale"
             :padding="['auto',50,'auto',50]">
      <v-tooltip />
      <v-axis title />
      <v-smooth-line :position="position"
                     color="blue"
                     shape="smooth" />
      <v-point :position="position"
               color="green"
               shape="circle" />
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
