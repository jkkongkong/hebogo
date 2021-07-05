/*
 * @Author: wuxi
 * @Date: 2021-05-12 19:39:45
 * @LastEditTime: 2021-05-25 20:05:58
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\mock\modules\role.js
 */
// const Mock = require("mockjs");
import Mock from "mockjs";
const Random = Mock.Random;

Mock.mock("/api/userLogin", "post", (option) => {
  console.log(option);
  return { code: 200, data: Random.natural(10, 20) };
});

Mock.mock(RegExp("/api/getUserInfo" + ".*"), "get", (option) => {
  console.log(option);
  return {
    code: 200,
    data: { name: Random.cname(), age: Random.natural(15, 40) },
  };
});
