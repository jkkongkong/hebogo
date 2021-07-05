<!--
 * @Author: your name
 * @Date: 2021-05-24 18:49:09
 * @LastEditTime: 2021-07-02 09:51:12
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
            <el-col :span="4" @click.native="openVideo()">
              <el-image :src="formData.photoUrl" fit="fill" class="title-img" v-if="formData.resourceType == '1' && formData.sourceType == '2'"></el-image>
            </el-col>
            <el-col :span="12" class="item">
              <el-form-item label="标题" prop="title">
                <el-input v-model.trim="formData.title" placeholder="请输入标题" size="mini"></el-input>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="8" class="item">
              <el-form-item label="分类" prop="resourceType">
                <el-select v-model="formData.resourceType" placeholder="请选择分类" size="mini">
                  <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
            <el-col :span="8" class="item">
              <el-form-item label="有效期" prop="validityDate">
                <el-date-picker v-model="formData.validityDate" type="date" placeholder="请选择有效期" size="mini" style="width: 100%"> </el-date-picker>
              </el-form-item>
            </el-col>
            <!-- <el-col :span="6" class="item">
              <el-form-item label="是否可见" prop="visible">
                <el-select v-model="formData.visible" placeholder="请选择可选范围" size="mini">
                  <el-option v-for="item in visibleOptions" :key="item.value" :label="item.label" :value="item.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col> -->
          </el-row>
          <el-row>
            <el-col class="item" :span="12">
              <el-form-item label="标签" prop="TAG_GROUP">
                <el-tag v-for="(item, index) in selectLabels" :key="index" size="mini" closable @close="deleteLabel(index)">{{ item.label }}</el-tag>
                <el-button class="button-new-tag" size="mini" @click="labelVisible = true">+ 添加标签</el-button>
              </el-form-item>
            </el-col>
            <el-col class="item" :span="12">
              <el-form-item label="推荐评级" prop="starLevel">
                <el-rate v-model="formData.starLevel"></el-rate>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row v-if=" formData.sourceType != '2'">
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
          <el-row>
            <span class="photo-tips">图片只支持png、jpg格式，且大小不能大于10kb</span>
            <el-link type="primary" href="./image/template.png" target="_blank">图标样例</el-link>
          </el-row>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeDialog()" size="mini">取消</el-button>
        <el-button type="primary" @click="save" size="mini">确 定</el-button>
      </span>
    </el-dialog>
    <LabelSelect :visible.sync="labelVisible" @change="labelSelecChange" v-if="labelVisible" show-checkbox check-strictly :default-checked-keys="defaultSelectLabelIds"></LabelSelect>
    <UploadFile :auto-upload="false" @change="fileChangeHandler" :accept="pageImageAccept" ref="fileUploaderPublish" :max-size="1024 * 10" exceed-tips="10kb"></UploadFile>
  </div>
</template>

<script>
import { createResource, editResource } from "@/http/modules/contentResourceManage";
import { getLabels } from "@/http/modules/labelManage";
import { resourceTypesReverse } from "@/utils/constant";
import LabelSelect from "@/components/label/LabelSelect";
import UploadFile from "@/components/uploadFile/UploadFile";
import { replaceTextContent } from "@/utils/conmponentFuncs";
const config = require("public/config/index");
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
  components: {
    LabelSelect,
    UploadFile,
  },
  data() {
    return {
      vedioUrl: "https://u.ccb.com/course/#/detail/",
      typeOptions: [
        { label: "课程", value: "1" },
        { label: "微课", value: "2" },
        { label: "电子书", value: "3" },
        { label: "自建知识", value: "4" },
      ],
      sourceOptions: [
        { label: "运营创建", value: "1" },
        { label: "建行大学", value: "2" },
        { label: "远程中心", value: "3" },
        { label: "运营中心", value: "4" },
      ],
      labelOptions: [
        { label: "标签一", value: "A" },
        { label: "标签二", value: "B" },
        { label: "标签三", value: "C" },
        { label: "标签四", value: "d" },
        { label: "标签五", value: "e" },
        { label: "标签六", value: "f" },
        { label: "标签七", value: "g" },
        { label: "标签八", value: "h" },
      ],
      visibleOptions: [
        { label: "不可见", value: "0" },
        { label: "可见", value: "1" },
      ],
      disabled: false,
      dialogImageUrl: "",
      dialogVisible: false,
      labelVisible: false,
      selectLabels: [],
      rules: {
        title: [
          { required: true, message: "请输入标题", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" },
        ],
        resourceType: [{ required: true, message: "请选择分类", trigger: "blur" }],
        validityDate: [{ required: true, message: "请选择有效期", trigger: "blur" }],
        visible: [{ required: true, message: "请选择是否可见", trigger: "blur" }],
        TAG_GROUP: [{ required: true, message: "请选择标签", trigger: "blur" }],
        keyWord: [{ required: true, message: "请输入关键词", trigger: "blur" }],
        photoUrl: [{ required: true, message: "请选择封面", trigger: "blur" }],
        starLevel: [{ required: true, message: "请选择推荐评级", trigger: "blur" }],
      },
      formData: {
        titleImg: null,
        title: null,
        url: null,
        id: null,
        sourceType: "1",
        resourceType: "4",
        status: null,
        validityDate: null,
        duration: null,
        size: null,
        starLevel: 0,
        clickNumber: null,
        comment: null,
        collect: null,
        forword: null,
        classify: null,
        validDate: null,
        labels: [],
        keyWord: null,
        summary: null,
        frontCover: null,
        visible: null,
        photoUrl: null,
        content: null,
        FILE_GROUP: [],
        TAG_GROUP: [],
      },
      labelProps: {
        lazy: true,
        multiple: true,
        checkStrictly: true,
        lazyLoad: this.loadLabels,
      },
      pageImageList: [],
      pageImageAccept: ".png, .jpg, .jpge",
      defaultSelectLabelIds: [],
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
  watch: {
    isEditing(val) {
      if (val) {
        this.initLabel();
      } else {
        this.formData = {
          title: null,
          id: null,
          sourceType: "1",
          resourceType: null,
          validityDate: null,
          keyWord: null,
          summary: null,
          content: null,
        };
      }
    },
  },
  mounted() {
    console.log(123);
    if (this.isEditing) {
      this.initLabel();
    }
  },
  methods: {
    /**
     * @description: 初始化表单数据
     * @param {*}
     * @return {*}
     */
    initLabel() {
      this.formData.orginId = this.currentResource.orginId;
      this.formData.title = this.currentResource.title;
      this.formData.TAG_GROUP = [...this.currentResource.TAG_GROUP];
      this.formData.FILE_GROUP = [...this.currentResource.FILE_GROUP];
      this.formData.resourceType = resourceTypesReverse[this.currentResource.resourceType];
      if (this.currentResource.sourceType == "建行大学") {
        this.formData.sourceType = "2";
      } else {
        this.formData.sourceType = "1";
      }
      this.formData.validityDate = new Date(this.currentResource.validityDate);
      this.formData.starLevel = this.currentResource.starLevel;
      this.formData.keyWord = this.currentResource.keyWord;
      this.formData.summary = this.currentResource.summary;
      this.formData.id = this.currentResource.id;
      this.formData.photoUrl = this.currentResource.photoUrl;
      if (this.currentResource.TAG_GROUP && this.currentResource.TAG_GROUP.length) {
        this.defaultSelectLabelIds = [];
        this.selectLabels = [];
        this.currentResource.TAG_GROUP.map((item) => {
          this.selectLabels.push({ label: item.tagName, value: item.tagId });
          this.defaultSelectLabelIds.push(item.tagId);
        });
      }
    },
    /**
     * @description: 获取标签
     * @param {*}
     * @return {*}
     */
    async loadLabels(node, resolve) {
      let parameters = {
        parentTagId: "-1",
        startIndex: 1,
        pageSize: 1000,
      };
      if (node.level != 0) {
        parameters.parentTagId = node.data.tagId;
      }
      let re = await getLabels(parameters);
      if (re && re.length) {
        resolve(re);
      } else {
        resolve([]);
      }
    },
    /**
     * @description: 选择封面
     * @param {*}
     * @return {*}
     */
    selectPageImge() {
      this.$refs.fileUploaderPublish.openUploader();
    },
    closeDialog() {
      this.$store.dispatch("contentResourceManage/setIsEditing", false);
      this.isLoading = false;
      this.$emit("update:visible", false);
    },
    save() {
      this.formData.content = replaceTextContent(this.content, false);
      console.log(this.appendix);
      this.formData.FILE_GROUP = this.appendix;
      this.formData.operateType = this.operateType;
      this.$refs.publishForm.validate(async (valid) => {
        if (valid) {
          this.isLoading = true;
          let iconName = null;
          let temp = Object.assign({}, this.formData);
          if (this.formData.photoUrl) {
            iconName = this.formData.photoUrl.match(/(?<=fileName=).*?(?:(.png|.jpg))/g);
            if (iconName && iconName[0]) {
              temp.photoUrl = config.mobileFileUrl + "/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=" + iconName[0];
            }
          }

          if (this.formData.id) {
            temp.orginId = this.formData.id;
            let re = await editResource(temp);
            if (re == "SUCCESS") {
              this.$emit("success");
              this.closeDialog();
            } else {
              this.isLoading = false;
            }
          } else {
            let re = await createResource(temp);
            if (re == "SUCCESS") {
              this.$emit("success");
              this.closeDialog();
            } else {
              this.isLoading = false;
            }
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    labelSelecChange(labels) {
      this.labelVisible = false;
      this.formData.TAG_GROUP = [];
      this.selectLabels = [...labels];
      labels.map((item) => {
        this.formData.TAG_GROUP.push({ tagId: item.value });
      });
      this.$refs.publishForm.validateField("TAG_GROUP");
    },
    /**
     * @description:删除标签
     * @param {*} index：标签在selectLabels中的suo'yin
     * @return {*}
     */
    deleteLabel(index) {
      this.defaultSelectLabelIds.splice(index, 1);
      this.selectLabels.splice(index, 1);
      this.formData.TAG_GROUP.splice(index, 1);
      this.$refs.publishForm.validateField("TAG_GROUP");
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
    /**
     * @description: 点击缩略图跳转视屏界面
     * @param {*}
     * @return {*}
     */
    openVideo() {
      if (this.formData.photoUrl && this.formData.resourceType == "1" && this.formData.sourceType == "2" && this.formData.orginId) {
        let vedioSrc = this.vedioUrl + this.formData.orginId;
        window.open(vedioSrc);
      } else {
        alert("获取视屏资源失败");
      }
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
    .title-img {
      width: 120px;
      height: 67px;
    }
    .title-page {
      display: flex;
      height: 80px;
      .title-image {
        height: 100%;
        margin-right: 20px;
      }
      .add-btn {
        background-color: #fdfdff;
        border: 1px dashed #c0ccda;
        border-radius: 6px;
        box-sizing: border-box;
        width: 80px;
        height: 80px;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        &:hover {
          border-color: #409eff;
        }
        i {
          font-size: 20px;
          color: #8c939d;
        }
        .tips {
          font-size: 12px;
          color: #606266;
          position: absolute;
          top: 7px;
          left: 0;
        }
      }
    }
    .photo-tips {
      font-size: 12px;
      margin-right: 20px;
      text-align: left;
      color: #999999;
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
