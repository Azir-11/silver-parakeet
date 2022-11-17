export const useWebEditorStates = defineStore({
  id: "WebEditorStates",
  state: () => ({
    line: 0,
    ch: 0,
    info: 0,
    error: 0,
    warn: 0,
  }),
  getters: {
    getLines() {
      return { line: this.line, ch: this.ch };
    },
    getLogsMsg() {
      return { error: this.error, warn: this.warn, info: this.info };
    },
  },
  actions: {
    setLines(line: number, ch: number) {
      this.line = line;
      this.ch = ch;
    },
    setLogsMsg(error: number, warn: number, info: number) {
      this.error = error;
      this.warn = warn;
      this.info = info;
    },
  },
});
