/*
 * @Author: your name
 * @Date: 2021-05-17 20:37:02
 * @LastEditTime: 2021-05-25 20:36:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\mockjs\mock-server.ts
 */
import Mock from "mockjs";

import "./modules/role";
import "./modules/common";

Mock.setup({
  timeout: "300-500", // 设置延迟响应，模拟向后端请求数据
});
