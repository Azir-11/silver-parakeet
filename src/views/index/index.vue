<template>
  <section class="editorBox flex w-full h-full pt-1 box-border">
    <div v-for="(item, index) in editorModes" :key="index">
      <div v-if="index === editorActiveIndex" class="w-full h-full">
        <Editor
          :id="'editor'"
          :width="editorWidth"
          :language="getLanguage(item)"
          :model-value="editorCode"
          :theme="oneDarkTheme"
          @change-code="changeCode"
        />
      </div>
    </div>
    <div ref="aSideRef" class="w-full h-full pl-3">
      <Iframe class="bg-white" :width="resultBoxWidth"></Iframe>
      <div class="console" :style="{ height: consoleHeight - 24 + 'px' }">
        <Console :width="resultBoxWidth"></Console>
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
import { oneDarkTheme } from "@codemirror/theme-one-dark";
const consoleHeight = ref<number>(0);
const aSideRef = ref<HTMLElement>(null);
const editorWidth = ref<number>(0);
const resultBoxWidth = ref<number>(0);
const watchWidthandHeight = () => {
  editorWidth.value = document.body.clientWidth / 2;
  resultBoxWidth.value = document.body.clientWidth - editorWidth.value - 60;
  consoleHeight.value =
    aSideRef.value.scrollHeight - aSideRef.value.firstElementChild.clientHeight - 10;
};

const codeStore = useWebCodes();
const editorActiveIndex = computed(() => codeStore.index);
const editorModes = computed(() => codeStore.getModes);
const editorCode = computed(() => codeStore.getModeCode);

const getLanguage = (language: string): LanguageSupport => {
  switch (language) {
    case "HTML":
      return html();
    case "JavaScript":
      return javascript();
    case "CSS":
      return css();
  }
};

const changeCode = (newCode: string) => {
  codeStore.setModeCode(newCode);
};

onMounted(() => {
  watchWidthandHeight();
  window.addEventListener("resize", watchWidthandHeight);
});
</script>

<style></style>
