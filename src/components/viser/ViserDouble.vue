<template>
  <div class="chart-content">
    <v-chart :force-fit="true"
             :height="vdata.height"
             :data="vdata.data"
             :scale="vdata.scale"
             :padding="{top: 15, right: 50, bottom: 85, left: 50 }">
      <v-tooltip />
      <v-legend :custom="legendCustom"
                :allow-all-canceled="legendAllowAllCanceled"
                :items="legendItems"
                :on-click="legendOnClick" />
      <v-axis :data-key="vdata.axis[1].key"
              :label="{textStyle:{fill: vdata.axis[1].color}}" />
      <v-axis :data-key="vdata.axis[2].key"
              :label="{textStyle:{fill: vdata.axis[2].color}}" />
      <v-bar :position="vdata.axis[0].key+'*'+vdata.axis[1].key"
             :color="vdata.axis[1].color" />
      <v-smooth-line :position="vdata.axis[0].key+'*'+vdata.axis[2].key"
                     :color="vdata.axis[2].color"
                     :size="gemoSize" />
      <v-point shape="circle"
               :position="vdata.axis[0].key+'*'+vdata.axis[2].key"
               :color="vdata.axis[2].color2"
               :size="gemoSize" />
    </v-chart>
  </div>
</template>

<script>
export default {
  data() {
    return {
      gemoSize: 3,
      legendItems: [
        {
          value: "time",
          marker: {
            symbol: "square",
            fill: this.vdata.axis[1].color,
            radius: 5
          }
        },
        {
          value: this.vdata.axis[2].key,
          marker: {
            symbol: "hyphen",
            stroke: this.vdata.axis[2].color,
            radius: 5,
            lineWidth: 3
          }
        }
      ],
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
    vdata: Object
  }
};
</script>

<style scoped>
</style>
