<template>
  <n-tabs type="line">
    <n-tab
      v-for="(item, index) in store.getModes"
      :key="index"
      :name="item"
      @click="changeMode(index)"
    >
      {{ item }}
    </n-tab>
  </n-tabs>
</template>

<script setup lang="ts">
import { useWebCodes } from "@/hooks/setting/useWebCodes";
// 标签页列表
const store = useWebCodes();

const changeMode = (index: number) => {
  store.setIndex(index);
};

/**
 * 在页面关闭或刷新之前，保存标签页的数据
 */
window.addEventListener("beforeunload", () => {
  // storage.set(TABS_ROUTES, JSON.stringify(tabsList.value));
});
</script>
