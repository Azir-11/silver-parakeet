<template>
  <iframe ref="iframeRef" :width="`${width}px`" :height="`${height}px`"> </iframe>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";

const props = defineProps({
  width: {
    type: String,
    default: "640",
  },
  height: {
    type: String,
    default: "480",
  },
});

const webCodes = useWebCodes();

const editorTotalCode = computed(() => {
  return webCodes.getTotalCode;
});

const iframeRef = ref(null);
const iframeWindows = ref(null);
onMounted(() => {
  iframeWindows.value = iframeRef.value.contentWindow;

  iframeWindows.value.document.open();
  console.log(editorTotalCode.value);
  iframeWindows.value.document.write(
    `${editorTotalCode.value[0].code} <style>${editorTotalCode.value[1].code}</style><script>${editorTotalCode.value[2].code}</scirpt>`,
  );
});
</script>

<style scoped></style>
