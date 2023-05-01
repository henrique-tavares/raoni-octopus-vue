<template>
  <section class="flex min-h-screen w-full flex-col">
    <slot />
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'baseLayout',
  setup() {
    return {};
  }
});
</script>

<style scoped></style>
