import { consoleinfo } from "@/utils/webEditor/console";

let consoleInfo = [];

export const useConsole = defineStore("console", {
  state: () => {
    return { consoleInfo };
  },
  getters: {
    getConsoleInfo(): consoleinfo[] {
      return this.consoleInfo;
    },
  },
  actions: {
    setConsoleInfo(info: consoleinfo[]) {
      this.consoleInfo = info;
    },
  },
});
