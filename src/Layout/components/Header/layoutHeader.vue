<template>
  <div class="w-full h-full flex justify-between items-center">
    <div class="flex h-full">
      <div class="flex items-center">
        <div class="hoverBtn" @click="changeCollapsed">
          <n-icon :size="size">
            <MenuOutline />
          </n-icon>
        </div>
        <div class="hoverBtn">
          <n-icon :size="size">
            <ReloadOutline />
          </n-icon>
        </div>
      </div>
    </div>
    <div class="h-full pr-10 flex items-center">
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
  <ProjectSetting ref="drawerSetting" />
</template>

<script setup lang="ts">
import { MenuOutline, ReloadOutline, SettingsOutline } from "@vicons/ionicons5";
import ProjectSetting from "./systemSetting.vue";

const emit = defineEmits(["update:collapsed"]);

const drawerSetting = ref();

// 图表大小
const size = ref(18);

const changeCollapsed = () => {
  emit("update:collapsed");
};

const openSetting = () => {
  const { openDrawer } = drawerSetting.value;
  openDrawer();
};
</script>

<style>
.hoverBtn {
  @apply h-full w-14 flex items-center justify-center cursor-pointer hover:bg-gray-200 duration-300;
}
</style>
