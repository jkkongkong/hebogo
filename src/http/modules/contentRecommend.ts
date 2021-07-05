/*
 * @Author: your name
 * @Date: 2021-06-17 18:11:51
 * @LastEditTime: 2021-06-28 11:39:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\http\modules\contentRecommend.ts
 */
import { common } from "@/http/modules/common";
import { Message } from "element-ui";

/**
 * @description: 获取规则详情
 * @param {unknown} parameters
 * @return {*}
 */
export async function queryRuleDetails(parameters: unknown) {
  const re: any = await common("getPushRuleDetailById", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("getPushRuleDetailById");
    console.log(parameters);
    console.log(re.data);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("获取规则详情失败！");
    console.log("getPushRuleDetailById------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}
/**
 * @description: 过去推送规则
 * @param {unknown} parameters
 * @return {*}
 */
export async function getPushRuleList(parameters: unknown) {
  const re: any = await common("getPushRuleList", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("getPushRuleList");
    console.log(parameters);
    console.log(re.data);
    return re.data || {};
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("获取规则列表失败！");
    console.log("getPushRuleList------error");
    console.log(parameters);
    console.log(re);
    return {};
  }
}

/**
 * @description: 新建推送规则
 * @param {unknown} parameters
 * @return {*}
 */
export async function addPushRule(parameters: unknown) {
  const re: any = await common("addPushRule", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("addPushRule");
    console.log(parameters);
    console.log(re.data);
    Message.success("成功创建规则！");
    return true;
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("新建规则失败！");
    console.log("addPushRule------error");
    console.log(parameters);
    console.log(re);
    return false;
  }
}

/**
 * @description: 更新推送规则
 * @param {unknown} parameters
 * @return {*}
 */
export async function updatePushRule(parameters: unknown) {
  const re: any = await common("updatePushRule", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("updatePushRule");
    console.log(parameters);
    console.log(re.data);
    Message.success("成功编辑规则！");
    return true;
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("编辑规则失败！");
    console.log("updatePushRule------error");
    console.log(parameters);
    console.log(re);
    return false;
  }
}

/**
 * @description: 删除推送规则
 * @param {unknown} parameters
 * @return {*}
 */
export async function deletePushRuleById(parameters: unknown) {
  const re: any = await common("deletePushRuleById", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("deletePushRuleById");
    console.log(parameters);
    console.log(re.data);
    Message.success("成功删除规则！");
    return true;
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("删除规则失败！");
    console.log("deletePushRuleById------error");
    console.log(parameters);
    console.log(re);
    return false;
  }
}

/**
 * @description: 推送规则启停
 * @param {unknown} parameters
 * @return {*}
 */
export async function pushRuleSwitcher(parameters: unknown) {
  const re: any = await common("pushRuleSwitcher", parameters);
  if (re && re.result == "SUCCESS") {
    console.log("pushRuleSwitcher");
    console.log(parameters);
    console.log(re.data);
    Message.success("成功修改规则状态！");
    return true;
  } else {
    if (re && re.message) console.log(re.message);
    Message.error("修改规则状态失败！");
    console.log("pushRuleSwitcher------error");
    console.log(parameters);
    console.log(re);
    return false;
  }
}
