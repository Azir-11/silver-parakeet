import { template } from "lodash-es";

export interface codeItem {
  mode: string;
  code: string;
}

export interface codeType {
  HTML?: codeItem;
  CSS?: codeItem;
  SCSS?: codeItem;
  JS?: codeItem;
  VUE2?: codeItem;
  VUE3?: codeItem;
  JSX?: codeItem;
}

/**
 * 初始值
 */

const defaultCodeLists: codeType = {
  HTML: { mode: "HTML", code: "<h1> hello,world </h1>" },
  CSS: { mode: "CSS", code: "h1{\n \tcolor:red\n}" },
  JS: {
    mode: "JavaScript",
    code: "console.log('hello,world') \n const a={name:'123', \n name:'456'} \n console.log(a)",
  },
};

export const useWebCodes = defineStore({
  id: "webCodes",
  state: (): {
    codeList: codeType;
    templateType: string;
    index: number;
    templateMode: string[];
    cursorPosition: Object[];
    scroll: Object[];
  } => ({
    index: 0,
    templateType: "Vanilla",
    codeList: defaultCodeLists,
    templateMode: ["HTML", "CSS", "JS"],
    cursorPosition: [{ anchor: 0 }, { anchor: 0 }, { anchor: 0 }],
    scroll: [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
  }),
  getters: {
    getTeamplateModes(): Array<string> {
      if (this.templateType === "Vanilla") {
        this.templateMode = ["HTML", "CSS", "JS"];
      } else if (this.templateType === "VUE2") {
        this.templateMode = ["HTML", "CSS", "VUE2JS"];
      } else if (this.templateType === "VUE3") {
        this.templateMode = ["HTML", "CSS", "VUE3JS"];
      } else if (this.templateType === "react") {
        this.templateMode = ["HTML", "CSS", "JSX"];
      }
      return this.templateMode;
    },
    getModeCode(): string {
      return this.codeList[this.templateMode[this.index]].code;
    },
    getTotalCode(): codeType {
      return this.codeList;
    },
    getIndex(): number {
      return this.index;
    },
    getCursorPosition(): number {
      return this.cursorPosition[this.index].anchor;
    },
    getScroll(): { x: number; y: number } {
      return this.scroll[this.index];
    },
  },
  actions: {
    setModeCode(newCode: string) {
      this.codeList[this.templateMode[this.index]].code = newCode;
    },
    setIndex(value: number) {
      this.index = value;
    },
    setTotalCode(datas: { HTML: string; CSS: string; JS: string }) {
      const { HTML, CSS, JS } = datas;
      this.codeList["HTML"].code = HTML;
      this.codeList["CSS"].code = CSS;
      this.codeList["JS"].code = JS;
    },
    setIndexModeCode(index: number, newCode: string) {
      this.codeList[this.templateMode[index]].code = newCode;
    },
    setCursorPosition(anchor: number, index: number) {
      this.cursorPosition[index].anchor = anchor;
    },
    setScrollTop(left: number, top: number, index: number) {
      this.scroll[index].x = left;
      this.scroll[index].y = top;
    },
  },
});
