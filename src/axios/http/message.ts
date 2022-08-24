import type { NotificationType } from "naive-ui";
/**
 * 封装 naive-ui 的消息提示框
 * @param msg
 * @param type
 */
export const message = (msg: string, type: NotificationType = "info") => {
  const message = window["$message"];
  message[type](msg);
};
