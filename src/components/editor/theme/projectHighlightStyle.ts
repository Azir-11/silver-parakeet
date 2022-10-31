import { tags } from "@lezer/highlight";
import { HighlightStyle } from "@codemirror/language";

export const projectHighlightStyle = HighlightStyle.define([
  // 数字
  { tag: tags.number, color: "#FF9070" },
  // 布尔
  { tag: tags.bool, color: "#cf68d7" },
  // 关键词
  { tag: tags.keyword, color: "#A78CFA" },
  // 行注释
  { tag: tags.comment, color: "#676E95", fontStyle: "italic" },
  // 块注释
  { tag: tags.blockComment, color: "#676e95", fontStyle: "italic" },
  // 尖括号
  { tag: tags.angleBracket, color: "#838FA7" },
  // 方括号
  { tag: tags.squareBracket, color: "#838FA7" },
  // 括号
  { tag: tags.paren, color: "#838FA7" },
  // 大括号
  { tag: tags.brace, color: "#838FA7" },
  // 括号里面的内容
  { tag: tags.tagName, color: "#e06c60" },
  // 文本内容
  { tag: tags.content, color: "#b0b7c3" },
  // 类名
  { tag: tags.className, color: "#98c36e" },
  // 变量名
  { tag: tags.variableName, color: "#b0b7c3" },
  // 宏的名称
  { tag: tags.macroName, color: "red" },
  // 字符串文本
  { tag: tags.literal, color: "#98c379" },
  // 程序或标记标点符号(冒号)
  { tag: tags.punctuation, color: "#8E99B1", margin: "0 2px" },
  // 分号
  { tag: tags.separator, color: "#676E95", margin: "0 2px" },
  // 字符串文本
  { tag: tags.color, color: "#98c371" },
  // 正则文本
  { tag: tags.regexp, color: "#E4BF7F" },
  // 转移文本
  { tag: tags.escape, color: "#676E95" },
  // 布尔类型文本
  { tag: tags.bool, color: "#FF6AB3" },
  // 变量名称
  { tag: tags.variableName, color: "#B0B7C3" },
  // 属性或字段名称
  { tag: tags.propertyName, color: "#E06C75" },
  // 自我或这个关键字对象
  { tag: tags.self, color: "#CF68E1" },
  { tag: tags.null, color: "#CF68E1" },
  { tag: tags.atom, color: "#CF68E1" },
  { tag: tags.operatorKeyword, color: "#CF68E1" },
  // 与控制流相关的关键字
  { tag: tags.controlKeyword, color: "#CF68E1" },
  // 运算符
  { tag: tags.operator, color: "#56B7C3", margin: "0 2px" },
  // 与算术相关的运算符
  { tag: tags.arithmeticOperator, color: "#56B7C3" },
  // 逻辑运算符
  { tag: tags.logicOperator, color: "#56B7C3" },
  // 位运算符
  { tag: tags.bitwiseOperator, color: "#56B7C3" },
  // 比较运算符
  { tag: tags.compareOperator, color: "#56B7C3" },
  // 链接
  { tag: tags.link, color: "#98C379" },
]);
