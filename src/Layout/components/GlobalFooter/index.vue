<template>
  <footer class="h-20 flex justify-end overflow-hidden self-center">
    <span class="self-center">Ln {{ lines.line + 1 }},Ch {{ lines.ch }}</span>
    <n-icon :component="Ban" title="error" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.error }}</span>
    <n-icon :component="InformationCircle" title="info" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.info }}</span>
    <n-icon :component="WarningOutline" title="warn" class="self-center"></n-icon>
    <span class="self-center">{{ logsMsg.warn }}</span>
  </footer>
</template>

<script setup lang="ts">
import { ProjectEnum } from "@/enum/projectEnums";
import { Ban, InformationCircle, WarningOutline } from "@vicons/ionicons5";
import { useWebEditorStates } from "@/hooks/webEditor/useWebEditorState";
const webEditorState = useWebEditorStates();
const lines = computed(() => webEditorState.getLines);
const logsMsg = computed(() => webEditorState.getLogsMsg);
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
