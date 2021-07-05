/*
 * @Author: your name
 * @Date: 2021-05-17 19:01:40
 * @LastEditTime: 2021-06-11 15:10:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\http\index.ts
 */
import axios from "axios";
import { Base64 } from "js-base64";
import qs from "qs";
(window as any).axios = axios;
const instance = axios.create({
  timeout: 20000,
  // baseURL: "",
  // baseURL: "/api",
});

// 拦截请求
instance.interceptors.request.use(function (config) {
  const param = qs.parse(config.data);
  if (config.method == "post") {
    const time = (window as any).pjfWebsa.getServerTimestamp() - 30000;
    const macRst = (window as any).pjfWebsa.macContent(`${param.jsonData}${time}`);
    if (macRst.success) {
      config.headers["X-Request-Timestamp"] = time;
      config.headers["Signature"] = `ccb-mac=${macRst.data}`;
    }
  }
  return config;
});

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    const { data } = response;
    if (!data.success) {
      switch (data.code) {
        // 没有权限
        case 4005:
          window.location.href = `${window.location.origin}/login`;
          break;
      }
    }
    if (data.Data_Cntnt) {
      const returnMessage = JSON.parse(Base64.decode(data.Data_Cntnt));
      return returnMessage;
    }
    return data;
  },
  (error) => {
    // removePending(error.config)
    return Promise.reject(error);
  }
);

export default instance;
