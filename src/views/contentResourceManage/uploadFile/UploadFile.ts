import Axios from "axios";

Axios.defaults.withCredentials = true;
Axios.defaults.transformRequest = [
  function (data: any) {
    let ret = "";
    if (Object.prototype.toString.call(data) === "[object FormData]") {
      // 判断是否为FormData对象
      return data;
    } else {
      for (const it in data) {
        ret += encodeURIComponent(it) + "=" + encodeURIComponent(data[it]) + "&";
      }
      return ret;
    }
  },
];
// Add a request interceptor
Axios.interceptors.request.use(
  function (config) {
    let params = "";
    if (Object.prototype.toString.call(config.data) === "[object FormData]") {
      params = config.data.get("jsonData") || "";
    } else if (config.data && config.data.jsonData) {
      params = config.data.jsonData;
    }
    if (config.data && !config.data.noWebsa) {
      //添加请求头
      const timeNow = (window as any).pjfWebsa.getServerTimestamp();
      const macRst = (window as any).pjfWebsa.macContent(params + timeNow);
      if (macRst.success) {
        config.headers["X-Request-Timestamp"] = timeNow;
        config.headers["Signature"] = "ccb-mac=" + macRst.data;
        // macRst.data为计算出的mac
      } else {
        console.log(macRst.errmsg);
      }
    }
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
Axios.interceptors.response.use(
  function (response) {
    // 判断登录状态

    return response;
  },
  function (error) {
    console.error(error);
    const status = error && error.response && error.response.status;

    return Promise.reject(error);
  }
);

export class UploadFile {
  // 获取host
  static getFileCluster() {
    return Axios({
      method: "post",
      url: "/ecpJson.action",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      data: {
        _fw_service_id: "wbGetFileClusterInfo",
      },
    }).then((d) => Promise.resolve(d.data));
  }
  // 获取token
  static getToken(host: any, userInfo: any = {}) {
    return Axios({
      method: "post",
      url: host,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      params: {
        _fw_service_id: "bigFileTokenService",
      },
      data: {
        jsonData: JSON.stringify({
          MULTI_TENANCY_ID: "CN000",
          Bsn_Cmpt_ECD: "AP201_1",
          IP_Adr: location.hostname,
          Blng_InsID: userInfo.organization ? userInfo.organization && userInfo.organization.id : "000000001",
          Inst_Hier_Cd: "0",
          Ahn_ECD: "5d9fdfa15fab3f100144", //授权编码
          Blng_Lv1_Br_InsID: "", //所属一级分行机构编号
        }),
        noWebsa: true,
      },
    }).then((d) => Promise.resolve(d.data));
  }
  // 上传文件元数据
  static bigFileMd5Service(host: any, token: any, file: any, chunks: any, userInfo: any = {}) {
    const randomStr = this.getRandomCode(29);
    const date = this.getDate();
    const fileType = file.name.slice(file.name.indexOf("."));

    console.log("文件信息..........");
    console.log(location.hostname);
    console.log(file.name);
    console.log(file.size);
    return Axios({
      method: "post",
      url: host,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
      },
      params: {
        _fw_service_id: "bigFileMd5Service",
      },
      data: {
        jsonData: JSON.stringify({
          Token: token,
          P9_File_Index_No: `zh.ewp_doc.${date}.${randomStr}`, //P9业务ID，元数据信息保存送该值则会归档到一个P9业务ID下
          Rule_ID: "AP201_1_0001", //规则编号，业务组件编号_XXXX，例如A0161_1_0001
          MULTI_TENANCY_ID: "CN000", //多实体标识
          Bsn_Cmpt_ECD: "AP201_1", //业务组件编码
          Mac_Adr: "111.222.333.444.555",
          IP_Adr: location.hostname,
          Atch_Sz: chunks.chunkSize, //客户端固定大小切分文件
          Num: chunks.total, //分段数量
          File_Nm: file.name,
          File_Sz: file.size,
          File_Tp_Nm: fileType,
          Blng_InsID: userInfo.organization ? userInfo.organization && userInfo.organization.id : "000000001", //所属机构编号
          Inst_Hier_Cd: "0", //机构层级代码
          Crt_Psn_Nm: userInfo.name ? userInfo.name : "李巍炜", //创建人姓名
        }),
        noWebsa: true,
      },
    }).then((d) => Promise.resolve(d.data));
  }
  static getRandomCode(length: any) {
    let randomStr = "";
    const ARR = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    for (let i = 0; i < length; i++) {
      const idx = Math.floor(Math.random() * ARR.length);
      randomStr += ARR[idx];
    }
    return randomStr;
  }
  static getDate() {
    const now = new Date();
    const year = now.getFullYear();
    let month: any = now.getMonth() + 1;
    if (month < 10) {
      month = `0${month}`;
    }
    let date: any = now.getDate();
    if (date < 10) {
      date = `0${date}`;
    }
    return `${year}-${month}-${date}`;
  }
}
