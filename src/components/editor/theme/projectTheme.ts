import { EditorView } from "codemirror";
const bgColor = "#282c34";
export const Theme = EditorView.theme(
  {
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
      backgroundColor: "#324464",
      zIndex: "10",
    },
    // 光标所在行
    ".cm-activeLine": {
      backgroundColor: "rgba(47,50,59,0.4)",
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
    ".cm-line": {
      fontFamily: "'JetBrainsMono'",
    },
    // "&": {
    //   color: "white",
    //   backgroundColor: "#034",
    // },
    // ".cm-content": {
    //   caretColor: "#0e9",
    // },
    // "&.cm-focused .cm-cursor": {
    //   borderLeftColor: "#0e9",
    // },
    // "&.cm-focused .cm-selectionBackground, ::selection": {
    //   backgroundColor: "#074",
    // },
    // ".cm-gutters": {
    //   backgroundColor: "#045",
    //   color: "#ddd",
    //   border: "none",
    // },
  },
  { dark: true },
);
