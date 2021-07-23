/*
 * @Author: your name
 * @Date: 2021-07-06 11:43:13
 * @LastEditTime: 2021-07-19 09:53:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \hebogo\src\store\index.js
 */
import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
import resourceManage from "@/store/modules/resourceManage";
import getters from "./getters.js";

export default new Vuex.Store({
  modules: {
    resourceManage,
  },
  getters,
});
