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
import { ref, computed } from "vue";
import {
  PersonCircleOutline as UserIcon,
  Pencil as EditIcon,
  LogOutOutline as LogoutIcon,
  MenuOutline,
  ReloadOutline,
  FlameOutline,
  SettingsOutline,
} from "@vicons/ionicons5";
import { storage } from "@/utils/storage";
import { CURRENT_USER } from "@/stores/mutation-types";
import { PageEnum } from "@/enums/pageEnum";
import ProjectSetting from "./systemSetting.vue";
const emit = defineEmits(["update:collapsed"]);

const BASE_HOME = PageEnum.BASE_HOME;

const message = window["$message"];

const drawerSetting = ref();

/**
 * 面包屑导航
 */
const generator: any = (routerMap) => {
  return routerMap.map((item) => {
    const currentMenu = {
      ...item,
      label: item.meta.title,
      key: item.name,
      disabled: item.path === "/",
    };
    // 是否有子菜单，并递归处理
    if (item.children && item.children.length > 0) {
      // Recursion
      currentMenu.children = generator(item.children, currentMenu);
    }
    return currentMenu;
  });
};
// const dropdownSelect = (key) => {
// router.push({ name: key });
// };

// 图表大小
const size = ref(18);

const changeCollapsed = () => {
  emit("update:collapsed");
};

const user = storage.get(CURRENT_USER);

const handleSelect = (key: string | number) => {
  // if (key === "logout") {
  //   window["$dialog"].warning({
  //     title: "警告",
  //     content: "确定退出吗？",
  //     positiveText: "确定",
  //     negativeText: "再想想",
  //     onPositiveClick: () => {
  //       message.success("已退出");
  //       storage.clear();
  //       router.replace(`?redirect=${BASE_HOME}`);
  //     },
  //     onNegativeClick: () => {
  //       return;
  //     },
  //   });
  // } else if (key == "editProfile" || key == "profile") {
  //   router.push({ path: `/setting/account` });
  // }
  console.log(key);
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
