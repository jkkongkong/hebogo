/*
 * @Author: your name
 * @Date: 2021-05-27 14:36:48
 * @LastEditTime: 2021-07-19 10:11:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\store\getters.ts
 */
const getters = {
  isEditing: (state) => state.resourceManage.isEditing,
  currentResource: (state) => state.resourceManage.currentResource,
};
export default getters;
