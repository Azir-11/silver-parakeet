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
      <Iframe
        class="bg-white"
        :width="resultBoxWidth"
        :height="iframeHeight"
        :is-visible="iframeVisible"
      ></Iframe>
      <Console
        :width="resultBoxWidth"
        :height="consoleHeight"
        @resize-console="resizeConsole"
      ></Console>
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
import { useMouse } from "@vueuse/core";
const consoleHeight = ref<number>(0); //控制台高度
const aSideRef = ref<HTMLElement>(null); //iframe+控制台高度
const iframeHeight = ref<number>(480);
const editorWidth = ref<number>(0);
const resultBoxWidth = ref<number>(0);
const watchWidthandHeight = () => {
  editorWidth.value = document.body.clientWidth / 2;
  resultBoxWidth.value = document.body.clientWidth - editorWidth.value - 60;
};

const codeStore = useWebCodes();
const editorActiveIndex = computed(() => codeStore.index);
const editorModes = computed(() => codeStore.getModes);
const editorCode = computed(() => codeStore.getModeCode);
const { y } = useMouse();
const iframeVisible = ref<boolean>(false);
const resizeConsole = (e: MouseEvent) => {
  iframeVisible.value = true;
  const startY = e.clientY;
  const viewHeight = consoleHeight.value + iframeHeight.value;
  // console.log(viewHeight);
  document.onmousemove = (ev: any) => {
    const iEvent = ev || event;
    console.log(ev.clientY);
    const finHeight = consoleHeight.value - iEvent.clientY + startY;
    if (finHeight > 50 && viewHeight - finHeight > 0) {
      consoleHeight.value = finHeight;
      iframeHeight.value = viewHeight - finHeight;
    }
    document.onmouseup = () => {
      iframeVisible.value = false;
      document.onmouseup = null;
      document.onmousemove = null;
    };
  };
};

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
  iframeHeight.value = aSideRef.value.firstElementChild.clientHeight;
  consoleHeight.value = aSideRef.value.scrollHeight - iframeHeight.value - 34;
  window.addEventListener("resize", watchWidthandHeight);
});
</script>

<style></style>
