<template>
  <section>
    <div v-for="(value, index) in tabsList" :key="index" class="editor">
      <Editor
        v-if="tabsList[tabIndex] === value"
        :width="width + 'px'"
        :language="tabsList[index]"
      />
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
import { tabsList, usetabIndex } from "@/hooks/setting/usetabsListChange";
import { ComputedRef } from "vue";

let width = ref("800");
const tabIndex: ComputedRef<number> = computed(() => usetabIndex().getIndex);
</script>

<style></style>
