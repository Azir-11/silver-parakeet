<template>
  <div v-for="(item, index) in consoleInfos" :key="index" class="flex">
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
</template>

<script setup lang="ts">
import type { consoleinfo } from "@/utils/console";
import { useConsole } from "@/hooks/setting/useConsole";
import { javascript } from "@codemirror/lang-javascript";
import { consoleTheme } from "../../components/editor/theme/projectTheme";

const useConsoles = useConsole();
const consoleInfos = computed<consoleinfo[]>(() => useConsoles.getConsoleInfo);
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
});
</script>

<style></style>
