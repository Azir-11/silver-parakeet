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
 *  深拷贝
 * */
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key]) ? deepMerge(src[key], target[key]) : (src[key] = target[key]);
  }
  return src;
}
