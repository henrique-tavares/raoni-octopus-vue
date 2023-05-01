<template>
  <input
    :type="type"
    v-bind="field"
    class="rounded-lg border bg-white px-3 py-2 transition-all focus:border-sky-400 focus:ring focus:ring-sky-400/50"
    :placeholder="placeholder"
  />
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
    type: {
      type: String as PropType<'text' | 'number' | 'password' | 'tel'>,
      default: 'text'
    },
    placeholder: {
      type: String
    }
  }
});
</script>

<style scoped></style>
