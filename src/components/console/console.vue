<template>
  <div class="console select-none w-full" :style="{ height: height + 'px' }">
    <div class="flex border-b-white border-solid border-0 border-b justify-between pr-2">
      <div class="inline-block h-auto">
        <n-icon :component="ArrowForward" class="align-middle h-4"></n-icon>
        <span class="inline-block">console</span>
      </div>
      <div title="重置大小" class="cursor-move ease-in-out" @mousedown="resize">
        <n-icon :component="ReorderFourOutline" size="24" class="align-middle"></n-icon>
      </div>
      <div>
        <n-icon
          :component="Settings"
          class="align-middle h-4 pr-2 cursor-pointer"
          title="设置"
        ></n-icon>
        <n-icon
          :component="Trash"
          class="align-middle h-4 pr-2 cursor-pointer"
          title="清空控制台"
        ></n-icon>
        <n-icon
          :component="ArrowDown"
          class="align-middle h-4 cursor-pointer"
          title="最小化"
        ></n-icon>
      </div>
    </div>
    <n-scrollbar :style="{ height: height - 18 + 'px' }">
      <div class="h-full">
        <div v-for="(item, index) in consoleInfos" :key="index" class="flex overflow-auto">
          <div v-if="item.type === 'mix'">
            <Editor
              :width="props.width"
              :language="javascript()"
              :theme="consoleTheme"
              :is-editable="false"
              :model-value="typeof item.content === 'string' ? item.content : ''"
            ></Editor>
          </div>
          <div v-if="item.type === 'log'" v-html="item.logs"></div>
        </div>
      </div>
    </n-scrollbar>
    <div class="transition-all duration-150 bg-black text-white">123</div>
  </div>
</template>

<script setup lang="ts">
import { ArrowForward, ReorderFourOutline, Settings, Trash, ArrowDown } from "@vicons/ionicons5";
import type { consoleinfo } from "@/utils/console";
import { useConsole } from "@/hooks/setting/useConsole";
import { javascript } from "@codemirror/lang-javascript";
import { consoleTheme } from "../../components/editor/theme/projectTheme";
const useConsoles = useConsole();
const emits = defineEmits(["resizeConsole"]);

const resize = (e: MouseEvent) => {
  emits("resizeConsole", e);
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
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
