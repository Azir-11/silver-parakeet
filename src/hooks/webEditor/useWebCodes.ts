export interface codeItem {
  mode: string;
  code: string;
}

/**
 * 初始值
 */
const defultCodeList: Array<codeItem> = [
  {
    mode: "HTML",
    code: "<h1> hello,world </h1>",
  },
  {
    mode: "CSS",
    code: `h1{\n \tcolor:red\n}`,
  },
  {
    mode: "JavaScript",
    code: "console.log('hello,world') \n const a={name:'123', \n name:'456'} \n console.log(a)",
  },
];

export const useWebCodes = defineStore({
  id: "webCodes",
  state: () => ({
    index: 0,
    codeList: defultCodeList,
  }),
  getters: {
    getModes() {
      return this.codeList.map((item) => {
        return item.mode;
      });
    },
    getModeCode() {
      return this.codeList[this.index].code;
    },
    getTotalCode() {
      return this.codeList;
    },
    getIndex() {
      return this.index;
    },
  },
  actions: {
    setModeCode(newCode: string) {
      this.codeList[this.index].code = newCode;
    },
    setIndex(value: number) {
      this.index = value;
    },
    setTotalCode(datas: { HTML: string; CSS: string; JS: string }) {
      this.codeList[0].code = datas.HTML;
      this.codeList[1].code = datas.CSS;
      this.codeList[2].code = datas.JS;
    },
    setIndexModeCode(index: number, newCode: string) {
      this.codeList[index].code = newCode;
    },
  },
});
