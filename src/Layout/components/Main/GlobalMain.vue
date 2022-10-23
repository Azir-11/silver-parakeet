<template>
  <main>
    <div class="h-full">
      <RouterView v-slot="{ Component }">
        <transition :name="getIsPageAnimate ? getPageAnimateType : 'null'" mode="out-in" appear>
          <component :is="Component" />
        </transition>
      </RouterView>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useSystemSetting } from "@/hooks/setting/useSystemSetting";

const { getIsPageAnimate, getPageAnimateType } = useSystemSetting();
</script>
