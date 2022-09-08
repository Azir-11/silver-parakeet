<template>
  <iframe
    ref="iframeRef"
    :width="`${props.width}px`"
    :height="`${props.height}px`"
    src="/html/instance.html"
    sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-presentation allow-same-origin allow-scripts"
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
let timer;
onMounted(() => {
  iframeWindows.value = iframeRef.value.contentWindow;
  runCode(iframeRef.value);

  watch(editorTotalCode.value, (_newValue, _oldValue) => {
    iframeRef.value.src = "/html/instance.html";
    clearTimeout(timer);
    timer = setTimeout(() => {
      runCode(iframeRef.value);
    }, 500);
  });

  // watch(editorTotalCode.value, (_newValue, _oldValue) => {
  //   iframeRef.value.src = "/html/instance.html";
  //   clearTimeout(timer);
  //   timer = setTimeout(() => {
  //     const script = document.createElement("script");
  //     script.innerHTML = _newValue[2].code;
  //     iframeWindows.value.document.head.innerHTML = `<style>${_newValue[1].code}</style>`;
  //     iframeWindows.value.document.body.innerHTML = _newValue[0].code;
  //     iframeWindows.value.document.body.appendChild(script);
  //   }, 500);
  // });
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

  IframesHandler.insertCode({ HTMLCode, CSSCode, JSCode });
};
</script>

<style scoped></style>
