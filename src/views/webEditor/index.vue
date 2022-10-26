<template>
  <div class="wh-full overflow-hidden flex flex-col">
    <section class="flex box-border wh-full">
      <div class="flex flex-1 flex-col">
        <nav class="pl-8">
          <n-tabs type="line">
            <n-tab
              v-for="(item, index) in webCodeStore.getModes"
              :key="index"
              :name="item"
              @click="changeMode(index)"
            >
              {{ item }}
            </n-tab>
          </n-tabs>
        </nav>
        <div id="editorHeight" class="flex-1">
          <div
            v-for="(item, index) in editorModes"
            :key="index"
            class="overflow-hidden"
            :style="index === editorActiveIndex ? `height:calc(100vh - 104.5px)` : ''"
          >
            <div
              v-if="index === editorActiveIndex"
              class="h-full overflow-x-hidden"
              :style="`width:${editorWidth}`"
            >
              <Editor
                :id="'editor'"
                :width="editorWidth"
                :language="getLanguage(item)"
                :model-value="editorCode"
                @change-code="changeCode"
              />
            </div>
          </div>
        </div>
      </div>
      <!-- resizeBar -->
      <div
        class="w-24 h-full transition-colors duration-300 cursor-w-resize"
        :class="editorStates.resizeBarShow ? 'bg-[#5e9cfb]' : 'bg-[#282c34]'"
        @mousedown="resizeResultBoxWidth"
      ></div>
      <div ref="ASideRef" class="h-full bg-[#282c34]" :style="`width:${resultBoxWidth - 12}px`">
        <Iframe :width="resultBoxWidth" :height="iframeHeight" :is-visible="editorStates"></Iframe>
        <Console
          :width="resultBoxWidth"
          :height="consoleHeight"
          @resize-console="resizeConsoleHeight"
        ></Console>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/webEditor/useWebCodes";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import type { LanguageSupport } from "@codemirror/language";
// import { oneDarkTheme } from "@codemirror/theme-one-dark";
import { useMouse } from "@vueuse/core";
import type { State } from "@/types/editor";

// 标签页列表
const webCodeStore = useWebCodes();

const changeMode = (index: number) => {
  webCodeStore.setIndex(index);
};

const consoleHeight = ref<number>(0); //控制台高度
const ASideRef = ref<HTMLElement>(null); //iframe+控制台高度
const iframeHeight = ref<number>(480);
const editorWidth = ref<number>(0);
const resultBoxWidth = ref<number>(0);
const watchWidthandHeight = () => {
  editorWidth.value = document.body.clientWidth / 2;
  resultBoxWidth.value = document.body.clientWidth - editorWidth.value - 60;
  iframeHeight.value = ASideRef.value.firstElementChild.clientHeight;
  consoleHeight.value = ASideRef.value.scrollHeight - iframeHeight.value - 34;
}; //监听宽度和高度

const editorActiveIndex = computed(() => webCodeStore.index);
const editorModes = computed(() => webCodeStore.getModes);
const editorCode = computed(() => webCodeStore.getModeCode);
/** 这三个变量editor的 */

const { x, y } = useMouse(); //vueuse获取document的鼠标的x,y轴
const editorStates = ref<State>({
  iframeVisible: false,
  iframeWidthShow: false,
  resizeBarShow: false,
}); //状态控制
const clearDocumentEvent = () => {
  document.onmouseup = () => {
    editorStates.value.iframeVisible = false;
    editorStates.value.iframeWidthShow = false;
    editorStates.value.resizeBarShow = false;
    document.onmouseup = null;
    document.onmousemove = null;
  };
};
const resizeConsoleHeight = () => {
  editorStates.value.iframeVisible = true;
  const startY = y.value;
  const consoleH = consoleHeight.value;
  const viewHeight = consoleHeight.value + iframeHeight.value;
  document.onmousemove = () => {
    const finH: number = consoleH - y.value + startY;
    if (finH > -7 && viewHeight - finH > 42) {
      consoleHeight.value = finH;
      iframeHeight.value = viewHeight - finH;
    }
    clearDocumentEvent();
  };
};

/**
 * @param leftborder 左边界
 * @param rightBorder 右边界
 */
const resizeResultBoxWidth = () => {
  const leftborder = 218,
    rightBorder = 180;
  editorStates.value.iframeVisible = true;
  editorStates.value.iframeWidthShow = true;
  editorStates.value.resizeBarShow = true;
  const startX = x.value;
  console.log(startX);
  const resultBoxW = resultBoxWidth.value;
  const editorW = editorWidth.value;
  const viewWidth = resultBoxW + editorW;
  document.onmousemove = () => {
    console.log(x.value);
    const finW: number = editorW + x.value - startX - 6;

    if (finW > leftborder && viewWidth - finW > rightBorder) {
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
  webCodeStore.setModeCode(newCode);
};

onMounted(() => {
  watchWidthandHeight();
  window.addEventListener("resize", watchWidthandHeight);
  console.log(
    'document.querySelector("#editorHeight")',
    document.querySelector("#editorHeight").clientHeight,
  );
});
</script>

<style></style>
