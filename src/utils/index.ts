import { h } from "vue";
import type { Component } from "vue";
import { NIcon, NTag } from "naive-ui";
import { PageEnum } from "@/enums/pageEnum";
import { isString, isObject } from "./is/index";
// import { cloneDeep } from "lodash-es";

function handleError(e: Error) {
  console.error(e);
}

/**
 * render 图标
 * */
export function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

/**
 * render new Tag
 * */
const newTagColors = { color: "#f90", textColor: "#fff", borderColor: "#f90" };
export function renderNew(type = "warning", text = "New", color: object = newTagColors) {
  return () =>
    h(
      NTag as any,
      {
        type,
        round: true,
        size: "small",
        color,
      },
      { default: () => text },
    );
}
/**
 *  深拷贝
 * */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
