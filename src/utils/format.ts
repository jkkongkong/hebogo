/*
 * @Author: your name
 * @Date: 2021-06-02 11:22:57
 * @LastEditTime: 2021-06-21 18:30:14
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\utils\format.ts
 */
import moment from "moment";

//YYYY/MM/DD
export const formatTime1 = (cur: any) => {
  if (cur) {
    return moment(cur).format("YYYY/MM/DD ");
  } else {
    return "";
  }
};

//YY/MM/DD
export const formatTime2 = (cur: any) => {
  if (cur) {
    return moment(cur).format("YY/MM/DD ");
  } else {
    return "";
  }
};
