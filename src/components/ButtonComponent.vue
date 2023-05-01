<template>
  <button
    class="rounded-lg px-3 py-2 transition-all"
    :type="type"
  >
    <slot />
  </button>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    type: {
      type: String as PropType<'button' | 'submit' | 'reset'>,
      default: 'button'
    }
  }
});
</script>

<style scoped></style>
