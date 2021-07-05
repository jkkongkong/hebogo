/*
 * @Author: your name
 * @Date: 2021-05-25 16:07:03
 * @LastEditTime: 2021-06-11 12:13:40
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \ewp_contentoperation\src\store\index.ts
 */
import Vue from "vue";
import Vuex from "vuex";
import getters from "./getters.js";
Vue.use(Vuex);
import common from "@/store/modules/common";
import contentResourceManage from "@/store/modules/contentResourceManage";

export default new Vuex.Store({
  modules: {
    common,
    contentResourceManage,
  },
  getters,
});
