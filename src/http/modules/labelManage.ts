/*
 * @Author: your name
 * @Date: 2021-05-25 16:49:50
 * @LastEditTime: 2021-06-28 09:49:28
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\http\modules\labelManage.ts
 */
import { common } from "@/http/modules/common";
import { Message } from "element-ui";
/**
 * @description: 根据标签id获取下级标签
 * @param {unknown} parameters:{parentTagId:标签ID,获取顶层标签，此值传-1,offset:偏移量,pageSize:分页大小}
 * @return {*}
 */

export async function getLabels(parameters: unknown) {
  console.log("getSubTagList");
  console.log(parameters);
  const re: any = await common("getSubTagList", parameters);
  if (re && re.result == "SUCCESS") {
    if (re.data.data && re.data.data.length) {
      const labelIcons = ["el-icon-user-solid", "el-icon-document-copy", "el-icon-notebook-2"];
      re.data.data.forEach((item, index) => {
        item.id = item.tagId;
        item.value = item.tagId;
        item.label = item.name;
        item.affectUserNum = item.affectUserNum > 0 ? item.affectUserNum : 0;
        item.icon = labelIcons[index];
      });
    }
    console.log("getSubTagList");
    console.log(parameters);
    console.log(re);
    return re.data.data || [];
  } else {
    if (re && re.message) console.log(re.message);
    console.log("getSubTagList------error");
    console.log(parameters);
    console.log(re);
    return [];
  }
}
/**
 * @description: 获取规则详情
 * @param {unknown} parameters
 * @return {*}
 */
export async function queryRuleDetails(parameters: unknown) {
  const re: any = await common("getTagDetailById", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("getTagDetailById");
    console.log(parameters);
    console.log(re);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    console.log("getTagDetailById------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}

/**
 * @description: 获取整个标签树
 * @param {unknown} parameters
 * @return {*}
 */
export async function getAllTrees(parameters: unknown) {
  const re: any = await common("searchTagTreePath", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("searchTagTreePath");
    console.log(parameters);
    console.log(re);
    return re.data || [];
  } else {
    if (re && re.message) console.log(re.message);
    console.log("searchTagTreePath------error");
    console.log(parameters);
    console.log(re);
    return [];
  }
}
