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
  } => ({
    index: 0,
    templateType: "Vanilla",
    codeList: defaultCodeLists,
    templateMode: ["HTML", "CSS", "JS"],
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
        this.templateMode = ["JSX", "CSS"];
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
  },
});
