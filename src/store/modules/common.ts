/*
 * @Author: your name
 * @Date: 2021-05-27 14:27:37
 * @LastEditTime: 2021-06-15 09:44:48
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\store\modules\common.ts
 */
import { getUserInfo } from "@/http/modules/common";
const state = {
  userInfo: null,
  isInFrame: false,
};

const mutations = {
  SET_USER_INFO: (state, val) => {
    state.userInfo = { ...val };
  },
  SET_IS_IN_FRAME: (state, val) => {
    state.isInFrame = val;
  },
};

const actions = {
  async setUserInfo({ commit }) {
    const re = await getUserInfo();
    if (re && re.data && (re as any).result == "SUCCESS") {
      commit("SET_USER_INFO", re.data);
    }
  },
  setIsInFrame({ commit }, status) {
    commit("SET_IS_IN_FRAME", status);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
