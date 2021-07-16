/*
 * @Author: your name
 * @Date: 2021-07-16 15:02:19
 * @LastEditTime: 2021-07-16 15:06:21
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
