import {
  lineNumbers,
  highlightActiveLineGutter,
  highlightSpecialChars,
  drawSelection,
  dropCursor,
  rectangularSelection,
  crosshairCursor,
  highlightActiveLine,
  keymap,
} from "@codemirror/view";
export { EditorView } from "@codemirror/view";
import { EditorState, Extension } from "@codemirror/state";
import { indentWithTab } from "@codemirror/commands";
import {
  foldGutter,
  indentOnInput,
  syntaxHighlighting,
  defaultHighlightStyle,
  bracketMatching,
  foldKeymap,
} from "@codemirror/language";
import { history, defaultKeymap, historyKeymap } from "@codemirror/commands";
import { highlightSelectionMatches, searchKeymap } from "@codemirror/search";
import { projectHighlightStyle } from "../theme/projectHighlightStyle";
import {
  closeBrackets,
  autocompletion,
  closeBracketsKeymap,
  completionKeymap,
} from "@codemirror/autocomplete";
import { lintKeymap } from "@codemirror/lint";
import { expandAbbreviation, abbreviationTracker } from "@emmetio/codemirror6-plugin";
const emmetKeyMap = keymap.of([
  {
    key: "Tab",
    run: expandAbbreviation,
  },
]);
const basicSetup: Extension[] = (() => [
  //基础配置,添加了自己的语法高亮
  lineNumbers(), //行数
  highlightActiveLineGutter(), //选中此行的亮度
  highlightSpecialChars(), //选中代码的颜色
  history(), // ctrl-z dddd
  foldGutter({
    openText: "收",
    closedText: "开",
  }), //折叠按钮(中国风的收开!)
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(projectHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])();

const htmlSetup: Extension[] = (() => [
  //基础配置,添加了自己的语法高亮
  lineNumbers(), //行数
  highlightActiveLineGutter(), //选中此行的亮度
  highlightSpecialChars(), //选中代码的颜色
  history(), // ctrl-z dddd
  foldGutter({
    openText: "收",
    closedText: "开",
  }), //折叠按钮(中国风的收开!)
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(projectHighlightStyle, { fallback: true }),
  bracketMatching(),
  abbreviationTracker(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightActiveLine(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
  emmetKeyMap,
])();

const consoleSetup: Extension[] = (() => [
  //控制台配置,添加了自己的语法高亮
  highlightActiveLineGutter(),
  highlightSpecialChars(),
  history(),
  foldGutter({
    openText: "收",
    closedText: "开",
  }),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(projectHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])();

const exeCmdSetup: Extension[] = (() => [
  //控制台配置,添加了自己的语法高亮
  highlightSpecialChars(),
  history(),
  drawSelection(),
  dropCursor(),
  EditorState.allowMultipleSelections.of(true),
  indentOnInput(),
  syntaxHighlighting(projectHighlightStyle, { fallback: true }),
  bracketMatching(),
  closeBrackets(),
  autocompletion(),
  rectangularSelection(),
  highlightSelectionMatches(),
  keymap.of([
    ...closeBracketsKeymap,
    ...defaultKeymap,
    ...searchKeymap,
    ...historyKeymap,
    ...foldKeymap,
    ...completionKeymap,
    ...lintKeymap,
  ]),
])();

export { basicSetup, consoleSetup, emmetKeyMap, htmlSetup, exeCmdSetup };
