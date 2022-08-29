import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

export const projectHighlightStyle = HighlightStyle.define([
  // 数字
  { tag: tags.number, color: "#e06c60" },
  // 布尔
  { tag: tags.bool, color: "#cf68d7" },
  // 空值
  { tag: tags.null, color: "#cf68d7" },
  // 关键词
  { tag: tags.keyword, color: "#fc6" },
  // 行注释
  { tag: tags.comment, color: "#676e95", fontStyle: "italic" },
  // 块注释
  { tag: tags.blockComment, color: "#676e95", fontStyle: "italic" },
  // 尖括号
  { tag: tags.angleBracket, color: "#9DA5B3" },
  // 尖括号里面的内容
  { tag: tags.tagName, color: "#e06c60" },
  // 方括号
  { tag: tags.squareBracket, color: "#6495e2" },
  // 文本内容
  { tag: tags.content, color: "#9DA5B3" },
  // 类名
  { tag: tags.className, color: "#98c36e" },
  // 定义关键词
  { tag: tags.definitionKeyword, color: "#a78cfa" },
  // 变量名
  { tag: tags.variableName, color: "#b0b7c3" },
  // 宏的名称
  { tag: tags.macroName, color: "#fff" },
]);
