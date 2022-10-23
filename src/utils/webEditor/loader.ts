/**
 * Cache module to prevent the same module from being introduced multiple times
 * 缓存模块，防止多次引入相同模块
 */

class Loader {
  static instance: any;
  map: {};
  constructor() {
    if (!Loader.instance) {
      Loader.instance = this;
      this.map = {};
    }
    return Loader.instance;
  }
  async loadScript(url: string) {
    const head = document.getElementsByTagName("head")[0];
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;
    head.appendChild(script);
    return new Promise<void>((resolve) => {
      script.onload = () => {
        resolve();
      };
    });
  }
  async loadUrl(url: string) {
    let text = "";
    await fetch(url)
      .then(async (res) => res.blob())
      .then((res) => res.text())
      .then((res) => {
        text = res;
      });
    return text;
  }
  set(k: string, v: unknown) {
    this.map[k] = v;
  }
  has(k: string) {
    return this.map.hasOwnProperty(k);
  }
  get(k: string) {
    return this.map[k];
  }
}
export default Loader;
