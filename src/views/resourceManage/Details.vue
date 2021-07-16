<!--
 * @Author: your name
 * @Date: 2021-05-24 18:49:09
 * @LastEditTime: 2021-07-16 20:45:00
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\Publish.vue
-->
<template>
  <div>
    <el-dialog title="详情" :close-on-click-modal="false" width="900px" class="source-publish" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content" v-loading.fullscreen="isLoading">
        <el-row class="item">
          <el-col :span="8">ID: {{ content.id }}</el-col>
          <el-col :span="8">名称: {{ content.name }}</el-col>
          <el-col :span="8">创建日期: {{ formatDate(content.createDate) }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="8">数量: {{ content.sellCount }}</el-col>
          <el-col :span="8">类型: {{ typeMaps[content.type] }}</el-col>
          <el-col :span="8">状态: {{ statusMaps[content.status] }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="12">关键词: {{ content.keyWord }}</el-col>
          <el-col :span="12">解压密码: {{ content.unzipPassword }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="24">描述: {{ content.desc }}</el-col>
        </el-row>
        <el-row class="item">
          <el-col :span="24">资源地址: {{ content.resourceUrl }}</el-col>
        </el-row>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { formatDate } from "@/utils/format.js";
export default {
  name: "Publish",
  props: {
    content: {
      type: Object,
      default: () => {
        return {
          id: null,
          name: null,
          resourceUrl: null,
          createDate: null,
          sellCount: null,
          pickPassword: null,
          type: null,
          unzipPassword: null,
          desc: null,
          keyWord: null,
          status: null,
        };
      },
    },
  },
  components: {},
  data() {
    return {
      statusMaps: { 0: "草稿", 1: "已发布", 2: "推荐" },
      typeMaps: { 0: "视频", 1: "电子书", 2: "自建资源", 3: "微课" },
      isLoading: false,
    };
  },
  computed: {
    currentResource() {
      return this.$store.getters.currentResource;
    },
    isEditing() {
      return this.$store.getters.isEditing;
    },
  },
  watch: {},
  mounted() {},
  methods: {
    formatDate: formatDate,
    /**
     * @description: 初始化表单数据
     * @param {*}
     * @return {*}
     */
    initLabel() {
      console.log(123);
    },
    closeDialog() {
      this.isLoading = false;
      this.$emit("update:visible", false);
    },
    save() {
      console.log(123);
    },
    /**
     * @description: 文件上传
     * @param {*}
     * @return {*}
     */
    fileChangeHandler(file) {
      this.formData.photoUrl = file.url;
      console.log(this.formData);
    },
  },
};
</script>
<style lang="scss" scoped>
.source-publish {
  text-align: left;
  .content {
    background: #f7f7f7;
    border-radius: 4px;
    letter-spacing: 0;
    text-align: left;
    padding: 22px 19px;
    .item {
      margin-bottom: 20px;
    }
  }
}
</style>
<style lang="scss">
.source-publish .el-dialog__header {
  background: #f5f5f5;
  border-radius: 4px 4px 0 0;
}
.source-publish .el-tag {
  margin: 0 10px 5px 0;
}
.source-publish .el-form-item__label {
  line-height: 20px !important;
}
.source-publish .el-form-item__content {
  line-height: 0px !important;
}
.source-publish .ql-container.ql-snow {
  border: none !important;
  strong {
    font-weight: bold !important;
  }
}
.source-publish .el-input__inner,
.source-publish .el-textarea__inner {
  border-top: none !important;
  border-left: none !important;
  border-right: none !important;
  background-color: #f7f7f7 !important;
  border-radius: 0px !important;
}
.source-publish .el-cascader__search-input {
  background: none !important;
}
.source-publish .el-cascader .el-input--suffix {
  input::-webkit-input-placeholder {
    color: #f7f7f7 !important;
  }
  input:-moz-placeholder {
    color: #f7f7f7 !important;
  }
  input::-moz-placeholder {
    color: #f7f7f7 !important;
  }
  input:-ms-input-placeholder {
    color: #f7f7f7 !important;
  }
  input::-ms-input-placeholder {
    color: #f7f7f7 !important;
  }
}
.el-cascader-panel {
  max-height: 400px;
}
.source-publish {
  @media screen and (max-width: 1200px) {
    .el-dialog {
      margin-top: 3vh !important;
    }
  }
}
</style>
