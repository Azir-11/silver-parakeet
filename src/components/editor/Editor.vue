<template>
  <div id="editor" ref="dom"></div>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed } from "vue";
import { createEditor, editorSetting, destoryEditor } from "@/hooks/setting/globalCodeEditor";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import { LanguageSupport } from "@codemirror/language";

const props = defineProps({
  // 编译器内的文本
  modelValue: {
    type: String,
    default: "",
  },
  // 语言模式
  language: {
    type: String,
    default: "css",
  },
  // 主题
  theme: {
    type: String,
    default: "vs-dark",
  },
  //宽度
  width: {
    type: String,
    default: "600px",
  },
});

const getLanguage = (language: string): LanguageSupport => {
  switch (language) {
    case "HTML":
      return html();
    case "JAVASCRIPT":
      return javascript();
    case "CSS":
      return css();
  }
};

const setting: editorSetting = {
  defaultValue: props.modelValue,
  language: getLanguage(props.language),
  width: props.width,
};
onMounted(() => {
  let editor = createEditor(setting);
});
</script>

<style scoped>
.editor {
  /*动态绑定宽度*/
  width: v-bind(props.width);
  height: 90vh;
  transition: width 0.5s;
}
</style>
