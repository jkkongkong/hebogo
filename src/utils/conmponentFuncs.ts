/*
 * @Author: your name
 * @Date: 2021-06-18 12:03:09
 * @LastEditTime: 2021-06-29 11:18:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\conmponentFuncs.ts
 */
/**
 * @description:改变下拉框得显示，当选择全部时，显示下拉框名字
 * @param {*} status:true：下拉框展开，false:下拉框关闭
 * @param {*} list:下拉框列表
 * @param {*} title:下拉框名字
 * @return {*}
 */
export const changeSelectLabe = (status, list, title) => {
  if (list && list.length) {
    list[0].label = status ? "全部" : title;
  }
};

/**
 * @description: 把富文本编辑器内容的图片url替换了
 * @param {*} content：富文本内容
 * @param {*} replaceUrl：替换成的目的url
 * @return {*} isPc：true:把手机url替换成pc的url，false：把pc的url替换成手机的
 */

const config = require("public/config/index");
export const replaceTextContent = (content, isPc = true) => {
  if (isPc) {
    return content && content.replace(/https:\/\/.*?(?=\/ecpweb)/g, config.pcFileUrl);
  } else {
    return content && content.replace(/http:\/\/.*?(?=\/ecpweb)/g, config.mobileFileUrl);
  }
};
