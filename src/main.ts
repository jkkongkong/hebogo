/*
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-07-05 09:18:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\main.ts
 */
import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "normalize.css/normalize.css";
import "@/utils/elementui";
import CollapseTransition from "element-ui/lib/transitions/collapse-transition";
Vue.component(CollapseTransition.name, CollapseTransition);
// const config = require("../public/config");
// if (config.isMock) {
// import "../mockjs/mock-server";
// }
Vue.config.productionTip = false;
Vue.prototype.$mock = process.env.NODE_ENV == "development";
Vue.config.devtools = true;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
