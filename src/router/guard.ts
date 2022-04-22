import VueRouter from "vue-router";
import { getCookie } from "../utils/cookie";

export function setGuard(router: VueRouter) {
  router.beforeEach((to, from, next) => {
    if (to.path.indexOf("user") !== -1) {
      const isExisted = getCookie("islogin");
      if (isExisted) {
        next();
      } else {
        return router.push("/");
      }
    }
    next();
  });
}
