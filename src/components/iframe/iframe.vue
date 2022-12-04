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
          :component="CloudUploadOutline"
          class="mr-3 cursor-pointer"
          :size="20"
          title="上传"
          @click="showUpLoad"
        ></n-icon>
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
import { useConsole } from "@/hooks/webEditor/useConsole";
import { useUpLoadState } from "@/hooks/webEditor/useUpLoadState";
import { codeType, useWebCodes } from "@/hooks/webEditor/useWebCodes";
import { useWebEditorStates } from "@/hooks/webEditor/useWebEditorState";
import type { State } from "@/types/editor";
import { debounce } from "@/utils/tools/tool";
import { format } from "@/utils/webEditor/codeFormatter";
import { compileCSS, compileHTML, compileJS } from "@/utils/webEditor/compiler";
import Consoles from "@/utils/webEditor/console";
import IframeHandler from "@/utils/webEditor/handleInstanceView";
import { CloudUploadOutline, Refresh, Resize } from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { ComputedRef, PropType } from "vue";
import Uploader from "../uploader/uploader.vue";

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
const WebEditorStates = useWebEditorStates();
const webCodes = useWebCodes();
const upLoadState = useUpLoadState();
const fullScreenState = ref<boolean>(false);
const editorTotalCode: ComputedRef<codeType> = computed(() => {
  return webCodes.getTotalCode;
});
const consoleInfos = ref([]);
const editorTemplateMode: ComputedRef<Array<string>> = computed(() => {
  return webCodes.getTeamplateModes;
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
  nextTick(() => {
    runCode(iframeRef.value);
  });
  watch(
    editorTotalCode.value,
    debounce(() => {
      runCode(iframeRef.value);
    }, 500),
  );
  watch(
    () => consoleInfos.value,
    () => {
      // console.log(consoleInfos.value);
      useConsole().setConsoleInfo(consoleInfos.value);
    },
    { deep: true },
  );
});

const runCode = async (iframe: HTMLIFrameElement): Promise<void> => {
  const IFramesHandler = new IframeHandler(iframe);
  const IframeConsole = new Consoles(iframe);
  useConsole().setConsoleInfo([]);
  iframe.src = "/html/instance.html";
  const onerror = (msg: string, _, row: number, col: number) => {
    IframeConsole.consoleInfo.value.push({
      type: "system-error",
      content: msg,
      row,
      col,
    });
    return void 0;
  };
  const onunhandledrejection = (e: any) => {
    IframeConsole.consoleInfo.value.push({
      type: "error",
      content: `Unhandled promise rejection: ${e.reason}`,
    });
  };
  let HTMLCode = editorTotalCode.value[editorTemplateMode.value[0]].code,
    CSSCode = editorTotalCode.value[editorTemplateMode.value[1]].code,
    JSCode = editorTotalCode.value[editorTemplateMode.value[2]].code;
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
      upLoadState.getExternalLink,
      false,
      onerror,
      onunhandledrejection,
    );
    const logs = IframeConsole.getLogs();
    consoleInfos.value = logs.value;
    const { error, info, warn } = logMsg();
    WebEditorStates.setLogsMsg(error, warn, info);
  }, 200);
};

const logMsg = () => {
  const msgMap = ["info", "error", "system-error", "warn"];
  const logMsgCount = {
    info: 0,
    error: 0,
    warn: 0,
  };
  const logInfo = useConsole().getConsoleInfo;
  logInfo.forEach((item) => {
    switch (item.type) {
      case msgMap[0]:
        logMsgCount.info++;
        break;
      case msgMap[1] || msgMap[2]:
        logMsgCount.error++;
        break;
      case msgMap[3]:
        logMsgCount.warn++;
    }
  });
  return logMsgCount;
};

const showUpLoad = () => {
  window.$dialog.success({
    title: "上传文件",
    icon: () => h(CloudUploadOutline),
    content: () => h(Uploader),
  });
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
