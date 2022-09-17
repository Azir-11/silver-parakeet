<template>
  <iframe
    ref="iframeRef"
    :width="`${props.width}px`"
    :height="`${props.height}px`"
    class="border-none"
    src="/html/instance.html"
  >
  </iframe>
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
let timer, timer2;
onMounted(() => {
  iframeWindows.value = iframeRef.value.contentWindow;
  runCode(iframeRef.value);
  watch(editorTotalCode.value, (_newValue, _oldValue) => {
    timer && clearTimeout(timer);
    timer2 && clearTimeout(timer2);
    timer2 = setTimeout(() => {
      timer = setTimeout(() => {
        iframeRef.value.src = "/html/instance.html";

        runCode(iframeRef.value);
      }, 100);
    }, 100);
  });
});

const runCode = async (iframe: HTMLIFrameElement): Promise<void> => {
  const IframesHandler = new IframeHandler(iframe);
  let HTMLCode = editorTotalCode.value[0].code,
    CSSCode = editorTotalCode.value[1].code,
    JSCode = editorTotalCode.value[2].code;
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
  setTimeout(async () => {
    await IframesHandler.insertCode({ HTMLCode, CSSCode, JSCode });
  }, 200);
};
</script>

<style scoped></style>
