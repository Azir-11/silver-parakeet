<template>
  <div
    class="iframe origin-top-right select-none w-full relative"
    :style="{ height: height + 'px' }"
  >
    <div class="iframeVisible" v-if="isVisible.iframeVisble"></div>
    <div class="absolute left-0 bottom-0 bg-black text-white" v-if="isVisible.iframeWidthShow">
      {{ width }}px
    </div>
    <iframe
      ref="iframeRef"
      :width="`${props.width}px`"
      class="border-none h-full"
      src="/html/instance.html"
    >
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import type { codeItem } from "@/hooks/setting/useWebCodes";
import type { ComputedRef, PropType } from "vue";
import { useConsole } from "@/hooks/setting/useConsole";
import IframeHandler from "@/utils/handleInstanceView";
import { compileHTML, compileJS, compileCSS } from "@/utils/compiler";
import Consoles from "@/utils/console";
import { format } from "@/utils/codeFormatter";
import type { State } from "@/types/editor";
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
    type: Object as PropType<State>,
    default: () => {},
  },
});

const webCodes = useWebCodes();

const editorTotalCode: ComputedRef<codeItem> = computed(() => {
  return webCodes.getTotalCode;
});

const iframeRef = ref<HTMLIFrameElement>(null);
let timer, timer2;
onMounted(() => {
  runCode(iframeRef.value);
  watch(editorTotalCode.value, (_newValue, _oldValue) => {
    timer && clearTimeout(timer);
    timer2 && clearTimeout(timer2);
    timer2 = setTimeout(() => {
      timer = setTimeout(() => {
        iframeRef.value.src = "/html/instance.html";
        runCode(iframeRef.value);
      }, 500);
    }, 100); //来个好心人帮我解一下屎吧
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
  width: v-bind(width + "px");
  position: absolute;
  height: v-bind(height + "px");
  background-color: rgb(0, 0, 0, 0.5);
  opacity: 0.5;
}
</style>
