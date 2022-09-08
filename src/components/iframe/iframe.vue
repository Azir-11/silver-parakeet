<template>
  <iframe ref="iframeRef" :width="`${props.width}px`" :height="`${props.height}px`"> </iframe>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import type { codeItem } from "@/hooks/setting/useWebCodes";
import { ComputedRef } from "vue";
import IframeHandler from "@/utils/handleInstanceView";
import { compileHTML, compileJS, compileCSS } from "@/utils/compiler";

const props = defineProps({
  width: {
    type: Number,
    default: 640,
  },
  height: {
    type: String,
    default: "480",
  },
});

const webCodes = useWebCodes();

const editorTotalCode: ComputedRef<codeItem> = computed(() => {
  return webCodes.getTotalCode;
});

const iframeRef = ref<HTMLIFrameElement>(null);
const iframeWindows = ref(null);
let timer;
onMounted(() => {
  runCode(iframeRef.value);
  watch(editorTotalCode.value, (_newValue, _oldValue) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      runCode(iframeRef.value);
    }, 500);
  });
});

const runCode = async (iframe: HTMLIFrameElement): Promise<void> => {
  let HTMLCode = editorTotalCode.value[0].code,
    CSSCode = editorTotalCode.value[1].code,
    JSCode = editorTotalCode.value[2].code;

  iframe.src += " ";
  if (webCodes.getIndex <= 2) {
    await compileHTML(HTMLCode, "0").then((res: string) => {
      HTMLCode = res;
    });
    await compileCSS(CSSCode, "0").then((res: string) => {
      CSSCode = res;
    });
    await compileJS(JSCode, "0").then((res: string) => {
      JSCode = res;
    });
  }

  const IframesHandler = new IframeHandler(iframe);

  IframesHandler.insertCode({ HTMLCode, CSSCode, JSCode }, false);
};
</script>

<style scoped></style>
