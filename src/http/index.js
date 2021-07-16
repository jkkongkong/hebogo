/*
 * @Author: your name
 * @Date: 2021-07-16 14:55:22
 * @LastEditTime: 2021-07-16 15:39:23
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\http\index.js
 */
import axios from "axios";
const instance = axios.create({
  timeout: 20000,
  baseURL: "http://localhost:3000",
});

// 拦截请求
instance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) =>
    // removePending(error.config)
    Promise.reject(error)
);

// 拦截响应
instance.interceptors.response.use(
  (response) => {
    const { data } = response;

    // removePending(response.config)

    if (data.status != "Success") {
      return Promise.reject(response);
    }

    return data.data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
