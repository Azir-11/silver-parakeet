<template>
  <header class="shadow-sm">
    <div class="flex h-full w-full items-center justify-between">
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
        <!-- 面包屑 -->
        <div v-if="theme.header.crumb.visible" class="ml-4 flex items-center"><breadcrumb /></div>
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
    <settingDrawer />
  </header>
</template>

<script setup lang="ts">
import { MenuOutline, ReloadOutline, SettingsOutline } from "@vicons/ionicons5";
import { useThemeStore, useAppStore } from "@/stores";
import settingDrawer from "./components/themeSetting/index.vue";
import breadcrumb from "./components/breadcrumb/index.vue";

const emit = defineEmits(["update:collapsed"]);

const app = useAppStore();
const message = window["$message"];
const router = useRouter();
const theme = useThemeStore();

// 图表大小
const size = ref(18);

const changeCollapsed = () => {
  if (app.isMobile) {
    app.setSiderCollapse(false);
    app.setMenuDrawerVisible(true);
  } else {
    app.toggleSiderCollapse();
  }
  emit("update:collapsed");
};

const openSetting = () => {
  app.openSettingDrawer();
};
</script>
