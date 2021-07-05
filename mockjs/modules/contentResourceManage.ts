/*
 * @Author: wuxi
 * @Date: 2021-05-12 19:39:45
 * @LastEditTime: 2021-05-27 19:45:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\mock\modules\role.js
 */
// const Mock = require("mockjs");
import Mock from "mockjs";
const Random = Mock.Random;
/**
 * @description: 获取统计数据
 * @param {*} params
 * @return {*}
 */
export const staticsResource = function (params) {
  return {
    totalCount: Random.integer(10, 1000),
    favoriteCount: Random.integer(10, 1000),
    todayCount: Random.integer(10, 1000),
    SOURCE_LIST: [
      { sourceType: 1, totalCount: Random.integer(10, 1000) },
      // { sourceType: 2, totalCount: Random.integer(10, 1000) },
      // { sourceType: 3, totalCount: Random.integer(10, 1000) },
      { sourceType: 2, totalCount: Random.integer(10, 1000) },
    ],
  };
};
/**
 * @description: 获取资源详情
 * @param {*} params
 * @return {*}
 */
export const viewResource = function (params) {
  const re = {
    id: Random.integer(1000, 10000),
    title: Random.ctitle(3, 5),
    resourceType: 2,
    sourceType: 1,
    busType: Random.ctitle(3, 5),
    resourceLevel: Random.ctitle(3, 5),
    subject: Random.ctitle(3, 10),
    previewLength: Random.integer(3, 50),
    resourceSource: Random.ctitle(3, 10),
    summary: Random.cparagraph(),
    content: Random.cparagraph(),
    photoUrl: Random.img(),
    status: 1,
    createTime: Random.now(),
    fileSize: Random.integer(3, 50),
    commentCount: Random.integer(3, 50),
    favoriteCount: Random.integer(3, 50),
    shareCount: Random.integer(3, 50),
    viewCount: Random.integer(3, 50),
    validityDate: Random.now(),
    keyWord: Random.ctitle(3, 10),
    url: "https://www.baidu.com",
  };
  return re;
};
/**
 * @description: 搜索资源
 * @param {*} params
 * @return {*}
 */
export const searchResource = function (params) {
  const re = {
    pageSize: params.pageSize,
    totalCount: (Math.random() * 10000) | 0,
    startIndex: params.startIndex,
    data: [],
  };
  for (let i = 0; i < params.pageSize; i++) {
    // const temp = {
    //   id: Random.integer(1000, 10000),
    //   title: Random.ctitle(3, 20),
    //   resourceType: 1,
    //   sourceType: 1,
    //   status: 4,
    //   url: "https://www.baidu.com",
    //   createTime: Random.now(),
    //   favorite: Math.random() > 0.5 ? 0 : 1,
    // };
    const temp = {
      id: i + 1,
      title: "test" + i,
      resourceType: 1,
      sourceType: 1,
      status: 4,
      url: "https://www.baidu.com",
      createTime: "Random.now()",
      favorite: i % 2 == 1,
    };
    re.data.push(temp);
  }
  return re;
};
//batchUpdateResource
export const batchUpdateResource = function (params) {
  console.log(params);
  const re = {
    pageSize: params.pageSize,
    totalCount: (Math.random() * 10000) | 0,
    startIndex: params.startIndex,
    data: [],
  };
  const status = params.operateType;
  for (let i = 0; i < params.RESOURCE_GROUP.length; i++) {
    const temp = {
      id: params.RESOURCE_GROUP[i].id,
      operateType: status,
    };
    re.data.push(temp);
  }
  return re;
};
