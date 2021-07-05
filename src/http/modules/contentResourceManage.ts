/*
 * @Author: your name
 * @Date: 2021-05-26 10:58:50
 * @LastEditTime: 2021-06-29 14:10:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\http\modules\contentResourceManage.ts
 */
import { common } from "@/http/modules/common";
import { Message } from "element-ui";
import { sourceTypes, resourceTypes, resourceStatus, busTypes } from "@/utils/constant";
import { formatTime1 } from "@/utils/format";

/**
 * @description: 获取统计数据，包含全部资源和我的收藏的统计数据
 * @param {unknown} parameters
 * @return {*}
 */

export async function getStatistics(parameters: unknown) {
  const re: any = await common("staticsResource", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("staticsResource");
    console.log(parameters);
    console.log(re);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    console.log("staticsResource------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}

/**
 * @description: 获取资源详情
 * @param {unknown} parameters
 * @return {*}
 */
export async function getResourceDetails(parameters: unknown) {
  console.log("viewResource");
  console.log(parameters);
  const re: any = await common("viewResource", parameters);
  if (re && re.result == "SUCCESS") {
    re.data.resourceType = resourceTypes[re.data.resourceType];
    re.data.sourceType = sourceTypes[re.data.sourceType];
    re.data.status = resourceStatus[re.data.status];
    re.data.busType = busTypes[re.data.busType];
    re.data.createTime = formatTime1(re.data.createTime);
    re.data.validityDate = formatTime1(re.data.validityDate);
    //处理标签
    re.data.labels = [];
    if (re.data.tags && re.data.tags.length) {
      re.data.labels = re.data.tags.split(";");
    }
    if (re.data.TAG_GROUP && re.data.TAG_GROUP.length) {
      re.data.TAG_GROUP.map((item) => {
        re.data.labels.push(item.tagName);
      });
    }
    console.log("viewResource");
    console.log(re);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    console.log("viewResource------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}

/**
 * @description: 搜索资源
 * @param {unknown} parameters
 * @return {*}
 */
export async function queryResource(parameters: unknown) {
  const re: any = await common("searchResource", parameters);
  if (re && re.result == "SUCCESS") {
    if (re.data && re.data.data && re.data.data.length) {
      re.data.data.forEach((item) => {
        item.type = resourceTypes[item.resourceType];
        item.source = sourceTypes[item.sourceType];
        item.cstatus = resourceStatus[item.status];
        item.createTime = formatTime1(item.createTime);
      });
    }
    console.log("searchResource");
    console.log(parameters);
    console.log(re);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    console.log("searchResource------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}
/**
 * @description: 更新资源状态
 * @param {unknown} parameters
 * @return {*}
 */
export async function updateResourceStatus(parameters: unknown) {
  const re: any = await common("batchUpdateResource", parameters);
  if (re && re.result == "SUCCESS") {
    Message.success("成功更改资源状态!");
    console.log("batchUpdateResource");
    console.log(parameters);
    console.log(re);
    return re.data || [];
  } else {
    if (re && re.message) console.log(re.message);
    console.log("batchUpdateResource------error");
    console.log(parameters);
    console.log(re);
    return [];
  }
}

/**
 * @description: 创建资源
 * @param {unknown} parameters
 * @return {*}
 */
export async function createResource(parameters: unknown) {
  const re: any = await common("createResource", parameters);
  if (re && re.result == "SUCCESS") {
    Message.success("成功创建资源!");
    console.log("createResource");
    console.log(parameters);
    console.log(re);
  } else {
    if (re && re.message) console.log(re.message);
    console.log("createResource------error");
    console.log(parameters);
    console.log(re);
  }
  return re.result;
}
/**
 * @description: 编辑资源
 * @param {unknown} parameters
 * @return {*}
 */
export async function editResource(parameters: unknown) {
  const re: any = await common("updateResource", parameters);
  if (re && re.result == "SUCCESS") {
    if ((parameters as any).operateType == "-1") {
      Message.success("成功删除资源!");
    } else {
      Message.success("成功编辑资源!");
    }

    console.log("updateResource");
    console.log(parameters);
    console.log(re);
  } else {
    if (re && re.message) console.log(re.message);
    console.log("updateResource------error");
    console.log(parameters);
    console.log(re);
  }
  return re.result;
}
