/*
 * @Author: wuxi
 * @Date: 2021-05-12 19:39:45
 * @LastEditTime: 2021-05-28 15:47:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\mock\modules\role.js
 */
// const Mock = require("mockjs");
import Mock from "mockjs";
const Random = Mock.Random;
const labels = {
  "-1": [
    { tagId: "l11", name: "用户标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l12", name: "内容标签", tagSource: "建行大学", affectUserNum: 40 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l13", name: "场景标签", tagSource: "建行大学", affectUserNum: 50 },
  ],
  l11: [
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
    { tagId: "l111", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 },
  ],
  l111: [
    { tagId: "l1111", name: "机构属性", tagSource: "建行大学", affectUserNum: 40 },
    { tagId: "l1112", name: "岗位属性", tagSource: "建行大学", affectUserNum: 50 },
    { tagId: "l1113", name: "人口属性", tagSource: "建行大学", affectUserNum: 23 },
  ],
  l12: [{ tagId: "l121", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 }],
  l13: [{ tagId: "l131", name: "静态标签", tagSource: "建行大学", affectUserNum: 30 }],
};
/**
 * @description: 获取标签列表
 * @param {*} params
 * @return {*}
 */
export const getSubTagList = function (params) {
  return labels[params.parentTagId];
};
/**
 * @description: 获取规则详情
 * @param {*} params
 * @return {*}
 */
export const getTagDetailById = function (params) {
  const re = {
    tagId: Random.id(),
    name: Random.ctitle(3, 5),
    description: Random.cparagraph(),
    type: "user",
    tagSource: "tagSource",
    isOn: 0,
    updateTime: "20210518 22:11:00",
    createTime: "20210518 22:11:00",
    creator_name: "杨明",
    affectUserNum: Random.integer(3, 50),
  };
  return re;
};
