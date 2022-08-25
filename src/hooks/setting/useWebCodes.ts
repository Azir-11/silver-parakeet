export const tabsList: any = computed(() => {
  return ["HTML", "CSS", "JAVASCRIPT"];
});

interface codeItem {
  mode: string;
  code: string;
}

const codeList = ref<Array<codeItem>>([
  {
    mode: "HTML",
    code: "<h1> hello,world </h1>",
  },
  {
    mode: "CSS",
    code: "h1{color:red}",
  },
  {
    mode: "JAVASCRIPT",
    code: "console.log('hello,world')",
  },
]);

const index = ref<number>(0);

export const useWebCodes = defineStore({
  id: "webCodes",
  state: () => ({
    index,
    codeList,
  }),
  getters: {
    getModes() {
      return this.codeList.map((item) => {
        return item.mode;
      });
    },
    getIndex() {
      return this.index;
    },
  },
  actions: {
    setIndex(value: number) {
      this.index = value;
    },
  },
});
