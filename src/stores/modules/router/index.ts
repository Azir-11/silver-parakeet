import type { RouteRecordRaw } from "vue-router";
import { store } from "@/stores";
import { router } from "@/router";
import { asyncRoutes } from "@/router";

export interface AsyncRouteState {
  /** 菜单 */
  menus: RouteRecordRaw[];
  /** 路由 */
  routers: any[];
  /** 缓存的路由 */
  keepAliveComponents: string[];
  /** 是否初始化了权限路由 */
  isInitAuthRoute: boolean;
}

export const useRouteStore = defineStore({
  id: "app-async-route",
  state: (): AsyncRouteState => ({
    menus: [],
    routers: asyncRoutes,
    keepAliveComponents: [],
    isInitAuthRoute: false,
  }),
  getters: {
    getMenus(): RouteRecordRaw[] {
      return this.menus;
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute;
    },
  },
  actions: {
    getRouters() {
      return toRaw(this.routers);
    },
    setDynamicAddedRoute(added: boolean) {
      this.isDynamicAddedRoute = added;
    },
    // 设置动态路由
    setRouters(routers: any) {
      this.routers = asyncRoutes.concat(routers);
    },
    setMenus(menus: any) {
      // 设置动态路由
      this.menus = menus;
    },
    setKeepAliveComponents(compNames: any) {
      // 设置需要缓存的组件
      this.keepAliveComponents = compNames;
    },
    async initDynamicRoute() {
      let accessedRouters = asyncRoutes;
      this.setRouters(accessedRouters);
      this.setMenus(accessedRouters);
      const routes = toRaw(accessedRouters);
      routes.forEach((item) => {
        router.addRoute(item as unknown as RouteRecordRaw);
      });
    },
    /** 初始化权限路由 */
    async initAuthRoute() {
      await this.initDynamicRoute();

      this.isInitAuthRoute = true;
    },
  },
});

// 需要在setup周期外使用
export function useAsyncRouteStoreWidthOut() {
  return useRouteStore(store);
}
