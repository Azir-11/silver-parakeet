<template>
  <n-config-provider
    :locale="zhCN"
    :theme="theme"
    :theme-overrides="getDarkTheme"
    :date-locale="dateZhCN"
  >
    <AppProvider>
      <Layout />
    </AppProvider>
  </n-config-provider>
</template>

<script setup lang="ts">
import { AppProvider } from "@/components/Application";
import Layout from "@/Layout/index.vue";
import { zhCN, dateZhCN, darkTheme } from "naive-ui";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const systemStore = useSystemSettingStore();

const darkThemeOverrides = {
  common: {
    baseColor: "#282c34",
  },
};

const theme = null;

const getDarkTheme = computed(() => (systemStore.darkTheme ? darkTheme : undefined));
</script>

<style>
@import "@/assets/base.css";
</style>
