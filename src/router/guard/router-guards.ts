import type { Router } from "vue-router";
import { isNavigationFailure } from "vue-router";
import { useRouteStore } from "@/stores";
import { PageEnum } from "@/enum";

const INVALID_PATH_NAME = PageEnum.INVALID_NAME;
const NOT_FOUND_PATH = PageEnum.NOT_FOUND_PATH;

export function createRouterGuards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    //开启loading
    const Loading = window["$loading"] || null;
    Loading && Loading.start();
    const route = useRouteStore();

    if (!route.isInitAuthRoute) {
      console.log("1", 1);
      await route.initAuthRoute();

      if (to.name === INVALID_PATH_NAME) {
        // 若路由是从根路由重定向过来的，重新回到根路由
        const ROOT_ROUTE_NAME = "root";
        const path = to.redirectedFrom?.fullPath === ROOT_ROUTE_NAME ? "/" : to.fullPath;
        next({ path, replace: true, query: to.query, hash: to.hash });
        return false;
      }
    }

    // 权限路由已经加载，仍然未找到，重定向到not-found
    if (to.name === INVALID_PATH_NAME) {
      next({ path: NOT_FOUND_PATH, replace: true });
      return false;
    }

    // 外链路由, 从新标签打开，返回上一个路由
    if (to.meta.href) {
      window.open(to.meta.href as string);
      next({ path: from.fullPath, replace: true, query: from.query });
      return;
    }

    next();
  });

  /**
   * 后置路由守卫
   */
  router.afterEach((to, _from, failure) => {
    //设置页面的标题
    document.title = (to?.meta?.title as string) || document.title;

    // 导航故障
    if (isNavigationFailure(failure)) {
      console.log("failed navigation", failure);
    }

    //loading完成
    const Loading = (window as any).$loading || null;
    Loading && Loading.finish();
  });

  router.onError((error) => {
    console.log(error, "路由错误");
  });
}
