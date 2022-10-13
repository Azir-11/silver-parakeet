<template>
  <section class="editorBox flex w-full h-full pt-1 box-border">
    <div v-for="(item, index) in editorModes" :key="index">
      <div v-if="index === editorActiveIndex" :class="`w-[${editorWidth}] h-full`">
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
    <!-- 这是个重置宽度的条 -->
    <div
      class="w-2 h-full transition-colors duration-300 cursor-w-resize"
      :class="editorStates.resizeBarShow ? 'bg-[#5e9cfb]' : ''"
      @mousedown="resizeResultBoxWidth"
    ></div>
    <div ref="aSideRef" :class="`w-[${resultBoxWidth}] h-full`">
      <Iframe
        class="bg-white"
        :width="resultBoxWidth"
        :height="iframeHeight"
        :is-visible="editorStates"
      ></Iframe>
      <Console
        :width="resultBoxWidth"
        :height="consoleHeight"
        @resize-console="resizeConsoleHeight"
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
import type { State } from "@/types/editor";
const consoleHeight = ref<number>(0); //控制台高度
const aSideRef = ref<HTMLElement>(null); //iframe+控制台高度
const iframeHeight = ref<number>(480);
const editorWidth = ref<number>(0);
const resultBoxWidth = ref<number>(0);
const watchWidthandHeight = () => {
  editorWidth.value = document.body.clientWidth / 2;
  resultBoxWidth.value = document.body.clientWidth - editorWidth.value - 60;
  iframeHeight.value = aSideRef.value.firstElementChild.clientHeight;
  consoleHeight.value = aSideRef.value.scrollHeight - iframeHeight.value - 34;
}; //监听宽度和高度

const codeStore = useWebCodes();
const editorActiveIndex = computed(() => codeStore.index);
const editorModes = computed(() => codeStore.getModes);
const editorCode = computed(() => codeStore.getModeCode);
/** 这三个变量editor的 */

const { x, y } = useMouse(); //vueuse获取document的鼠标的x,y轴
const editorStates = ref<State>({
  iframeVisble: false,
  iframeWidthShow: false,
  resizeBarShow: false,
}); //状态控制
const clearDocumentEvent = () => {
  document.onmouseup = () => {
    editorStates.value.iframeVisble = false;
    editorStates.value.iframeWidthShow = false;
    editorStates.value.resizeBarShow = false;
    document.onmouseup = null;
    document.onmousemove = null;
  };
};
const resizeConsoleHeight = () => {
  editorStates.value.iframeVisble = true;
  const startY = y.value;
  const consoleH = consoleHeight.value;
  const viewHeight = consoleHeight.value + iframeHeight.value;
  document.onmousemove = () => {
    const finH: number = consoleH - y.value + startY;
    if (finH > -7 && viewHeight - finH > 0) {
      consoleHeight.value = finH;
      iframeHeight.value = viewHeight - finH;
    }
    clearDocumentEvent();
  };
};

const resizeResultBoxWidth = () => {
  editorStates.value.iframeVisble = true;
  editorStates.value.iframeWidthShow = true;
  editorStates.value.resizeBarShow = true;
  const startX = x.value;
  console.log(startX);
  const resultBoxW = resultBoxWidth.value;
  const editorW = editorWidth.value;
  const viewWidth = resultBoxW + editorW;
  document.onmousemove = () => {
    console.log(x.value);
    const finW: number = editorW + x.value - startX + 6;

    if (finW > 106 && viewWidth - finW > 100) {
      editorWidth.value = finW;
      resultBoxWidth.value = viewWidth - finW;
    }
    clearDocumentEvent();
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
  window.addEventListener("resize", watchWidthandHeight);
});
</script>

<style></style>
