<template>
  <section>
    <div class="editor">
      <Editor :width="width + 'px'" language="javascript" model-value="const hello='world'" />
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
import { ref } from "vue";
let width = ref("800");
</script>
