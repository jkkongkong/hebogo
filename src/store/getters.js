/*
 * @Author: your name
 * @Date: 2021-05-27 14:36:48
 * @LastEditTime: 2021-06-11 12:13:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\store\getters.ts
 */
const getters = {
  userInfo: (state) => state.common.userInfo,
  isInFrame: (state) => state.common.isInFrame,
  isEditing: (state) => state.contentResourceManage.isEditing,
  currentResource: (state) => state.contentResourceManage.currentResource,
};
export default getters;
