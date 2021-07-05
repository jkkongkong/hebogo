<!--
 * @Author: your name
 * @Date: 2021-05-19 15:58:33
 * @LastEditTime: 2021-06-23 16:11:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \wkbp2-frontend\src\views\ResourceManage.vue
-->
<template>
  <div class="resource-manage">
    <div class="content-box">
      <div class="nav" :style="{ width: navWidth }">
        <el-menu default-active="AllResource" class="el-menu-vertical-demo" @select="handleSelect" :collapse="isCollapse">
          <el-menu-item index="AllResource">
            <i class="el-icon-document-copy"></i>
            <span slot="title">全部资源</span>
          </el-menu-item>
          <el-menu-item index="MyCollection">
            <i class="el-icon-star-on"></i>
            <span slot="title">我的收藏</span>
          </el-menu-item>
          <!-- <el-menu-item index="3">
                            <i class="el-icon-s-check"></i>
                            <span slot="title">资源审核</span>
                          </el-menu-item> -->
          <el-menu-item index="CreateResource">
            <i class="el-icon-s-management"></i>
            <span slot="title">自建资源</span>
          </el-menu-item>
        </el-menu>
      </div>
      <div class="source-content" :style="{ width: contentWidth }">
        <component :is="componentId"></component>
      </div>
    </div>
  </div>
</template>

<script>
import AllResource from "@/views/contentResourceManage/AllResource";
import MyCollection from "@/views/contentResourceManage/MyCollection";
import CreateResource from "@/views/contentResourceManage/CreateResource";

export default {
  name: "LabelManage",
  props: {
    isInFrame: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      dialogVisible: false,
      isCollapse: false,
      componentId: "AllResource",
      navWidth: "240px",
      contentWidth: "calc(100% - 260px)",
    };
  },
  components: {
    AllResource,
    MyCollection,
    CreateResource,
  },
  created() {
    console.log(123);
  },
  mounted() {
    this.isCollapse = this.isInFrame;
    if (this.isCollapse) {
      this.navWidth = "84px";
      this.contentWidth = "calc(100% - 104px)";
    }
  },
  watch: {},
  methods: {
    handleSelect(index) {
      this.componentId = index;
    },
  },
};
</script>

<style lang="scss" scoped>
.resource-manage {
  height: calc(100% - 90px);
  // border: 1px solid blue;
  overflow: hidden;
  .content-box {
    background: none !important;
    padding: 0 !important;
    display: flex;
    height: 100%;
    overflow: hidden;
    justify-content: space-between;
    .nav {
      background: #ffffff;
      border-radius: 4.7px;
      padding: 20px 10px;
      box-sizing: border-box;
    }
    .source-content {
      border-radius: 2px;
      height: 100%;
      overflow: auto;
    }
  }
  & > .el-menu-item:focus,
  .el-menu-item.is-active,
  .el-menu-item.is-active i {
    background: #4391f7 !important;
    border-radius: 2px !important;
    color: white !important;
  }
  & > .el-menu-item:focus,
  .el-menu-item i {
    color: #4391f7 !important;
  }
  .el-menu-vertical-demo {
    border: none !important;
  }
}
</style>
