<!--
 * @Author: your name
 * @Date: 2021-07-06 11:43:13
 * @LastEditTime: 2021-07-15 17:50:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\views\About.vue
-->
<template>
  <div class="about">
    <div v-for="(item, index) in list" :key="index">
      <span>{{ item.name }}</span>
      <div v-for="(subItem, subIndex) in item.children" :key="subIndex">
        <span>{{ subItem.name }}</span>
        <div v-for="(sItem, sIndex) in subItem.children" :key="sIndex">
          <el-input v-model="sItem.name"></el-input>
        </div>
        <el-button @click="add(subItem)">add</el-button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "About",
  components: {},
  data() {
    return {
      activeName: "resourceManage",
      list: [
        { name: "f1", children: [{ name: "c1", children: [{ name: "cc2" }] }] },
        { name: "f2", children: [{ name: "c2", children: [{ name: "cc2" }] }] },
        { name: "f3", children: [{ name: "c3", children: [{ name: "cc2" }] }] },
        { name: "f4", children: [{ name: "c4", children: [{ name: "cc2" }] }] },
        { name: "f5", children: [{ name: "c5", children: [{ name: "cc2" }] }] },
      ],
    };
  },
  methods: {
    add(subItem) {
      subItem.children.push({ name: "cc333" });
    },
  },
};
</script>
<style lang="scss" scoped>
.about {
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
