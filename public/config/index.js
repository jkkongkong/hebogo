/*
 * @Author: your name
 * @Date: 2021-05-12 16:29:47
 * @LastEditTime: 2021-07-06 12:00:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\src\config\axios.config.js
 */

//devServer proxy配置
const baseURL = "http://127.0.0.1:4000";

//是否使用mockjs
const isMock = false;
module.exports = {
  baseURL,
  isMock,
};
