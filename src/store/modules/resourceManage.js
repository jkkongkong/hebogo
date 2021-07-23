/*
 * @Author: your name
 * @Date: 2021-07-19 09:49:37
 * @LastEditTime: 2021-07-19 10:11:33
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\store\modules\resourceManage.js
 */
const state = {
  currentResource: null,
  isEditing: false,
  currentModule: "all",
};

const mutations = {
  SET_CURRENT_RESOURCE: (state, val) => {
    state.currentResource = { ...val };
  },
  SET_IS_EDITING: (state, val) => {
    state.isEditing = val;
  },
  SET_CURRENT_MODULE: (state, val) => {
    state.currentModule = val;
  },
};

const actions = {
  setCurrentResource({ commit }, val) {
    commit("SET_CURRENT_RESOURCE", val);
  },
  setIsEditing({ commit }, status) {
    commit("SET_IS_EDITING", status);
  },
  setCurrentModule({ commit }, val) {
    commit("SET_CURRENT_MODULE", val);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
