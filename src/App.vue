<!--
 * @Author: your name
 * @Date: 2021-07-06 11:43:13
 * @LastEditTime: 2021-07-06 12:03:55
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\App.vue
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
};
</script>

<style>
@import "./assets/css/reset.css";
html,
body,
#app {
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: #f5f7fa;
}
</style>
