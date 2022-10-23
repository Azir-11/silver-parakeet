import { RouteRecordRaw } from "vue-router";
import { Layout } from "@/router/routes/constant";
import { renderIcon } from "@/utils/index";
import { LogoHtml5 } from "@vicons/ionicons5";

/**
 * @param name 路由名称, 必须设置,且不能重名
 * @param meta 路由元信息（路由附带扩展信息）
 * @param redirect 重定向地址, 访问这个路由时,自定进行重定向
 * @param meta.disabled 禁用整个菜单
 * @param meta.title 菜单名称
 * @param meta.icon 菜单图标
 * @param meta.keepAlive 缓存该路由
 * @param meta.sort 排序越小越排前
 *
 * */
const routes: Array<RouteRecordRaw> = [
  {
    path: "/webEditor",
    name: "webEditor",
    redirect: "/webEditor/index",
    component: Layout,
    meta: {
      icon: renderIcon(LogoHtml5),
    },
    children: [
      {
        path: "index",
        name: "webEditor_index",
        component: () => import("@/views/webEditor/index.vue"),
        meta: {
          title: "web编辑器",
        },
      },
    ],
  },
];

export default routes;
