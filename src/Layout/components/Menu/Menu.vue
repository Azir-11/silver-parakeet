<template>
  <n-space vertical>
    <n-layout has-sider>
      <n-menu
        :collapsed-width="64"
        :collapsed-icon-size="22"
        :options="menus"
        @update:value="handleUpdateValue"
      />
    </n-layout>
  </n-space>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, unref } from "vue";
import type { MenuOption } from "naive-ui";

const menus = ref<any[]>([]);

// 获取当前打开的子菜单

const emit = defineEmits(["update:collapsed", "clickMenuItem"]);

// 点击菜单
const handleUpdateValue = (key: string, _item: MenuOption) => {
  if (/http(s)?:/.test(key)) {
    window.open(key);
  } else {
    // router.push({ name: key });
  }
  emit("clickMenuItem", key);
};
</script>
