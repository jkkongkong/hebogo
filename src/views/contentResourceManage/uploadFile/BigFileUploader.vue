<template>
  <div id="BigFileUpload">
    <el-dialog title="文件上传" v-if="show" :visible.sync="show" :before-close.sync="onClose" :close-on-click-modal="false" width="60%" top="5vh">
      <uploader ref="uploader" :options="options" :autoStart="false" :file-status-text="statusText" @file-added="onFileAdded" @file-removed="onFileRemoved" @file-success="onFileSuccess" @file-error="onFileError" class="uploader-app">
        <uploader-unsupport></uploader-unsupport>
        <uploader-btn id="global-uploader-btn" :attrs="attrs" ref="uploadBtn" v-show="uploadBtnShow">选择文件</uploader-btn>
        <uploader-list v-show="panelShow">
          <div class="file-panel" slot-scope="props" :class="{ collapse: collapse }">
            <ul class="file-list">
              <li v-for="file in props.fileList" :key="file.id">
                <uploader-file :class="'file_' + file.id" :file="file" :list="true"></uploader-file>
              </li>
              <div class="no-file" v-if="!props.fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div>
            </ul>
          </div>
        </uploader-list>
      </uploader>
      <span slot="footer" class="dialog-footer">
        <el-button @click="onClose">关 闭</el-button>
        <el-button type="primary" @click="upload">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import uploader from "vue-simple-uploader";
import SparkMD5 from "spark-md5";
import { UploadFile } from "./UploadFile";
import { DownloadFile } from "./DownloadFile";
import { Base64 } from "js-base64";
Vue.use(uploader);
export default {
  name: "big-file-upload-dialog",
  props: {
    // userInfo: {
    // 	type: Object,
    // 	default:()=>{}
    // },
    accept: {
      type: Array,
      default: () => [".doc", ".docx", ".xls", ".xlsx", ".pdf", ".png", ".jpg", ".jpge"],
      // default: () => [".doc", ".docx", ".xls", ".xlsx", ".ppt", ".pptx", ".pdf", ".txt"],
    },
    maxSize: {
      type: Number,
      default: 100,
    },
    limit: {
      type: Number,
      default: 3,
    },
    exceptList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      show: false,
      onClose: () => {
        this.show = false;
      },
      submit: false,
      host: "",
      token: "",
      userInfo: {},
      options: {
        target: "",
        simultaneousUploads: 1,
        chunkSize: 1 * 1024 * 1024,
        forceChunkSize: true,
        testChunks: false,
        withCredentials: true,
        query: {
          _fw_service_id: "bigFileUploadService",
          Mnplt_Tp_Ind: 1,
          IP_Adr: location.hostname,
          MAC_Adr: "111.222.333.444.555",
          Token: "",
          Blng_InsID: "",
          Crt_Psn_Nm: "",
          File_ID: "",
        },
      },
      fileList: [],
      //上传状态
      statusText: {
        success: "上传成功！",
        error: "出错了！",
        uploading: "上传中...",
        paused: "等待中...",
        waiting: "等待中...",
      },
      attrs: {
        accept: "image/*",
      },
      panelShow: false,
      uploadBtnShow: true,
      isOtherStyle: false,
      isCheckRepeatability: true,
    };
  },
  created() {
    // this.getToken()
    // // 设置可传文件类型
    // this.attrs = { accept: this.accept }
  },
  methods: {
    /**
     * @description:
     * @param {*} isCheckRepeatability:是否检查附件的重复性
     * @return {*}
     */
    openDialog(isCheckRepeatability = true) {
      this.isCheckRepeatability = isCheckRepeatability;
      this.show = true;
      this.submit = false;
      this.fileList = [];
      // 获取登陆人信息
      this.getUserInfo().then((d) => {
        this.userInfo = d;
        this.options.query.Blng_InsID = d.organization && d.organization.id;
        this.options.query.Crt_Psn_Nm = d.name;
        // 获取上传文件IP
        this.getHost().then((host) => {
          this.getToken(host);
        });
      });
      // 设置可传文件类型
      this.attrs = { accept: this.accept };

      return new Promise((resolve, reject) => {
        this.onClose = () => {
          this.show = false;
          if (this.submit) {
            resolve(this.fileList);
          } else {
            reject();
          }
        };
      });
    },
    // 获取上传文件地址
    getHost() {
      return new Promise((resolve) => {
        UploadFile.getFileCluster().then((d) => {
          if (d.result === "SUCCESS") {
            this.host = d.data && d.data.host && `http://${d.data.host}/ecpweb/ecpJson.action`;
            // 不知道这个组件为什么要这样给options第一层属性赋值
            this.$refs.uploader.uploader.opts.target = this.host;
            resolve(this.host);
          }
        });
      });
    },
    // onClose(){
    // 	this.show = false;
    // },
    // 获取上传文件Token
    getToken(host) {
      UploadFile.getToken(host, this.userInfo).then((d) => {
        if (d.BK_CODE === "000000000000") {
          this.token = d.Token;
          this.options.query.Token = d.Token;
        }
      });
    },
    getUserInfo() {
      return Axios({
        method: "post",
        url: "/ecpJson.action",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
        data: {
          _fw_service_id: "wbGetUserInfo",
        },
      }).then((d) => {
        if (d.data.result === "SUCCESS") {
          return Promise.resolve(d.data.data);
        }
      });
    },
    onFileAdded(file) {
      const fileSize = file.size / 1024 / 1024;
      let fileName = file.name.substr(0, file.name.lastIndexOf("."));
      if (fileName.length > 40) {
        this.$message("文件名过长，文件名不超过40个字符！");
        file.ignored = true;
        return;
      }
      // 文件大小不能为0
      if (fileSize === 0) {
        file.ignored = true;
        return;
      }
      // 文件大小限制maxSize、最多文件上传数limit
      if (fileSize > this.maxSize || !(this.fileList.length < this.limit)) {
        this.$message("上传文件过大或个数限制");
        file.ignored = true;
        return;
      }

      if (this.exceptList.length && this.isCheckRepeatability) {
        for (let i = 0; i < this.exceptList.length; i++) {
          if (this.exceptList[i].name == file.name) {
            this.$message("附件中已经有同名文件，请重新上传");
            file.ignored = true;
            return;
          }
        }
      }

      // 文件类型判断
      if (this.accept.length) {
        let typeArray = file.name.split(".");
        if (!this.isCheckRepeatability) {
          //如果是副本本图片或者封面，那把图片名字改成一个随机数
          let randomStr = Base64.encode(file.name + Math.random());
          file.randomName = randomStr + "." + typeArray[typeArray.length - 1];
        }
        let type = typeArray[typeArray.length - 1].toLocaleLowerCase();
        // const typeType = file.name.slice(file.name.indexOf('.'))
        // console.log('typeType',typeType)
        console.log("type", type);
        const typeStr = this.accept.join();
        if (typeStr.indexOf(type) === -1) {
          console.log("type", type);
          this.$message("上传文件类型不符");
          file.ignored = true;
          return;
        }
      }
      this.panelShow = true;
      const chunkSize = this.options.chunkSize;
      const chunks = {
        chunkSize,
        total: Math.ceil(file.size / chunkSize),
      };
      this.fileList.push(file);
      //暂停上传文件/文件片段
      // file.pause();
      // 上传文件元数据
      UploadFile.bigFileMd5Service(this.host, this.token, file, chunks, this.userInfo).then((d) => {
        console.log(d);
        if (d.BK_CODE === "000000000000") {
          const fileData = d.FILE_GRP;
          file.File_ID = fileData.File_ID;
          this.options.query.File_ID = fileData.File_ID;
          // file.resData = { ...d };
          // this.options.query.File_ID = fileData.File_ID;

          //生成文件url
          console.log(1111111111111111);
          console.log(d.FILE_GRP.P9_File_Index_No);
          if (d.FILE_GRP && d.FILE_GRP.P9_File_Index_No) {
            file.P9_File_Index_No = d.FILE_GRP.P9_File_Index_No;
          }
          // 计算MD5
          this.computeMD5(file);
        } else {
          this.statusSet(file.id, "uploadMetaFailed");
        }
      });
    },
    onFileRemoved(file) {
      if (this.fileList.length) {
        this.fileList = this.fileList.filter((f) => f.id !== file.id);
      }
    },
    async onFileSuccess(rootFile, file, response) {
      let res = JSON.parse(response);
      console.log(".......................onFileSuccess");
      console.log(res);
      console.log(file);
      if (res.BK_CODE === "000000000000") {
        file.resData = { ...res };
        file.resData.P9_File_Index_No = file.P9_File_Index_No;
        let fileId = file.resData.P9_File_Index_No;
        file.fileUrl = await DownloadFile.getFileUrl(fileId);
      }
    },
    onFileError(rootFile, file, error) {
      console.log(error, file);
    },
    computeMD5(file) {
      let fileReader = new FileReader();
      let time = new Date().getTime();
      console.log(time);
      let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
      let currentChunk = 0;
      let chunkSize = this.options.chunkSize;
      let chunks = Math.ceil(file.size / chunkSize);
      let spark = new SparkMD5.ArrayBuffer();
      //暂停上传文件/文件片段
      file.pause();
      // 文件状态设置
      this.statusSet(file.id, "md5");

      loadNext();
      let md5Arr = [];
      // 文件添加计算md5的状态
      file.status = "md5Completing";
      fileReader.onload = (e) => {
        spark.append(e.target.result);
        let md5 = spark.end();
        md5Arr.push(md5);
        if (currentChunk < chunks) {
          let start = currentChunk * chunkSize;
          let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
          console.log(end);
          currentChunk++;
          loadNext();
          // })
        } else {
          this.computeMD5Success(md5Arr, file);
        }
      };
      fileReader.onerror = function () {
        file.cancel();
      };
      // 获取文件分片
      function loadNext() {
        let start = currentChunk * chunkSize;
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize;
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end));
      }
    },

    computeMD5Success(md5Arr, file) {
      file.md5Arr = [...md5Arr];
      // 计算md5完成，移除状态
      file.status = "md5Completed";
      this.statusRemove(file.id);
      file.resume();
    },
    upload() {
      let isUploadedAll = true;
      console.log(this.fileList);
      for (let i = 0; i < this.fileList.length; i++) {
        let file = this.fileList[i];
        if (!file.resData) {
          isUploadedAll = false;
          break;
        }
      }
      if (isUploadedAll) {
        this.submit = true;
        this.onClose();
        this.$emit("fileList", this.fileList);
      } else {
        this.$alert("文件正在上传中，请稍后", "温馨提示");
      }
    },
    /**
     * 自定义状态: 'md5'、'metaFailed'
     * @param id
     * @param status
     */
    statusSet(id, status) {
      const statusMap = {
        md5: {
          id: "md5",
          text: "校验MD5中",
          bgc: "#fff",
        },
        uploadMetaFailed: {
          id: "uploadMetaFailed",
          text: "上传文件元数据失败",
          bgc: "#fff",
        },
      };
      const statusText = document.createElement("p");
      statusText.classList.add(`myStatus_${id}`);
      statusText.setAttribute("data-type", statusMap[status].id);
      statusText.innerText = statusMap[status].text;
      statusText.style = `position: absolute; top: 0; z-index: 1; background-color: ${statusMap[status].bgc}`;
      this.$nextTick(() => {
        // 获取当前文件状态节点
        const parent = document.getElementsByClassName(`uploader-file file_${id}`)[0].getElementsByClassName(`uploader-file-status`)[0];
        parent.appendChild(statusText);
      });
    },
    statusRemove(id) {
      this.$nextTick(() => {
        document.getElementsByClassName(`myStatus_${id}`)[0].remove();
      });
    },
  },
};
</script>

<style lang="scss">
#BigFileUpload {
  .uploader-file-name {
    .uploader-file-icon {
      display: none;
    }
  }
  #global-uploader-btn {
    margin-bottom: 20px;
  }
}
</style>
