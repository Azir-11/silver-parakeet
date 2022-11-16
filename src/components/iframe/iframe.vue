<template>
  <div
    :class="fullScreenState ? 'full-screen' : 'iframe origin-top-right select-none w-full relative'"
    :style="{ height: height + 'px' }"
  >
    <div v-if="isVisible.iframeVisible" class="iframeVisible"></div>
    <div v-if="isVisible.iframeWidthShow" class="absolute left-0 bottom-0 bg-black text-white">
      {{ width }}px
    </div>
    <div class="h-[42px] flex justify-end bg-white dark:bg-[#18181c]">
      <div class="self-center">
        <n-icon
          :component="Refresh"
          class="mr-3 cursor-pointer"
          :size="20"
          title="刷新"
          @click="refreshIframe"
        ></n-icon>
        <n-icon
          :component="Resize"
          class="mr-3 cursor-pointer"
          :size="20"
          title="全屏"
          @click="fullScreenIframe"
        ></n-icon>
      </div>
    </div>
    <iframe
      ref="iframeRef"
      :width="`${width}px`"
      :height="`${height - 42}px`"
      class="border-none bg-white"
      :class="fullScreenState ? 'wh-full' : ''"
      src="/html/instance.html"
    >
    </iframe>
  </div>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/webEditor/useWebCodes";
import type { codeItem } from "@/hooks/webEditor/useWebCodes";
import type { ComputedRef, PropType } from "vue";
import { useConsole } from "@/hooks/webEditor/useConsole";
import IframeHandler from "@/utils/webEditor/handleInstanceView";
import { compileHTML, compileJS, compileCSS } from "@/utils/webEditor/compiler";
import Consoles from "@/utils/webEditor/console";
import { format } from "@/utils/webEditor/codeFormatter";
import type { State } from "@/types/editor";
import { debounce } from "@/utils/tools/tool";
import { Refresh, Resize } from "@vicons/ionicons5";

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
const fullScreenState = ref<boolean>(false);
const editorTotalCode: ComputedRef<codeItem> = computed(() => {
  return webCodes.getTotalCode;
});

const refreshIframe = () => {
  //刷新iframe
  runCode(iframeRef.value);
};

const fullScreenIframe = () => {
  fullScreenState.value = !fullScreenState.value;
}; //最大化iframe

const iframeRef = ref(null);
onMounted(() => {
  runCode(iframeRef.value);
  watch(
    editorTotalCode.value,
    debounce(() => {
      runCode(iframeRef.value);
    }, 500),
  );
});

const runCode = async (iframe: HTMLIFrameElement): Promise<void> => {
  const IFramesHandler = new IframeHandler(iframe);
  const IframeConsole = new Consoles(iframe);
  useConsole().setConsoleInfo([]);
  iframe.src = "/html/instance.html";
  const onerror = (msg: string, _, row: number, col: number) => {
    IframeConsole.consoleInfo.push({
      type: "system-error",
      content: msg,
      row,
      col,
    });
    return void 0;
  };
  const onunhandledrejection = (e: any) => {
    IframeConsole.consoleInfo.push({
      type: "error",
      content: `Unhandled promise rejection: ${e.reason}`,
    });
  };
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
    await IFramesHandler.insertCode(
      { HTMLCode, CSSCode, JSCode },
      false,
      onerror,
      onunhandledrejection,
    );
    useConsole().setConsoleInfo(IframeConsole.getLogs());
  }, 500);
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
.full-screen {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1010;
  width: 100% !important;
  padding-left: 64px;
  padding-top: 32px;
  height: 100% !important;
}
</style>
