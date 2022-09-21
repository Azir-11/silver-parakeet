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
    code: `h1{
      color:red
    }`,
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
  },
});
