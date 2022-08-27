<template>
  <section class="editorBox flex w-full h-full pt-1 box-border">
    <div v-for="(item, index) in editorModes" :key="index">
      <div class="w-full h-full">
        <Editor
          v-if="index === editorActiveIndex"
          :width="editorWidth"
          :language="getLanguage(item)"
          :model-value="editorCode"
          :theme="oneDarkTheme"
          @change-code="changeCode"
        />
      </div>
    </div>
    <div class="w-full">
      <Iframe class="bg-white" :width="resultBoxWidth"></Iframe>
      <div class="console"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";
import { oneDarkTheme } from "@codemirror/theme-one-dark";

const editorWidth = ref<number>(800);
const resultBoxWidth = computed(() => {
  return document.body.clientWidth - editorWidth.value - 60;
});

const codeStore = useWebCodes();

const editorActiveIndex = computed(() => {
  return codeStore.index;
});
const editorModes = computed(() => {
  return codeStore.getModes;
});
const editorCode = computed(() => {
  return codeStore.getModeCode;
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

const changeCode = (newCode: string) => {
  codeStore.setModeCode(newCode);
};
</script>

<style></style>
