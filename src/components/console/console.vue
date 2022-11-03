<template>
  <div class="console bg-[#282c34] w-full" :style="{ height: height + 'px' }">
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
        ></n-icon>
        <n-icon
          :component="ArrowDown"
          class="align-middle h-4 cursor-pointer text-white"
          title="最小化"
          @click="minimalConsole"
        ></n-icon>
      </div>
    </div>
    <n-scrollbar :style="{ height: height - 24 + 'px' }">
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
          <!-- <div
            v-if="item.type === 'system-error'"
            class="flex color-[#2a53cd] w-full border-b-[#2a53cd] border-b-1"
          >
            <n-icon :component="Ban" class="h-4 pt-1 pl-0.5 pr-4.5 align-middle inline"></n-icon>
            <pre class="">
              <span class="">{{item.content}}</span>
              <span class="row">row: {{item.row}}</span>
              <span class="col">col: {{item.col}}</span>
            </pre>
          </div> -->
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
    <div class="transition-all duration-150 bg-[#282c34] text-white border-t-1 border-t-blue">
      123
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
import { consoleSetup } from "../editor/setup";
const useConsoles = useConsole();
const emits = defineEmits(["resizeConsole", "minimalConsole"]);

const resize = (e: MouseEvent) => {
  emits("resizeConsole", e);
};
/** 最小化console */
const minimalConsole = () => {
  emits("minimalConsole");
};

const consoleInfos = computed<consoleinfo[]>(() => useConsoles.getConsoleInfo);

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
</style>
