interface codeItem {
  mode: string;
  code: string;
}

/**
 * 初始值
 */
const codeList = ref<Array<codeItem>>([
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
    mode: "JAVASCRIPT",
    code: "console.log('hello,world')",
  },
]);

// const index = ref<number>(0);

export const useWebCodes = defineStore({
  id: "webCodes",
  state: () => ({
    index: 0,
    codeList,
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
