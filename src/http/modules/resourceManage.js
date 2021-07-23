/*
 * @Author: your name
 * @Date: 2021-07-16 15:02:19
 * @LastEditTime: 2021-07-19 09:26:31
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\http\modules\resourceManage.js
 */
import request from "@/http";

export const queryResourceList = (params) => {
  return request({
    url: "/queryResourceList",
    method: "POST",
    data: params,
  });
};
export const createResource = (params) => {
  return request({
    url: "/createResource",
    method: "POST",
    data: params,
  });
};
export const updateResource = (params) => {
  return request({
    url: "/updateResource",
    method: "POST",
    data: params,
  });
};
export const patchDeleteResource = (params) => {
  return request({
    url: "/patchDeleteResource",
    method: "POST",
    data: params,
  });
};
export const getDetails = (params) => {
  return request({
    url: "/getDetails",
    method: "GET",
    data: params,
  });
};
