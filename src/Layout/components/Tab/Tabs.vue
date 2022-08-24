<template>
  <n-tabs type="line">
    <n-tab v-for="(item, index) in tabsList" :key="index" :name="item" @click="changeMode(item)">
      {{ item }}
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { computed } from "vue";
// 标签页列表
const tabsList: any = computed(() => {
  return ["HTML", "CSS", "JAVASCRIPT"];
});
const changeMode = (mode: string) => {
  console.log(mode);
};

/**
 * 在页面关闭或刷新之前，保存标签页的数据
 */
window.addEventListener("beforeunload", () => {
  // storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
});
</script>
