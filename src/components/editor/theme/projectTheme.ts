import { EditorView } from "codemirror";
const bgColor = "#282c34";
export const projectTheme = EditorView.theme({
  "&": {
    color: "#b0b7c3",
    backgroundColor: bgColor,
  },
  ".cm-content": {
    caretColor: bgColor,
  },
  // 光标
  ".cm-cursor": {
    borderLeftColor: "#fff",
  },
  // 选中的代码
  "&.cm-focused .cm-selectionBackground, ::selection": {
    backgroundColor: "#394e75",
  },
  // 光标所在行
  ".cm-activeLine": {
    backgroundColor: "#2f323b",
    // borderTop: "#2c2c2c 1px solid",
    // borderBottom: "#2c2c2c 1px solid",
  },
  // 侧边行号栏
  ".cm-gutters": {
    backgroundColor: "#282c34",
    color: "#535773",
    border: "none",
  },
  // 选中的行号
  ".cm-activeLineGutter": {
    backgroundColor: "#282c34",
    color: "#9DA5B3",
  },
  // ".ͼc": {
  //   color: "#c678dd",
  // },
});
