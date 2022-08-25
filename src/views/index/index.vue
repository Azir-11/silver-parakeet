<template>
  <section>
    <div v-for="(item, index) in editorModes" :key="index" class="editor">
      <Editor
        v-if="index === editorActiveIndex"
        :width="`${width}px`"
        :language="getLanguage(item)"
        :model-value="editorCode"
        @change-code="changeCode"
      />
    </div>
    <div class="viewArea">
      <div class="iframeBox">
        <!-- <iframe width="680px" height="500px" src="../../public/html/instance.html"></iframe> -->
      </div>
      <div class="consoleBox">
        <div class="console"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";

let width = ref<number>(800);
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
