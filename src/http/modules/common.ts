/*
 * @Author: your name
 * @Date: 2021-05-25 16:58:01
 * @LastEditTime: 2021-06-25 14:30:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\http\modules\common.ts
 */

import request from "@/http";
import qs from "qs";
import { Base64 } from "js-base64";

export function common(funcCode: string, data: unknown, serviceId = "wbSimpleTransaction", transactionId = "AP201WC28") {
  const temp = {
    funcCode: funcCode,
    parameter: data,
  };
  console.log("common-----------------------");
  console.log(temp);
  const parameters = {
    _fw_service_id: serviceId,
    transaction_id: transactionId,
    jsonData: JSON.stringify({
      data: Base64.encode(JSON.stringify(temp)),
    }),
  };
  return request({
    url: "ecpJson.action",
    method: "post",
    data: qs.stringify(parameters),
  });
}

export function uploadFile(data: unknown) {
  return request({
    url: "ecpJson.action?_fw_service_id=wkbTransferFiles",
    method: "post",
    data: data,
  });
}
export function test(data: unknown, serviceId = "wbSimpleTransaction", transactionId = "AP201WC28") {
  const parameters = {
    _fw_service_id: serviceId,
    transaction_id: transactionId,
    jsonData: JSON.stringify({
      Parm_CfgLb_Val: JSON.stringify(data),
    }),
  };
  return request({
    url: "ecpJson.action",
    method: "post",
    data: qs.stringify(parameters),
  });
}

export function getUserInfo() {
  return request({
    url: "/ecpJson.action?_fw_service_id=wbGetUserInfo",
    method: "get",
  });
}
