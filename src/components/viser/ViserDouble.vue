<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="height"
             :data="data"
             :scale="scale"
             :padding="['auto',50,'auto',50]">
      <v-tooltip />
      <v-legend :custom="legendCustom"
                :allow-all-canceled="legendAllowAllCanceled"
                :items="legendItems"
                :on-click="legendOnClick" />
      <v-axis :data-key="keys[1]"
              :label="{textStyle:{fill: legendItems[0].marker.fill}}" />
      <v-axis :data-key="keys[2]"
              :label="{textStyle:{fill: legendItems[1].marker.stroke}}" />
      <v-bar :position="keys[0]+'*'+keys[1]"
             :color="legendItems[0].marker.fill" />
      <v-smooth-line :position="keys[0]+'*'+keys[2]"
                     :color="legendItems[1].marker.stroke"
                     :size="gemoSize" />
      <v-point shape="circle"
               :position="keys[0]+'*'+keys[2]"
               :color="legendItems[1].marker.stroke"
               :size="gemoSize" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      axisLabelLeft: {
        textStyle: {
          fill: "#3182bd"
        }
      },
      axisLabel: {
        textStyle: {
          fill: "#fdae6b"
        }
      },
      gemoSize: 3,
      legendCustom: true,
      legendAllowAllCanceled: true,
      legendOnClick: (ev, chart) => {
        const item = ev.item;
        const value = item.value;
        const checked = ev.checked;
        const geoms = chart.getAllGeoms();
        for (let i = 0; i < geoms.length; i++) {
          const geom = geoms[i];
          if (geom.getYScale().field === value) {
            if (checked) {
              geom.show();
            } else {
              geom.hide();
            }
          }
        }
      }
    };
  },
  props: {
    data: Array,
    height: Number,
    scale: Array,
    legendItems: Array,
    keys: Array
  }
};
</script>

<style scoped>
</style>
