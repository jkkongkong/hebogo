/*
 * @Author: your name
 * @Date: 2021-05-12 16:29:47
 * @LastEditTime: 2021-06-28 21:05:09
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue3-manual\src\config\axios.config.js
 */

//devServer proxy配置
const baseURL = "http://127.0.0.1:4000";

//是否使用mockjs
const isMock = false;

//标签交易码
const labelServiceId = "wbCallHaircut";
//资源交易码
const resourceServiceId = "AP201WC13";
//上传文件域名
const mobileFileUrl = "https://www.ccbjrxd.cn/sjapppl4";
const pcFileUrl = "http://128.196.121.120:8101";
module.exports = {
  baseURL,
  isMock,
  labelServiceId,
  resourceServiceId,
  mobileFileUrl,
  pcFileUrl,
};
