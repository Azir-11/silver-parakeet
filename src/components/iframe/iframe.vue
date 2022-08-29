<template>
  <iframe
    ref="iframeRef"
    :width="`${props.width}px`"
    :height="`${props.height}px`"
    src="/html/instance.html"
  >
  </iframe>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
import type { codeItem } from "@/hooks/setting/useWebCodes";
import { ComputedRef } from "vue";

const props = defineProps({
  width: {
    type: Number,
    default: 640,
  },
  height: {
    type: String,
    default: "480",
  },
});

const webCodes = useWebCodes();

const editorTotalCode: ComputedRef<codeItem> = computed(() => {
  return webCodes.getTotalCode;
});

const iframeRef = ref<HTMLIFrameElement>(null);
const iframeWindows = ref(null);
let timer;
onMounted(() => {
  iframeWindows.value = iframeRef.value.contentWindow;
  console.log(iframeWindows.value.document);
  watch(editorTotalCode.value, (_newValue, _oldValue) => {
    iframeRef.value.src = "/html/instance.html";
    clearTimeout(timer);
    timer = setTimeout(() => {
      const script = document.createElement("script");
      script.innerHTML = _newValue[2].code;
      iframeWindows.value.document.head.innerHTML = `<style>${_newValue[1].code}</style>`;
      iframeWindows.value.document.body.innerHTML = _newValue[0].code;
      iframeWindows.value.document.body.appendChild(script);
    }, 500);
  });
});
</script>

<style scoped></style>
