<template>
  <div class="editor">
    <quill-editor class="ql-editor" v-model="content" ref="myQuillEditor" :options="editorOption" @ready="ready($event)"> </quill-editor>
    <div class="btns">
      <el-button type="primary" @click="preview" size="mini" :disabled="!content">预览</el-button>
      <el-button @click="save('1')" size="mini" :disabled="!content">发布</el-button>
      <el-button @click="save('2')" size="mini" :disabled="!content">保存草稿</el-button>
    </div>
    <Preview :visible.sync="dialogVisible" :details="content"></Preview>
    <Publish :visible.sync="dialogVisiblePublish" v-if="dialogVisiblePublish" :content="content" @success="publishHandler" :operateType="operateType"></Publish>
    <InsertImage :visible.sync="dialogVisibleImage" v-if="dialogVisibleImage" @change="fileChangeHandler"></InsertImage>
  </div>
</template>

<script>
import { quillEditor } from "vue-quill-editor"; //调用编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import Quill from "quill";
import { ImageDrop } from "quill-image-drop-module";
import ImageResize from "quill-image-resize-module";
import { lineHeightStyle } from "@/utils/lineHeight";
let fontSizeStyle = Quill.import("attributors/style/size");
Quill.register("modules/imageDrop", ImageDrop);
Quill.register("modules/imageResize", ImageResize);
import hljs from "highlight.js";
import Preview from "@/views/resourceManage/Preview.vue";
import Publish from "@/views/resourceManage/Publish";
import InsertImage from "@/views/resourceManage/InsertImage.vue";
import { toolbarTips } from "@/utils/constant";
// let fonts = ["PingFang", "SimHei", "KaiTi", "Helvetica", "FangSong", "Arial", "Times-New-Roman", "sans-serif"];
let fonts = ["Helvetica", "PingFang", "FangSong", "Times-New-Roman", "sans-serif"];
var Font = Quill.import("formats/font");
Font.whitelist = fonts; //将字体加入到白名单

fontSizeStyle.whitelist = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px"];

export default {
  name: "Editor",
  props: {},
  components: {
    quillEditor,
    Preview,
    Publish,
    InsertImage,
  },
  data() {
    return {
      content: ``,
      editorOption: {
        placeholder: "请在这里输入",
        modules: {
          toolbar: {
            container: [
              ["bold", "italic", "underline", "strike"], //加粗，斜体，下划线，删除线
              ["blockquote", "code-block"], //引用，代码块
              [{ header: 1 }, { header: 2 }], // 标题，键值对的形式；1、2表示字体大小
              [{ list: "ordered" }, { list: "bullet" }], //列表
              [{ script: "sub" }, { script: "super" }], // 上下标
              [{ indent: "-1" }, { indent: "+1" }], // 缩进
              [{ direction: "rtl" }], // 文本方向
              // [{ size: ["small", false, "large", "huge"] }], // 字体大小
              [{ size: ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px", "36px", "40px"] }], // 字体大小
              // [{ header: [1, 2, 3, 4, 5, 6, false] }], //几级标题
              [{ color: [] }, { background: [] }], // 字体颜色，字体背景颜色
              [{ font: fonts }], //字体
              // [{ font: [] }], //字体
              [{ align: [] }], //对齐方式
              ["clean"], //清除字体样式
              ["image"], //上传图片、上传视频
              // ["image", "appendix"], //上传图片、上传视频
              [{ lineheight: [true, "1", "1.5", "1.75", "2", "3", "4", "5"] }], // 对齐方式
            ],
            handlers: {
              image: () => {
                this.dialogVisibleImage = true;
              },
              lineheight: (value) => {
                if (value) {
                  let quill = this.$refs.myQuillEditor.quill;
                  quill.format("lineHeight", value == "Normal" ? 1 : value);
                }
              },
            },
          },
          syntax: {
            highlight: (text) => hljs.highlightAuto(text).value,
          },
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false,
          },
          imageDrop: true,
          imageResize: {
            displayStyles: {
              backgroundColor: "black",
              border: "none",
              color: "white",
            },
            modules: ["Resize"],
            // modules: ["Resize", "DisplaySize", "Toolbar"],
          },
        },
      },
      dialogVisible: false,
      dialogVisiblePublish: false,
      dialogVisibleImage: false,
      operateType: "1",
    };
  },
  computed: {
    editor() {
      return this.$refs.myQuillEditor.quill;
    },
    currentResource() {
      return this.$store.getters.currentResource;
    },
    isEditing() {
      return this.$store.getters.isEditing;
    },
  },
  watch: {
    isEditing(cur) {
      if (cur) {
        this.content = this.currentResource.content;
      } else {
        this.content = "";
      }
    },
  },
  mounted() {
    this.initToolBar();
    if (this.isEditing) {
      this.content = this.currentResource.content || "";
    }
  },
  methods: {
    fileChangeHandler(url) {
      let quill = this.$refs.myQuillEditor.quill;
      //获取光标所在位置
      let length = quill.selection.savedRange.index;
      //插入图片
      quill.insertEmbed(length, "image", url);
      quill.setSelection(length + 1);
    },
    ready() {
      Quill.register({ "formats/lineHeight": lineHeightStyle }, true);

      Quill.register(fontSizeStyle, true);
    },
    initToolBar() {
      for (let item of toolbarTips) {
        let tip = document.querySelector(".quill-editor " + item.Choice);
        console.log(tip);
        if (!tip) {
          continue;
        } else {
          console.log(item.title);
        }
        tip.setAttribute("title", item.title);
      }
    },
    /**
     * @description: 预览
     * @param {*}
     * @return {*}
     */
    preview() {
      this.dialogVisible = true;
    },
    /**
     * @description: 保存富文本内容
     * @param {*} status,1:发布，2：存草稿
     * @return {*}
     */
    save(status) {
      this.operateType = status;
      this.dialogVisiblePublish = true;
    },
    publishHandler() {
      this.content = "";
    },
  },
};
</script>

<style scoped lang="scss">
.editor {
  padding: 20px 20px;
  height: calc(100% - 40px);
  .btns {
    display: flex;
    justify-content: flex-end;
    margin-top: 18px;
  }
}
</style>
<style lang="scss">
.editor .el-upload-list__item:first-child {
  margin-top: 0 !important;
}
.editor .quill-editor {
  height: calc(100% - 40px);
}
.editor .ql-container {
  height: calc(100% - 40px);
  font-size: 12px !important;
  strong {
    font-weight: bold !important;
  }
}
@media screen and (max-width: 1440px) {
  .editor .ql-container {
    height: calc(100% - 60px);
  }
}
@media screen and (max-width: 920px) {
  .editor .ql-container {
    height: calc(100% - 80px);
  }
}
.editor .el-icon-paperclip:hover {
  color: #06c !important;
}

//行高
.ql-snow .ql-picker.ql-lineheight .ql-picker-label::before {
  content: "行间距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1"]::before {
  content: "1倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="1.5"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1.5"]::before {
  content: "1.5倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="1.75"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="1.75"]::before {
  content: "1.75倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="2"]::before {
  content: "2倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="3"]::before {
  content: "3倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="4"]::before {
  content: "4倍行距";
}
.ql-snow .ql-picker.ql-lineheight .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-lineheight .ql-picker-item[data-value="5"]::before {
  content: "5倍行距";
}
.ql-snow .ql-picker.ql-lineheight {
  width: 90px;
}
//大小
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="14px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="14px"]::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="16px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="16px"]::before {
  content: "16px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="18px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="18px"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="20px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="20px"]::before {
  content: "20px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="24px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="24px"]::before {
  content: "24px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="28px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="28px"]::before {
  content: "28px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="32px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="32px"]::before {
  content: "32px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="36px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="36px"]::before {
  content: "36px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="40px"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="40px"]::before {
  content: "40px";
}

//font family
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="PingFang"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="PingFang"]::before {
  content: "PingFang";
  font-family: "PingFang" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="SimHei"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="SimHei"]::before {
  content: "黑体";
  font-family: "SimHei";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Helvetica"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Helvetica"]::before {
  content: "Helvetica";
  font-family: "Helvetica";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="KaiTi"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="KaiTi"]::before {
  content: "楷体";
  font-family: "KaiTi" !important;
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="FangSong"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="FangSong"]::before {
  content: "仿宋";
  font-family: "FangSong";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Arial"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Arial"]::before {
  content: "Arial";
  font-family: "Arial";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="Times-New-Roman"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="Times-New-Roman"]::before {
  content: "Times New Roman";
  font-family: "Times New Roman";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="sans-serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="sans-serif"]::before {
  content: "sans-serif";
  font-family: "sans-serif";
}

.ql-font-PingFang {
  font-family: "PingFang";
}
.ql-font-SimHei {
  font-family: "SimHei";
}
.ql-font-Helvetica {
  font-family: "Helvetica";
}
.ql-font-KaiTi {
  font-family: "KaiTi";
}
.ql-font-FangSong {
  font-family: "FangSong";
}
.ql-font-Arial {
  font-family: "Arial";
}
.ql-font-Times-New-Roman {
  font-family: "Times New Roman";
}
.ql-font-sans-serif {
  font-family: "sans-serif";
}

//重新设置缩进
.ql-editor .ql-indent-1:not(.ql-direction-rtl) {
  padding-left: 1em;
}
.ql-editor .ql-indent-2:not(.ql-direction-rtl) {
  padding-left: 2em;
}
.ql-editor .ql-indent-3:not(.ql-direction-rtl) {
  padding-left: 3em;
}
.ql-editor .ql-indent-4:not(.ql-direction-rtl) {
  padding-left: 4em;
}
.ql-editor .ql-indent-5:not(.ql-direction-rtl) {
  padding-left: 5em;
}
.ql-editor .ql-indent-6:not(.ql-direction-rtl) {
  padding-left: 6em;
}
.ql-editor .ql-indent-7:not(.ql-direction-rtl) {
  padding-left: 7em;
}
.ql-editor .ql-indent-8:not(.ql-direction-rtl) {
  padding-left: 8em;
}
.ql-editor .ql-indent-9:not(.ql-direction-rtl) {
  padding-left: 9em;
}
.ql-snow .ql-picker.ql-size {
  width: 70px !important;
}
</style>
