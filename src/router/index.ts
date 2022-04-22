import Vue from "vue";
import VueRouter, { RouteConfig, Route } from "vue-router";
import { setGuard } from "./guard";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    component: () => import("views/login/Login.vue"),
    name: "login"
  },
  { path: "/login", redirect: "/" },
  {
    path: "/register",
    component: () => import("views/register/Register.vue"),
    name: "register"
  },
  {
    path: "/user/home",
    component: () => import("views/home/Home.vue"),
    name: "home",
    children: [
      {
        path: "my",
        component: () => import("components/my-music/MyMusic.vue"),
        name: "my"
      },
      {
        path: "upload",
        component: () => import("components/upload/Upload.vue"),
        name: "upload"
      },
      {
        path: "music_bank",
        component: () => import("components/music_bank/MusicBank.vue"),
        name: "music_bank"
      },
      {
        path: "setting",
        component: () => import("components/setting/Setting.vue"),
        name: "setting"
      }
    ]
  },
  {
    path: "*",
    component: () => import("@/views/404/404.vue"),
    name: "404"
  }
];

const push: (s: any) => Promise<Route> = VueRouter.prototype.push;
VueRouter.prototype.push = function(location: any) {
  return push.call(this, location).catch(error => error);
};

const router = new VueRouter({
  routes
});

setGuard(router);

export default router;
