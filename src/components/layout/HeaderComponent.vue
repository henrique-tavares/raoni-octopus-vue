<template>
  <header class="flex flex-col divide-x divide-y border-b bg-white md:flex-row">
    <div class="flex flex-row items-center justify-between px-4 py-3 md:flex-grow">
      <img
        src="@/assets/img/logo.png"
        alt="Logo"
        class="h-9"
      />
      <button
        class="rounded-full bg-blue-600 p-2 md:hidden"
        @click="showMenu = !showMenu"
      >
        <MenuHamburgerSvg class="h-4 w-4 text-white" />
      </button>
      <div class="relative hidden md:block">
        <input
          type="text"
          class="rounded-full border px-3 py-2 text-sm transition-all focus:border-gray-600"
          placeholder="Search..."
        />
        <button class="absolute right-3 top-1/2 -translate-y-1/2">
          <SearchSvg class="h-4 w-4 text-gray-400" />
        </button>
      </div>
    </div>
    <div class="flex flex-row divide-x md:flex-grow-0 md:flex-row-reverse md:divide-x-reverse">
      <div class="px-2 py-1">
        <UserDropdownComponent
          name="John Doe Junior"
          position="administrador"
        />
      </div>
      <div class="flex flex-grow flex-row items-center justify-end gap-3 px-4 py-3">
        <IconBadgeComponent badge-count="3">
          <TasksSvg />
        </IconBadgeComponent>
        <IconBadgeComponent badge-count="4">
          <MailSvg />
        </IconBadgeComponent>
        <IconBadgeComponent badge-count="3">
          <BellSvg />
        </IconBadgeComponent>
      </div>
    </div>
  </header>
  <Transition name="fade">
    <SideMenuComponent
      v-if="showMenu"
      class="absolute top-[60px] z-10 h-[calc(100%_-_60px)] overflow-auto md:hidden"
    />
  </Transition>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

import UserDropdownComponent from './header/UserDropdownComponent.vue';
import IconBadgeComponent from './header/IconBadgeComponent.vue';

import MenuHamburgerSvg from '@/assets/svg/menu-hamburger.svg?component';
import TasksSvg from '@/assets/svg/tasks.svg?component';
import MailSvg from '@/assets/svg/mail.svg?component';
import BellSvg from '@/assets/svg/bell.svg?component';
import SearchSvg from '@/assets/svg/search.svg?component';
import SideMenuComponent from './SideMenuComponent.vue';

export default defineComponent({
  components: {
    UserDropdownComponent,
    IconBadgeComponent,
    MenuHamburgerSvg,
    TasksSvg,
    MailSvg,
    BellSvg,
    SearchSvg,
    SideMenuComponent
  },
  setup() {
    return {};
  },
  data: () => ({
    showMenu: false
  })
});
</script>

<style scoped></style>
