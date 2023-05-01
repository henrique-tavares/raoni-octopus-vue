<template>
  <BaseLayout class="h-full max-h-screen overflow-hidden">
    <HeaderComponent />
    <div class="relative flex flex-grow flex-row overflow-hidden">
      <div class="hidden w-[300px] md:flex">
        <SideMenuComponent class="h-full overflow-auto" />
      </div>
      <main class="flex flex-grow flex-col">
        <div class="flex flex-row justify-between border-b-4 bg-pickled-bluewood-800">
          <span
            class="relative flex flex-col px-4 py-3 text-lg text-white after:absolute after:left-0 after:top-full after:h-1 after:w-full after:bg-sky-500 after:content-['']"
          >
            {{ $route.meta.display }}
          </span>
          <div class="flex flex-row items-center gap-3 px-3 text-gray-300">
            <div class="hidden flex-row items-center gap-2 md:flex">
              <HomeSvg class="h-5 w-5" />
              <template
                v-for="(crumb, i) in $route.meta.crumbs"
                :key="i"
              >
                <span>/</span>
                <span> {{ crumb }} </span>
              </template>
            </div>
            <button
              class="group p-2"
              @click="showCalendar = !showCalendar"
            >
              <ChevronLeftSvg
                :class="[
                  'h-5 w-5 transition-all group-hover:text-sky-500',
                  showCalendar ? 'rotate-180' : 'rotate-0'
                ]"
              />
            </button>
          </div>
        </div>
        <slot />
      </main>
      <div
        v-if="showCalendar"
        class="absolute h-full w-full md:static md:h-auto md:w-[300px]"
      >
        <SideCalendarComponent
          class="h-full overflow-auto"
          @close="showCalendar = false"
        />
      </div>
    </div>
  </BaseLayout>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseLayout from './BaseLayout.vue';
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import SideMenuComponent from '@/components/layout/SideMenuComponent.vue';

import HomeSvg from '@/assets/svg/home.svg?component';
import ChevronLeftSvg from '@/assets/svg/chevron-left.svg?component';
import SideCalendarComponent from '@/components/layout/SideCalendarComponent.vue';

export default defineComponent({
  name: 'mainLayout',
  components: {
    BaseLayout,
    HeaderComponent,
    SideMenuComponent,
    HomeSvg,
    ChevronLeftSvg,
    SideCalendarComponent
  },
  setup() {
    return {};
  },
  data: () => ({
    showCalendar: false
  })
});
</script>

<style scoped></style>
