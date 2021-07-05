<!--
 * @Author: your name
 * @Date: 2021-05-17 17:25:58
 * @LastEditTime: 2021-07-01 14:35:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\template\HelloWorld.vue
-->
<template>
  <div class="upload-file" v-loading.fullscreen="isLoading">
    <el-upload class="upload-demo" action="/" v-bind="$attrs" v-on="$listeners" :on-change="change">
      <el-button size="small" type="primary" id="uploadBtn">点击上传</el-button>
    </el-upload>
  </div>
</template>

<script>
import Vue from "vue";
import { uploadFile } from "@/http/modules/common";
const config = require("public/config/index");

export default Vue.extend({
  name: "UploadFile",
  props: {
    msg: String,
    maxSize: {
      type: Number,
      default: 1024 * 1024 * 1024,
    },
    exceedTips: {
      type: String,
      default: "5M",
    },
  },
  components: {},
  data() {
    return {
      isLoading: false,
    };
  },
  methods: {
    openUploader() {
      document.getElementById("uploadBtn").click();
    },
    async change(file) {
      console.log(file);
      if (!this.checkFileSize(file.size)) {
        return;
      }
      const temp = new FormData();
      temp.append("files", file.raw);
      temp.append("docType", "bic_movie");
      temp.append("remotePath", "/home/ap/share/file/input/hr/content");
      // temp.append("remotePath", "/home/ap/share/file/input/yth/20210622");
      temp.append("bdeRouteKey", "G121");
      temp.append("routeKey", "AP201_YGQD");
      temp.append("fileNames", file.name);
      temp.append("transFlags", "P9");
      temp.append("transFlags", "FSERVER");
      temp.append("transFlags", "LOCAL");
      try {
        this.isLoading = true;
        let re = await uploadFile(temp);
        if (re.FSERVER && re.FSERVER[0]) {
          let name = re.FSERVER[0].split("content/")[1];

          let url = config.pcFileUrl + "/ecpweb/getLocalFile.action?relativePath=/hr/content/&fileName=" + name;
          console.log(url);
          let temp = { url: url, fileInfo: { fileName: file.name, archiveType: "1", busId: re.P9[0] || null, reName: name } };
          this.$emit("change", temp);
        } else {
          this.$message.error("上传图片失败");
        }
        this.isLoading = false;
      } catch (e) {
        this.isLoading = false;
        this.$message.error("上传图片失败");
      }
    },
    /**
     * @description: 检测文件是否超过上限
     * @param {*} size：文件大小
     * @return {*}
     */
    checkFileSize(size) {
      console.log(size, this.maxSize);
      if (size > this.maxSize) {
        this.$message.error(`文件大小不能超过${this.exceedTips}!`);
        return false;
      } else {
        return true;
      }
    },
  },
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.upload-file {
  width: 0;
  height: 0;
  overflow: hidden;
  .upload-demo {
    width: 0;
    height: 0;
    overflow: hidden;
  }
}
</style>
