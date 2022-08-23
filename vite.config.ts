import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { NaiveUiResolver } from "unplugin-vue-components/resolvers";

import eslintPlugin from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
        charset: false,
        // additionalData: '@import "./src/assets/style/global.less";',
      },
    },
  },
  plugins: [
    vue(),
    Components({
      resolvers: [NaiveUiResolver()],
    }),
    eslintPlugin({
      include: ["src/**/*.js", "src/**/*.vue", "src/*.js", "src/*.vue"],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // ...
          codemirror: [
            // Split CodeMirror code.
            "codemirror",
            "@codemirror/autocomplete",
            "@codemirror/commands",
            "@codemirror/language",
            "@codemirror/lint",
            "@codemirror/search",
            "@codemirror/state",
            "@codemirror/view",
            // Add the following as needed.
            "@codemirror/lang-html",
            "@codemirror/lang-javascript",
          ],
          // ...
        },
      },
    },
  },
});
