<template>
  <select
    v-bind="field"
    class="rounded-lg border bg-white px-3 py-2 transition-all focus:border-sky-400 focus:ring focus:ring-sky-400/50"
    :class="!field.value ? 'text-neutral-400' : 'text-black'"
  >
    {{
      field
    }}
    <option
      value=""
      disabled
      hidden
      selected
    >
      Escolha uma opção
    </option>
    <option
      v-for="(option, i) in options"
      :key="i"
      :value="option.value"
      class="text-black"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script lang="ts">
import type { FieldBinding } from '@/types/forms';
import { defineComponent, type PropType } from 'vue';

export default defineComponent({
  props: {
    field: {
      type: Object as PropType<FieldBinding>,
      required: true
    },
    options: {
      type: Array as PropType<{ name: string; value: string | number | boolean }[]>,
      required: true
    }
  }
});
</script>

<style scoped></style>
