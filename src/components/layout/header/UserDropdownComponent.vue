<template>
  <div class="relative">
    <button
      class="flex flex-row items-center gap-4 p-2"
      @click="showDropdown = !showDropdown"
    >
      <div class="h-8 w-8 rounded-full bg-gray-300" />
      <div class="flex flex-col items-start">
        <span> {{ name }} </span>
        <span class="text-sm text-gray-500"> {{ position }} </span>
      </div>
      <ChevronDownSvg
        :class="['h-4 w-4 text-black transition-all', showDropdown ? 'rotate-180' : 'rotate-0']"
      />
    </button>
    <Transition name="fade">
      <div
        v-if="showDropdown"
        class="absolute z-10 flex w-full flex-grow flex-col rounded-lg border bg-white text-gray-600 shadow-md"
      >
        <button
          v-for="(item, i) in dropdownItems"
          :key="i"
          class="flex flex-row items-center gap-2 px-2 py-1 text-gray-600 transition-all first:rounded-t-lg last:rounded-b-lg hover:bg-blue-600 hover:text-white"
        >
          <component
            :is="item.icon"
            class="h-4 w-4"
          />
          <span> {{ item.text }} </span>
        </button>
      </div>
    </Transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';

import ChevronDownSvg from '@/assets/svg/chevron-down.svg?component';
import UserSvg from '@/assets/svg/user.svg?component';
import LockSvg from '@/assets/svg/lock.svg?component';
import OnOffSvg from '@/assets/svg/on-off.svg?component';

export default defineComponent({
  components: {
    ChevronDownSvg,
    UserSvg,
    LockSvg,
    OnOffSvg
  },
  props: {
    name: {
      type: String,
      required: true
    },
    position: {
      type: String,
      required: true
    }
  },
  setup() {
    return {};
  },
  data: () => ({
    showDropdown: false,
    dropdownItems: [
      {
        icon: shallowRef(UserSvg),
        text: 'My Profile'
      },
      {
        icon: shallowRef(LockSvg),
        text: 'Lock Screen'
      },
      {
        icon: shallowRef(OnOffSvg),
        text: 'Logout'
      }
    ]
  })
});
</script>

<style scoped></style>
