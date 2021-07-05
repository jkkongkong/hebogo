<!--
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-07-05 09:18:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\App.vue
-->
<template>
  <div id="app" ref="app" :style="{ height: pageHeight }">
    <router-view :is-in-frame="isInFrame" />
  </div>
</template>
<script lang="ts">
import Vue from "vue";
export default Vue.extend({
  name: "App",
  data() {
    return {
      test: "",
      pageHeight: "100%",
      isInFrame: false,
    };
  },
  created() {
    this.$store.dispatch("common/setUserInfo");
  },
  mounted() {
    this.initPageHeight();
  },
  methods: {
    /**
     * @description: 小应用放到一体化平台上会把外层iframe撑开，这里初始一个最大的高度来限制
     * @param {*}
     * @return {*}
     */
    initPageHeight() {
      //在iframe中
      if (window.frames.length != parent.frames.length) {
        let el = this.$refs.app;
        if (el.clientWidth) {
          let height = el.clientWidth * (1080 / 1920);
          this.pageHeight = (height < 500 ? 500 : height) + "px";
        }
        this.isInFrame = true;
        this.$store.dispatch("common/setIsInFrame", true);
      } else {
        document.getElementsByTagName("html")[0].style.height = "100%";
        document.getElementsByTagName("html")[0].style.overflow = "hidden";
        document.getElementsByTagName("body")[0].style.height = "100%";
        document.getElementsByTagName("body")[0].style.overflow = "hidden";
        document.getElementById("app").style.height = "100%";
        document.getElementById("app").style.overflow = "hidden";
        this.isInFrame = false;
        this.$store.dispatch("common/setIsInFrame", false);
      }
    },
  },
});
</script>
<style lang="scss">
@import "./assets/css/reset.css";
@import "./assets/font/index.css";
html,
body,
#app {
  width: 100%;
  // height: 100%;
  // overflow: hidden;
  background: #f5f7fa;
}
</style>
