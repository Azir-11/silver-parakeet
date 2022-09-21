<template>
  <n-config-provider
    :locale="zhCN"
    :theme="darkTheme"
    :theme-overrides="darkTheme"
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
</script>

<style>
@import "@/assets/base.css";
</style>
