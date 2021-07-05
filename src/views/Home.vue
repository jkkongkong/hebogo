<!--
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-06-17 17:58:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\views\Home.vue
-->
<template>
  <div
    class="home"
    :style="{
      height: isInFrame ? 'calc(100% + 12px)' : 'calc(100% - 20px)',
      'margin-bottom': isInFrame ? '0' : '10px',
    }"
  >
    <div class="nav">
      <i class="icon"></i>
      <el-tabs v-model="activeName" @tab-click="handleClick" class="nav-tab-header">
        <el-tab-pane label="标签管理" name="labelManage"></el-tab-pane>
        <el-tab-pane label="内容推送" name="contentRecommend"></el-tab-pane>
        <el-tab-pane label="资源管理" name="contentResourceManage"></el-tab-pane>
        <!-- <el-tab-pane label="测试" name="/test"></el-tab-pane> -->
      </el-tabs>
    </div>
    <router-view :is-in-frame="isInFrame" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "Home",
  props: {
    isInFrame: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  components: {},
  data() {
    return {
      navList: ["标签管理", "资源管理"],
      activeName: "",
      pageHeight: "500px",
    };
  },
  mounted() {
    this.activeName = this.$route.name;
  },
  methods: {
    handleClick() {
      console.log(123);
      this.$router.push(this.activeName);
    },
  },
});
</script>
<style lang="scss" scoped>
.home {
  width: calc(100% - 20px);
  height: calc(100% - 20px);
  margin: 10px;
  overflow: hidden;
  background: #f5f7fa;
  .nav {
    padding: 0 30px;
    margin: 0 0 20px 0;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.95);
    height: 68px;
    display: flex;
    align-items: center;
    min-width: 500px;
    .icon {
      vertical-align: middle;
      &::before {
        content: "";
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 0 14px 20px;
        border-color: transparent transparent transparent rgba(74, 144, 226, 0.5);
      }
      &::after {
        content: "";
        margin-left: -12px;
        margin-right: 10px;
        display: inline-block;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 14px 0 14px 20px;
        border-color: transparent transparent transparent rgba(74, 144, 226, 0.5);
      }
    }
    .nav-tab-header {
      .el-tabs__nav-wrap::after {
        background-color: none !important;
      }
    }
  }
}
</style>
<style lang="scss">
.nav-tab-header .el-tabs__nav-wrap::after {
  background: none !important;
}
.nav-tab-header .el-tabs__item {
  font-size: 24px !important;
  color: #4a4a4a !important;
  letter-spacing: 0;
}
.nav-tab-header .el-tabs__item.is-active {
  font-weight: bold;
  color: #222222 !important;
}
</style>
