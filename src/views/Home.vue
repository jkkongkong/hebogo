<!--
 * @Author: your name
 * @Date: 2021-07-06 11:43:13
 * @LastEditTime: 2021-07-06 14:31:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\views\Home.vue
-->
<template>
  <div class="home">
    <div class="nav">
      <i class="icon"></i>
      <el-tabs
        v-model="activeName"
        @tab-click="handleClick"
        class="nav-tab-header"
      >
        <el-tab-pane label="资源管理" name="resourceManage"></el-tab-pane>
        <!-- <el-tab-pane label="测试" name="/test"></el-tab-pane> -->
      </el-tabs>
    </div>
    <router-view />
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {
      activeName: "resourceManage",
    };
  },
  methods: {
    handleClick() {
      this.$router.push("/home/" + this.activeName);
    },
  },
};
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
        border-color: transparent transparent transparent
          rgba(74, 144, 226, 0.5);
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
        border-color: transparent transparent transparent
          rgba(74, 144, 226, 0.5);
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
