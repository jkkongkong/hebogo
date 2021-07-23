<!--
 * @Author: your name
 * @Date: 2021-05-24 18:49:09
 * @LastEditTime: 2021-07-19 11:09:22
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\views\resourceManage\Publish.vue
-->
<template>
  <div>
    <el-dialog :title="operateType == 0 ? '新建' : '编辑'" :close-on-click-modal="false" width="900px" class="source-publish" v-bind="$attrs" append-to-body destroy-on-close @close="closeDialog">
      <div class="content" v-loading.fullscreen="isLoading">
        <el-form :model="formData" label-position="top" :rules="rules" ref="publishForm">
          <el-row :gutter="30">
            <el-col :span="16" class="item">
              <el-form-item label="标题" prop="name">
                <el-input v-model.trim="formData.name" placeholder="请输入标题" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="8" class="item">
              <el-form-item label="分类" prop="type">
                <el-select v-model="formData.type" placeholder="请选择分类" size="mini">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item" :span="12">
              <el-form-item label="关键词" prop="keyWord">
                <el-input v-model.trim="formData.keyWord" placeholder="多个关键词使用分割符号，每个关键词2-12个字符" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <el-col class="item" :span="12">
              <el-form-item label="解压密码" prop="unzipPassword">
                <el-input v-model.trim="formData.unzipPassword" placeholder="多个关键词使用分割符号，每个关键词2-12个字符" size="mini"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item">
              <el-form-item label="描述" prop="desc">
                <el-input v-model.trim="formData.desc" placeholder="请输入描述" size="mini" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item">
              <el-form-item label="资源地址" prop="resourceUrl">
                <el-input v-model.trim="formData.resourceUrl" placeholder="请输入url" size="mini" type="textarea"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col class="item">
              <el-form-item label="封面" prop="photoUrl">
                <div class="title-page">
                  <el-image :src="formData.photoUrl" fit="fill" class="title-image" v-show="formData.photoUrl"></el-image>
                  <div class="add-btn" @click="selectPageImge">
                    <i class="el-icon-plus"></i>
                    <span class="tips"></span>
                  </div>
                </div>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="confirm('0')" size="mini">存草稿</el-button>
        <el-button type="primary" @click="confirm('1')" size="mini">发布</el-button>
        <el-button type="primary" @click="confirm('2')" size="mini">推荐</el-button>
      </span>
    </el-dialog>
    <InsertImage :visible.sync="dialogVisibleImage" v-if="dialogVisibleImage" @change="fileChangeHandler"></InsertImage>
  </div>
</template>

<script>
import InsertImage from "@/views/resourceManage/InsertImage.vue";
import { createResource, updateResource } from "@/http/modules/resourceManage";
import { formatDate1 } from "@/utils/format.js";
export default {
  name: "Publish",
  props: {
    content: {
      type: Object,
      default: () => {
        return null;
      },
    },
    operateType: {
      //0:创建,1:编辑
      type: String,
      default: () => {
        return "";
      },
    },
  },
  components: {
    InsertImage,
  },
  data() {
    return {
      typeOptions: [
        { label: "资源类型", value: null },
        { label: "视频", value: 0 },
        { label: "电子书", value: 1 },
        { label: "自建资源", value: 2 },
        { label: "微课", value: 3 },
      ],
      rules: {
        name: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        type: [{ required: true, message: "请选择分类", trigger: "blur" }],
        keyWord: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        resourceUrl: [{ required: true, message: "请输入资源链接", trigger: "blur" }],
        unzipPassword: [{ required: true, message: "请输入解压密码", trigger: "blur" }],
        photoUrl: [{ required: true, message: "请选择封面", trigger: "blur" }],
      },
      formData: {
        name: null,
        id: null,
        type: null,
        keyWord: null,
        desc: null,
        resourceUrl: null,
        unzipPassword: null,
        photoUrl: null,
      },
      isLoading: false,
      dialogVisibleImage: false,
    };
  },
  computed: {},
  watch: {},
  mounted() {
    if (this.operateType && this.content) {
      this.formData = { ...this.content };
    }
  },
  methods: {
    closeDialog() {
      this.isLoading = false;
      this.$store.dispatch("resourceManage/setIsEditing", false);
      this.$emit("update:visible", false);
    },
    confirm(status) {
      this.formData.status = status;
      this.save();
    },
    save() {
      this.$refs.publishForm.validate(async (valid) => {
        if (valid) {
          this.formData.createDate = formatDate1(new Date());
          if (this.operateType == "1") {
            //编辑
            let re = await updateResource(this.formData);
            if (re) {
              this.$message.success("编辑成功");
              this.closeDialog();
            } else {
              this.$message.error("编辑失败");
            }
          } else {
            //创建
            let re = await createResource(this.formData);
            if (re) {
              this.$message.success("创建成功");
              this.closeDialog();
            } else {
              this.$message.error("创建失败");
            }
          }
        }
      });
    },
    /**
     * @description: 文件上传
     * @param {*}
     * @return {*}
     */
    fileChangeHandler(url) {
      this.formData.photoUrl = url;
    },
    selectPageImge() {
      this.dialogVisibleImage = true;
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
