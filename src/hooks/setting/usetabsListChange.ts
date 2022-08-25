import { defineStore, StateTree } from "pinia";
import { computed, Ref, ref } from "vue";

export const tabsList: any = computed(() => {
  return ["HTML", "CSS", "JAVASCRIPT"];
});

const index = ref<number>(0);

export const usetabIndex = defineStore({
  id: "tabs-index",
  state: () => ({
    index,
  }),
  getters: {
    getIndex() {
      return this.index;
    },
  },
  actions: {
    setIndex(value: number) {
      this.index = value;
      console.log(this.index);
    },
  },
});
