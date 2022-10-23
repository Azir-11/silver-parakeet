<template>
  <header class="shadow-sm">
    <div class="flex h-full w-full items-center justify-between border-b border-gray-200">
      <div class="flex h-full items-center pr-10">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="hoverBtn" @click="openSetting">
              <n-icon :size="size">
                <SettingsOutline />
              </n-icon></div></template
          ><span>项目配置</span></n-tooltip
        >
      </div>
      <div class="flex h-full items-center pr-10">
        <n-tooltip trigger="hover">
          <template #trigger>
            <div class="hoverBtn" @click="openSetting">
              <n-icon :size="size">
                <SettingsOutline />
              </n-icon></div></template
          ><span>项目配置</span></n-tooltip
        >
      </div>
    </div>
    <!--项目配置-->
    <ProjectSetting ref="drawerSetting" class="z-100" />
  </header>
</template>

<script setup lang="ts">
import { SettingsOutline } from "@vicons/ionicons5";
import ProjectSetting from "./components/systemSetting.vue";
import { useSystemSettingStore } from "@/stores/modules/systemSetting";

const drawerSetting = ref();

// 图表大小
const size = ref(18);

const openSetting = () => {
  // const { changeDrawer } = drawerSetting.value;
  // changeDrawer(true);
  const { changeDrawer } = drawerSetting.value;
  changeDrawer();
};
</script>
