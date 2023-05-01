<template>
  <div class="group flex flex-col">
    <div
      role="button"
      :class="[
        'flex flex-row items-center justify-between gap-3 px-6 py-3 text-gray-300 transition-all ',
        showCollapsed
          ? 'bg-pickled-bluewood-900'
          : 'bg-pickled-bluewood-800 hover:bg-pickled-bluewood-900'
      ]"
      @click="subItems ? toggleCollapsed() : handleNavigation()"
    >
      <div class="flex flex-row items-center gap-2">
        <slot />
      </div>
      <div class="flex flex-row items-center gap-2">
        <span
          v-if="badgeCount"
          class="rounded bg-sky-600 px-2 py-1 text-xs text-white"
        >
          {{ badgeCount }}
        </span>
        <ChevronDownSvg
          v-if="subItems"
          :class="['h-4 w-4 transition-all', showCollapsed ? 'rotate-180' : 'rotate-0']"
        />
      </div>
    </div>
    <Collapse
      :when="showCollapsed"
      class="v-collapse"
    >
      <div class="flex flex-col gap-3 bg-pickled-bluewood-950 p-4 pl-12">
        <span
          role="button"
          v-for="(subItem, i) in subItems"
          :key="i"
          class="hover:underline"
        >
          {{ subItem }}
        </span>
      </div>
    </Collapse>
  </div>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import { Collapse } from 'vue-collapsed';

import ChevronDownSvg from '@/assets/svg/chevron-down.svg?component';

export default defineComponent({
  components: {
    Collapse,
    ChevronDownSvg
  },
  props: {
    subItems: {
      type: Array as PropType<string[]>
    },
    badgeCount: {
      type: [String, Number]
    }
  },
  setup() {
    return {};
  },
  data: () => ({
    showCollapsed: false
  }),
  methods: {
    toggleCollapsed() {
      this.showCollapsed = !this.showCollapsed;
    },
    handleNavigation() {}
  }
});
</script>

<style scoped></style>
