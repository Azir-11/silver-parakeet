<template>
  <div class="iframe origin-top-right select-none" :style="{ height: height + 'px' }">
    <div class="iframeVisible" v-if="isVisible"></div>
    <iframe
      ref="iframeRef"
      :width="`${props.width}px`"
      class="border-none"
      src="/html/instance.html"
      :height="`${props.height}px`"
    >
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import type { codeItem } from "@/hooks/setting/useWebCodes";
import { ComputedRef } from "vue";
import { useConsole } from "@/hooks/setting/useConsole";
import IframeHandler from "@/utils/handleInstanceView";
import { compileHTML, compileJS, compileCSS } from "@/utils/compiler";
import Consoles from "@/utils/console";
import { format } from "@/utils/codeFormatter";
const props = defineProps({
  width: {
    type: Number,
    default: 640,
  },
  height: {
    type: Number,
    default: 480,
  },
  isVisible: {
    type: Boolean,
    default: false,
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
      }, 500);
    }, 100);
  });
});

const runCode = async (iframe: HTMLIFrameElement): Promise<void> => {
  const IframesHandler = new IframeHandler(iframe);
  const IframeConsole = new Consoles(iframe);
  useConsole().setConsoleInfo([]);
  let HTMLCode = editorTotalCode.value[0].code,
    CSSCode = editorTotalCode.value[1].code,
    JSCode = editorTotalCode.value[2].code;
  if (webCodes.getIndex <= 2) {
    await compileHTML(HTMLCode, "0").then((res: string) => {
      HTMLCode = res;
    });
    await compileCSS(format(CSSCode, "CSS"), "0").then((res: string) => {
      CSSCode = res;
    });
    await compileJS(JSCode, "0").then((res: string) => {
      JSCode = res;
    });
  }
  setTimeout(async () => {
    IframeConsole.clear();
    IframeConsole.refresh(iframe);
    await IframesHandler.insertCode({ HTMLCode, CSSCode, JSCode });
    useConsole().setConsoleInfo(IframeConsole.getLogs());
  }, 200);
};
</script>

<style scoped>
.iframeVisible {
  width: 100%;
  position: absolute;
  height: v-bind(height + "px");
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0.5;
}
</style>
