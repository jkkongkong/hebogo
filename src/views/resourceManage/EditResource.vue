<!--
 * @Author: your name
 * @Date: 2021-06-17 09:39:27
 * @LastEditTime: 2021-07-06 15:46:17
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\EditResource.vue
-->
<template>
  <div>
    <el-dialog title="编辑" :close-on-click-modal="false" class="edit-resource" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content">
        <TextEditor></TextEditor>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import TextEditor from "@/views/resourceManage/TextEditor.vue";
export default {
  name: "EditResource",
  props: {},
  components: {
    TextEditor,
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  mounted() {
    console.log(123);
  },
  methods: {
    closeDialog() {
      this.$emit("update:visible", false);
    },
  },
};
</script>
<style lang="scss" scoped>
.edit-resource {
  text-align: left;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    height: 600px;
  }
  @media screen and (max-width: 1440px) {
    .content {
      height: 400px;
    }
  }
  @media screen and (max-width: 920px) {
    .editor .content {
      height: 300px;
    }
  }
}
</style>
<style lang="scss">
.edit-resource .editor .ql-container {
  height: calc(100% - 60px) !important;
}
.edit-resource {
  .el-dialog {
    width: 1200px;
    margin-top: 12vh !important;
  }
  @media screen and (max-width: 1440px) {
    .el-dialog {
      width: 900px;
      margin-top: 10vh !important;
    }
  }
  @media screen and (max-width: 920px) {
    .el-dialog {
      width: 700px;
      margin-top: 9vh !important;
    }
  }
}
</style>
