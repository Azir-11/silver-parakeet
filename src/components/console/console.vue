<template>
  <div class="console bg-[#282c34] w-full" :style="{ height: height - 25 + 'px' }">
    <div class="flex border-b-white border-solid border-0 border-b justify-between pr-2">
      <div class="inline-block h-auto">
        <n-icon :component="ArrowForward" class="align-middle h-4 text-white"></n-icon>
        <span class="inline-block text-white">console</span>
      </div>
      <div title="重置大小" class="cursor-move ease-in-out" @mousedown="resize">
        <n-icon :component="ReorderFourOutline" size="24" class="align-middle"></n-icon>
      </div>
      <div>
        <n-icon
          :component="Settings"
          class="align-middle h-4 pr-2 cursor-pointer text-white"
          title="设置"
        ></n-icon>
        <n-icon
          :component="Trash"
          class="align-middle h-4 pr-2 cursor-pointer text-white"
          title="清空控制台"
          @click="clearConsole()"
        ></n-icon>
        <n-icon
          :component="ArrowDown"
          class="align-middle h-4 cursor-pointer text-white"
          title="最小化"
          @click="minimalConsole"
        ></n-icon>
      </div>
    </div>
    <n-scrollbar :style="{ height: height - cmdHeight + 'px' }">
      <div class="h-full">
        <div v-for="(item, index) in consoleInfos" :key="index" class="flex overflow-x-hidden">
          <div v-if="item.type === 'mix'">
            <Editor
              :width="props.width"
              :language="javascript()"
              :is-editable="false"
              :setup="consoleSetup"
              :model-value="typeof item.content === 'string' ? item.content : ''"
            ></Editor>
          </div>
          <div v-if="item.type === 'log' || item.type === 'dir'" class="flex">
            <n-icon
              :component="ChevronForwardOutline"
              class="h-4 pt-0.75 pl-0.5 pr-4.5 align-middle inline"
            ></n-icon>
            <pre v-html="item.logs"></pre>
          </div>
          <div
            v-if="item.type === 'info'"
            class="flex color-[#2a53cd] w-full border-b-[#2a53cd] border-b-1"
          >
            <n-icon
              :component="InformationCircle"
              class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"
            ></n-icon>
            <pre>{{ item.content }}</pre>
          </div>
          <div
            v-if="item.type === 'system-error'"
            class="flex color-[#ef6066] w-full border-b-[#ef6066] border-b-1"
          >
            <n-icon :component="Ban" class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"></n-icon>
            <pre class="flex justify-between w-full">
              <span class="flex-1">{{item.content}}</span>
              <span class="pr-3">row: {{item.row}}</span>
              <span class="pr-3">col: {{item.col}}</span>
            </pre>
          </div>
          <div
            v-if="item.type === 'error'"
            class="flex color-[#ef6066] w-full border-b-[#ef6066] border-b-1"
          >
            <n-icon :component="Ban" class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"></n-icon>
            <pre>{{ item.content }}</pre>
          </div>
          <div
            v-if="item.type === 'warn'"
            class="flex color-[#f5a209] w-full border-b-[#f5a209] border-b-1"
          >
            <n-icon
              :component="InformationCircle"
              class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"
            ></n-icon>
            <pre>{{ item.content }}</pre>
          </div>
          <div
            v-if="item.type === 'print'"
            class="flex color-[#f5a209] w-full border-b-[#f5a209] border-b-1"
          >
            <n-icon
              :component="InformationCircle"
              class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"
            ></n-icon>
            <pre v-html="item.logs[0]"></pre>
          </div>
          <div
            v-if="item.type === 'mixPrint'"
            class="flex color-[#f5a209] w-full border-b-[#f5a209] border-b-1"
          >
            <n-icon
              :component="ChevronForwardOutline"
              class="h-4 pt-0.75 pl-0.5 pr-4.5 align-middle inline"
            ></n-icon>
            <Editor
              :width="props.width"
              :language="javascript()"
              :is-editable="false"
              :setup="consoleSetup"
              :model-value="typeof item.content === 'string' ? item.content : ''"
            ></Editor>
          </div>
        </div>
      </div>
    </n-scrollbar>
    <div
      ref="cmdRef"
      class="flex cmd-codemirror transition-all duration-150 bg-[#282c34] text-white border-t-1 border-t-blue max-height"
    >
      <div class="flex self-center">
        <n-icon :component="ChevronForwardOutline" class="align-middle text-size-[16px]"></n-icon>
      </div>

      <Editor
        :language="javascript()"
        :is-editable="true"
        :setup="exeCmdSetup"
        :model-value="consoleValue"
        class="pt-0.75 w-[80%]"
        @change-code="changeCode"
      ></Editor>
      <div class="flex self-center mt-1 mr-1 justify-end w-full flex-gap-1">
        <n-button :disabled="!consoleValue" :focusable="false" @click="exeCmd">润!</n-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ArrowForward,
  ReorderFourOutline,
  Settings,
  Trash,
  ArrowDown,
  ChevronForwardOutline,
  InformationCircle,
  Ban,
} from "@vicons/ionicons5";
import type { consoleinfo } from "@/utils/webEditor/console";
import { useConsole } from "@/hooks/webEditor/useConsole";
import { javascript } from "@codemirror/lang-javascript";
import { consoleSetup, exeCmdSetup } from "../editor/setup";
import Consoles from "@/utils/webEditor/console";
import { MaybeElement, useResizeObserver } from "@vueuse/core";
const useConsoles = useConsole();
const emits = defineEmits(["resizeConsole", "minimalConsole"]);
const cmdRef = ref(null);
const consoleValue = ref<string>("");
const consoleInfos = computed<consoleinfo[]>(() => useConsoles.getConsoleInfo);
const cmdHeight = ref<number>(29);
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
  height: {
    type: Number,
    default: 300,
  },
});
const resize = (e: MouseEvent) => {
  emits("resizeConsole", e);
};
/** 最小化console */
const minimalConsole = () => {
  emits("minimalConsole");
};
const changeCode = (code: string) => {
  //从editor中同时修改值
  consoleValue.value = code;
};

const clearConsole = () => {
  useConsoles.setConsoleInfo([]);
  const consoles = new Consoles();
  consoles.clear();
  console.clear();
};

const exeCmd = () => {
  if (consoleValue.value) {
    const consoles = new Consoles();
    consoles.exeCmd(consoleValue.value);
    consoleValue.value = "";
    useConsoles.setConsoleInfo(consoles.getLogs());
  }
};

onMounted(() => {
  useResizeObserver(cmdRef.value, (entries) => {
    const entry = entries[0];
    const { height } = entry.contentRect;
    cmdHeight.value = height;
  });
});
</script>

<style>
@import "./css/console.css";
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.cmd-codemirror {
  height: auto;
}
.max-height {
  max-height: 90px;
  width: 100%;
  height: auto;
  font-size: 14px;
}
</style>
