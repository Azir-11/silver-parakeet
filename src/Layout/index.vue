<template>
  <n-layout :native-scrollbar="false">
    <n-layout style="height: 100vh" has-sider>
      <n-layout-header
        position="absolute"
        :style="`height:${headerHeight}px`"
        class="border-solid border-0 border-b border-gray-200 bg-baseBg"
      >
        <PageHeader @update:collapsed="changeCollapsed" />
      </n-layout-header>
      <n-layout-content
        position="absolute"
        :style="`top:${headerHeight}px`"
        :class="{ 'bg-baseBg': getDarkTheme === false }"
        has-sider
      >
        <n-layout-sider
          v-if="!mobile"
          bordered
          show-trigger="arrow-circle"
          position="static"
          :on-update:collapsed="changeCollapsed"
          :collapsed="collapsed"
          collapse-mode="width"
          :collapsed-width="49"
          :width="200"
          :native-scrollbar="false"
          class="shadow-xl bg-baseBg"
          style="max-height: 100vh"
        >
          <AsideMenu />
        </n-layout-sider>
        <section class="w-full">
          <n-scrollbar>
            <div
              class="pl-12"
              :class="{ 'bg-baseBg': getDarkTheme === false }"
              :style="`height:${tabsHeight}px;`"
            >
              <div class="w-1/4">
                <TabsView />
              </div>
            </div>
            <div class="box-border overflow-auto" :style="`height:${mainHeight}px`">
              <Main />
            </div>
          </n-scrollbar>
        </section>
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { AsideMenu } from "./components/Menu";
import { PageHeader } from "./components/Header";
import { TabsView } from "./components/Tab";
import Main from "@/views/index/index.vue";
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";

const collapsed = ref<boolean>(true);
const mobile = ref<boolean>(false);
const showSideDrawder = ref(false);
const headerHeight = 40;
const tabsHeight = 40;
const footerHeight = 34;
const mainHeight = computed(() => {
  return document.body.clientHeight - headerHeight - tabsHeight - footerHeight;
});

const changeCollapsed = () => {
  if (mobile.value && collapsed.value) {
    showSideDrawder.value = !showSideDrawder.value;
  } else {
    collapsed.value = !collapsed.value;
  }
};

const { getDarkTheme } = useSystemSetting();
</script>

<style></style>
