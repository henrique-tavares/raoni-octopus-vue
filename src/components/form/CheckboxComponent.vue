<template>
  <label
    class="flex flex-row items-center gap-3"
    role="button"
  >
    <input
      type="checkbox"
      v-bind="field"
      class="peer hidden"
      :value="value"
    />
    <div class="flex h-4 w-4 items-center justify-center border peer-checked:[&>*]:opacity-100">
      <CheckSvg class="h-3 w-3 text-black opacity-0 transition-all" />
    </div>
    <slot />
  </label>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue';
import type { FieldBinding } from '@/types/forms';

import CheckSvg from '@/assets/svg/check.svg?component';

export default defineComponent({
  components: {
    CheckSvg
  },
  props: {
    field: {
      type: Object as PropType<FieldBinding>,
      required: true
    },
    value: {
      type: [String, Number, Boolean],
      required: true
    }
  }
});
</script>

<style scoped></style>
