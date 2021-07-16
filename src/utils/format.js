/*
 * @Author: your name
 * @Date: 2021-07-16 18:22:29
 * @LastEditTime: 2021-07-16 18:25:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\utils\format.js
 */
import moment from "moment";
export const formatDate = (val) => {
  if (val) {
    return moment(val).format("YYYY/MM/DD ");
  } else {
    return null;
  }
};
