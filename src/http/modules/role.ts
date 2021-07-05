/*
 * @Author: your name
 * @Date: 2021-05-12 16:50:54
 * @LastEditTime: 2021-05-17 19:21:56
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\src\http\modules\role.ts
 */
import { AxiosPromise } from "axios";
import request from "@/http";
export function logining(data = {}): AxiosPromise {
  return request({
    url: "/userLogin",
    method: "post",
    data,
  });
}
export function getUserInfo(params = {}): AxiosPromise {
  return request({
    url: "/getUserInfo",
    method: "get",
    params,
  });
}
