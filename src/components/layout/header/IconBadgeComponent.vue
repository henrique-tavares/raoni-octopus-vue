<template>
  <div class="relative flex">
    <button
      class="flex h-8 w-8 items-center justify-center rounded-full border bg-white p-1 shadow-md"
    >
      <slot />
    </button>
    <div
      v-if="badgeCount"
      class="absolute right-0 top-0 flex h-5 w-5 -translate-y-1/2 translate-x-1/2 items-center justify-center rounded-full bg-red-600"
    >
      <span class="text-xs leading-none text-white">{{ badgeCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    badgeCount: {
      type: String,
      default: null
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped lang="css">
:slotted(svg) {
  @apply h-4 w-4 text-gray-600;
}
</style>
