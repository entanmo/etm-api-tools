<template>
  <div class="footer">
    ©2018 En-Tan-Mo. All Rights Reserved.
    <!-- <Layout :resize="true"
            :edit="true"
            :splits="tree"> -->
      <!-- <div class="view1"></div> -->
      <!-- <Pane title="pane"></Pane>
      <div class="view2"></div> -->
      <!-- <div class="view3"></div> -->
    <!-- </Layout> -->
  </div>
</template>

<script>
// import { Layout, Pane } from "vue-split-layout";
export default {
  // components: { Layout, Pane },
  // data() {
  //   return {
  //     tree: {
  //       dir: "vertical", // Left | Right
  //       // Other split
  //       first:0,
  //       // first: {
  //       //   dir: "vertical",
  //       //   first:  0, // these numbers represents the views slot ID
  //       //   second: 1
  //       // },
  //       second: 1
  //     }
  //   };
  // }
};
</script>

<style scoped>
.footer {
  height: 3rem;
  line-height: 3rem;
  background: gray;
  width: 100%;
  position: absolute;
  z-index: 200;
  bottom: 0;
  text-align: center;
}
</style>
