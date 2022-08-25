<template>
  <section>
    <div v-for="(item, index) in editorModes" :key="index" class="editor">
      <Editor v-if="index === editorActiveIndex" :width="`${width}px`" :language="item" />
    </div>
    <div class="viewArea">
      <div class="iframeBox">
        <!-- <iframe width="680px" height="500px" src="../../public/html/instance.html"></iframe> -->
      </div>
      <div class="consoleBox">
        <div class="console"></div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { storage } from "@/utils/storage";
import { useWebCodes } from "@/hooks/setting/useWebCodes";

let width = ref("800");
const codeStore = useWebCodes();
const editorActiveIndex = computed(() => {
  return codeStore.index;
});
const editorModes = computed(() => {
  return codeStore.getModes;
});
</script>

<style></style>
