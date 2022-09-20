<template>
  <Editor :width="props.width" :language="javascript()" :theme="consoleTheme"></Editor>
</template>

<script setup lang="ts">
import { javascript } from "@codemirror/lang-javascript";
import { consoleTheme } from "../../components/editor/theme/projectTheme";
const props = defineProps({
  width: {
    type: Number,
    default: 400,
  },
});
</script>

<style></style>
