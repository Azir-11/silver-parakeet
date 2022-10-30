<template>
  <footer class="h-20 flex flex-col justify-center overflow-hidden">
    <a class="block text-center">footer</a>
  </footer>
</template>

<script setup lang="ts">
import { ProjectEnum } from "@/enum/projectEnums";

const data = [ProjectEnum.COPYRIGHT_INFORMATION, ProjectEnum.RECORD_INFORMATION];
</script>
