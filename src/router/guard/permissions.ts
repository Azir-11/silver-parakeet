import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";
import { useRouteStore } from "@/stores/modules/asyncRoute";
import { PageEnum } from "@/enum";

const INVALID_PATH_NAME = PageEnum.INVALID_NAME;

export async function createPermissionGuard(
  to: RouteLocationNormalized,
  from: RouteLocationNormalized,
  next: NavigationGuardNext,
) {
  const route = useRouteStore();

  if (!route.isInitAuthRoute) {
    await route.initAuthRoute();

    if (to.name === INVALID_PATH_NAME) {
      // 动态路由没有加载导致被INVALID_PATH路由捕获，等待权限路由加载好了，回到之前的路由
      // 若路由是从根路由重定向过来的，重新回到根路由
      const ROOT_ROUTE_NAME = "root";
      const path = to.redirectedFrom?.fullPath === ROOT_ROUTE_NAME ? "/" : to.fullPath;
      next({ path, replace: true, query: to.query, hash: to.hash });
      return false;
    }
  }

  // 外链路由, 从新标签打开，返回上一个路由
  if (to.meta.href) {
    window.open(to.meta.href as string);
    next({ path: from.fullPath, replace: true, query: from.query });
    return;
  }

  next();
}
