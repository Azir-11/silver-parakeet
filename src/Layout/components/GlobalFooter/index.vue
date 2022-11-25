<template>
  <footer class="h-20 flex justify-end overflow-hidden self-center">
    <!-- 行与列 -->
    <span class="self-center">Ln {{ lines.line + 1 }},Ch {{ lines.ch }}</span>
    <!-- console.error以及其他报错的数量 -->
    <n-icon :component="Ban" title="error" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.error }}</span>
    <!-- console.info的数量 -->
    <n-icon :component="InformationCircle" title="info" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.info }}</span>
    <!-- console.warn的数量 -->
    <n-icon :component="WarningOutline" title="warn" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.warn }}</span>
  </footer>
</template>

<script setup lang="ts">
import { ProjectEnum } from "@/enum/projectEnums";
import { Ban, InformationCircle, WarningOutline } from "@vicons/ionicons5";
import { useWebEditorStates } from "@/hooks/webEditor/useWebEditorState";
const webEditorState = useWebEditorStates();

const lines = computed(() => webEditorState.getLines); //获取行与列
const logsMsg = computed(() => webEditorState.getLogsMsg); //获取error,info,warn数据
const data = [ProjectEnum.COPYRIGHT_INFORMATION, ProjectEnum.RECORD_INFORMATION];
</script>

<style>
footer span {
  display: inline;
  padding-right: 3px;
  padding-left: 3px;
}
footer {
  font-size: 12px;
}
</style>
