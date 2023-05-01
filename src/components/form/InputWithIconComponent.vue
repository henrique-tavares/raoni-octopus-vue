<template>
  <div class="flex [&>input]:flex-grow [&>input]:rounded-l-none">
    <div class="flex items-center rounded-lg rounded-r-none border bg-neutral-100 p-2">
      <component
        :is="icon"
        class="h-4 w-4 text-neutral-600"
      />
    </div>
    <slot />
  </div>
</template>

<script lang="ts">
import { defineComponent, type FunctionalComponent, type PropType, type SVGAttributes } from 'vue';

export default defineComponent({
  props: {
    icon: {
      type: Object as PropType<FunctionalComponent<SVGAttributes>>,
      required: true
    }
  },
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
