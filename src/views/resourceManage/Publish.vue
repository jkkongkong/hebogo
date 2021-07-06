<!--
 * @Author: your name
 * @Date: 2021-05-24 18:49:09
 * @LastEditTime: 2021-07-06 15:58:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\contentResourceManage\Publish.vue
-->
<template>
  <div>
    <el-dialog :title="operateType == 5 ? '发布' : '存草稿'" :close-on-click-modal="false" width="900px" class="source-publish" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content" v-loading.fullscreen="isLoading">
        <el-form :model="formData" label-position="top" :rules="rules" ref="publishForm">
          <el-row :gutter="30">
            <el-col :span="16" class="item">
              <el-form-item label="标题" prop="title">
                <el-input v-model.trim="formData.title" placeholder="请输入标题" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="item">
              <el-form-item label="分类" prop="resourceType">
                <el-select v-model="formData.resourceType" placeholder="请选择分类" size="mini">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if="formData.sourceType != '2'">
            <el-col class="item">
              <el-form-item label="关键词" prop="keyWord">
                <el-input v-model.trim="formData.keyWord" placeholder="多个关键词使用分割符号，每个关键词2-12个字符" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item">
              <el-form-item label="描述" prop="summary">
                <el-input v-model.trim="formData.summary" placeholder="请输入描述" size="mini" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Publish",
  props: {
    content: {
      type: String,
      default: () => {
        return "";
      },
    },
    appendix: {
      type: Array,
      default: () => {
        return [];
      },
    },
    operateType: {
      type: String,
      default: () => {
        return "";
      },
    },
  },
  components: {},
  data() {
    return {
      typeOptions: [
        { label: "课程", value: "1" },
        { label: "微课", value: "2" },
        { label: "电子书", value: "3" },
        { label: "自建知识", value: "4" },
      ],
      selectLabels: [],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        resourceType: [{ required: true, message: "请选择分类", trigger: "blur" }],
        keyWord: [{ required: true, message: "请输入关键词", trigger: "blur" }],
      },
      formData: {
        title: null,
        id: null,
        resourceType: "4",
        keyWord: null,
        summary: null,
        content: null,
      },
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
    .title {
      font-size: 12px;
      color: #999999;
    }
    .value {
      font-size: 14px;
      color: #333333;
      margin: 8px 0 17px 0;
      flex-shrink: 0;
      line-height: 22px;
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
