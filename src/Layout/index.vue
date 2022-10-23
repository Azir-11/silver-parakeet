<template>
  <section class="flex flex-col wh-full">
    <GlobalHeader
      class="z-1001 globalComponents w-full left-0 top-0 pl-[64px]"
      :style="`height:${headerHeight}px`"
      :class="activeTheme"
    />
    <GlobalMenu
      class="z-1003 globalComponents h-screen left-0 top-0"
      :class="activeTheme"
      :mobile="mobile"
      :show-side-drawder="showSideDrawder"
      :menu-collapsed-width="menuCollapsedWidth"
    />
    <GlobalMain
      class="z-999 w-full flex-grow pl-[64px]"
      :class="activeTheme"
      :style="`padding-top:${headerHeight}px`"
    />
    <GlobalFooter class="z-1002 w-screen bottom-0 bg-white pl-[64px]" />
  </section>
</template>

<script setup lang="ts">
import { GlobalHeader } from "./components/Header";
// import { GlobalTabs } from "./components/Tab";
import { GlobalMain } from "./components/Main";
import { GlobalMenu } from "./components/Menu";
import { GlobalFooter } from "./components/Footer";
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";

const { getDarkTheme } = useSystemSetting();

// 是否为移动端
const mobile = ref<boolean>(false);
// 是否显示抽屉菜单
const showSideDrawder = ref(false);
// 头部菜单的高度
const headerHeight = ref(38);
// menu宽度
const menuCollapsedWidth = ref(64);
// 获取当前应该活跃的背景色(黑/白)
const activeTheme = computed(() => (getDarkTheme.value ? "bg-[#282c34]" : "bg-white"));
// 编辑器
</script>
