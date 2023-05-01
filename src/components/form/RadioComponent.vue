<template>
  <label
    class="flex flex-row items-center gap-3"
    role="button"
  >
    <input
      type="radio"
      v-bind="field"
      class="peer hidden"
      :value="value"
      :checked="checked"
    />
    <div
      class="flex h-4 w-4 items-center justify-center rounded-full border peer-checked:[&>*]:opacity-100"
    >
      <div class="h-2 w-2 rounded-full bg-sky-600 opacity-0 transition-all" />
    </div>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { FieldBinding } from '@/types/forms';

export default defineComponent({
  props: {
    field: {
      type: Object as PropType<FieldBinding>,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    checked: {
      type: Boolean
    }
  }
});
</script>

<style scoped></style>
