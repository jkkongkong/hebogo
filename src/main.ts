/*
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-06-29 20:32:06
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
if (process.env.NODE_ENV == "development") {
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
} else {
  (window as any).pjfWebsa.init({
    cb(data) {
      if (!data.success) {
        alert("Web sa 初始化失败，请联系技术支持部门(" + data.errmsg + ")");
      }
      new Vue({
        router,
        store,
        render: (h) => h(App),
      }).$mount("#app");
    },
  });
}
