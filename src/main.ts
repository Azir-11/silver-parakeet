import App from "./App.vue";
import "./assets/css/taiwind.css";
import { setupStore } from "@/stores";
import { AppProvider } from "@/components/Application";

async function bootstrap() {
  const appProvider = createApp(AppProvider);

  const app = createApp(App);

  // 挂载状态管理
  setupStore(app);

  //优先挂载一下 Provider 解决路由守卫，Axios中可使用，Dialog，Message 等之类组件
  appProvider.mount("#appProvider", true);

  app.mount("#app", true);
}

const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);
void bootstrap();
