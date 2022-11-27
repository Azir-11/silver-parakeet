const externalLink = {
  cssLink: { list: [] },
  jsLink: { list: [] },
};
type externalLinkType = typeof externalLink;

export const useUpLoadState = defineStore("UpLoadState", {
  state: (): { externalLink: externalLinkType; isUpLoad: boolean } => {
    return { externalLink: externalLink, isUpLoad: false };
  },
  getters: {
    getExternalLink() {
      const { cssLink, jsLink } = this.externalLink;

      return { cssLinks: cssLink.list, JSLinks: jsLink.list };
    },
    isUpload(): boolean {
      return this.isUpload;
    },
  },
  actions: {
    setExternalLink(type: "cssLink" | "jsLink", list: string[]) {
      this.externalLink[type].list = list;
    },
    setUpload() {
      this.isUpLoad = true;
    },
  },
});
