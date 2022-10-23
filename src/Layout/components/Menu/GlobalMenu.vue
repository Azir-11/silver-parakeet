<template>
  <aside class="shadow-xl">
    <section>
      <n-space vertical>
        <n-layout has-sider>
          <n-layout-sider
            bordered
            show-trigger="bar"
            position="static"
            :collapsed="true"
            collapse-mode="width"
            :collapsed-width="menuCollapsedWidth"
          >
            <Menu
          /></n-layout-sider>
        </n-layout>
      </n-space>
    </section>
  </aside>
</template>

<script setup lang="ts">
import { Menu } from "./components";

const props = defineProps({
  menuCollapsedWidth: {
    type: Number,
    default: 64,
  },
});
</script>

<style scoped>
.n-menu {
  width: 100%;
}
</style>
