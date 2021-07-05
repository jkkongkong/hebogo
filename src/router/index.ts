/*
 * @Author: your name
 * @Date: 2021-05-17 17:09:17
 * @LastEditTime: 2021-06-22 10:35:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue2-bucket\src\router\index.ts
 */
import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/home",
    component: Home,
    children: [
      {
        path: "labelManage",
        name: "labelManage",
        component: () => {
          return import("@/views/LabelManage.vue");
        },
      },
      {
        path: "contentRecommend",
        name: "contentRecommend",
        component: () => {
          return import("@/views/ContentRecommend.vue");
        },
      },
      {
        path: "contentResourceManage",
        name: "contentResourceManage",
        component: () => {
          return import("@/views/ContentResourceManage.vue");
        },
      },
      {
        path: "",
        redirect: "labelManage",
      },
    ],
  },
  {
    path: "/test",
    name: "test",
    component: () => {
      return import("@/views/test/InterfaceTest.vue");
    },
  },
  {
    path: "/AITest",
    name: "AITest",
    component: () => {
      return import("@/views/test/AITest.vue");
    },
  },
  {
    path: "/dataService",
    name: "dataService",
    component: () => {
      return import("@/views/dataService/DataService.vue");
    },
  },
];

const router = new VueRouter({
  routes,
});

export default router;
