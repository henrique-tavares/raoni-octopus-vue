<template>
  <textarea
    class="resize-none rounded-lg border bg-white px-3 py-2 transition-all focus:border-sky-400 focus:ring focus:ring-sky-400/50"
    v-bind="castedField"
    :rows="rows"
    :placeholder="placeholder"
  />
</template>

<script lang="ts">
import type { FieldBinding } from '@/types/forms';
import { defineComponent, type PropType, type TextareaHTMLAttributes } from 'vue';

export default defineComponent({
  props: {
    field: {
      type: Object as PropType<FieldBinding>,
      required: true
    },
    placeholder: {
      type: String
    },
    rows: {
      type: [String, Number]
    }
  },
  computed: {
    castedField() {
      return this.field as TextareaHTMLAttributes;
    }
  }
});
</script>

<style scoped></style>
