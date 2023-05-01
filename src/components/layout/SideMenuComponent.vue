<template>
  <div class="flex w-full flex-col gap-4 bg-pickled-bluewood-800 py-4 text-sm text-gray-200">
    <span class="px-4 text-xl font-medium">Navigation</span>
    <div class="flex flex-col">
      <ItemComponent
        v-for="(item, i) in menuNavigationItems"
        :key="i"
        :badge-count="item.badgeCount"
        :sub-items="item.subItems"
      >
        <component
          :is="item.icon"
          class="h-4 w-4"
        />
        <span> {{ item.text }} </span>
        <span
          v-if="item.extra"
          class="opacity-50"
        >
          {{ item.extra }}
        </span>
      </ItemComponent>
    </div>

    <span class="px-4 text-xl font-medium">Projects</span>
    <div class="flex flex-col">
      <ItemComponent
        v-for="(item, i) in menuProjectItems"
        :key="i"
      >
        <div
          :class="[
            'h-3 w-3 rounded-full',
            {
              'bg-red-500': item.color == 'red',
              'bg-green-500': item.color == 'green',
              'bg-blue-500': item.color == 'blue'
            }
          ]"
        />
        <span class="group-hover:underline"> {{ item.text }} </span>
      </ItemComponent>
    </div>

    <span class="px-4 text-xl font-medium">Company Stats</span>
    <div class="flex flex-col gap-3">
      <div
        v-for="(item, i) in menuStatsItems"
        :key="i"
        class="flex flex-col px-6"
      >
        <div class="flex flex-row items-end justify-between">
          <span> {{ item.text }} </span>
          <span class="text-xs opacity-50"> {{ item.progress }}% </span>
        </div>
        <div class="relative flex h-2 rounded-full bg-gray-600">
          <div
            class="absolute h-2 rounded-full bg-sky-500"
            :style="`width: ${item.progress}%`"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, shallowRef } from 'vue';

import HomeSvg from '@/assets/svg/home.svg?component';
import MailSvg from '@/assets/svg/mail.svg?component';
import FilesSvg from '@/assets/svg/files.svg?component';
import TasksSvg from '@/assets/svg/tasks.svg?component';
import FormSvg from '@/assets/svg/form.svg?component';
import TableSvg from '@/assets/svg/table.svg?component';
import MapPinSvg from '@/assets/svg/map-pin.svg?component';
import LayoutSvg from '@/assets/svg/layout.svg?component';
import MenuLevelsSvg from '@/assets/svg/menu-levels.svg?component';
import LinkExternalSvg from '@/assets/svg/link-external.svg?component';
import type {
  SideMenuNavigationItem,
  SideMenuProjectItem,
  SideMenuStatItem
} from '@/types/components';
import ItemComponent from './side-menu/ItemComponent.vue';

export default defineComponent({
  components: {
    ItemComponent
  },
  setup() {
    return {};
  },
  data: () => ({
    menuNavigationItems: [
      {
        icon: shallowRef(HomeSvg),
        text: 'Dashboard'
      },
      {
        icon: shallowRef(MailSvg),
        text: 'MailBox',
        badgeCount: 182
      },
      {
        icon: shallowRef(FilesSvg),
        text: 'Pages',
        subItems: [
          'Sign Up',
          'Sign In',
          'Recover Password',
          'Locked Screen',
          'User Profile',
          'Session Timeout',
          'Calendar',
          'Timeline',
          'Media Gallery',
          'Invoice',
          'Blank Page',
          '404',
          '500',
          'Log Viewer',
          'Search Results'
        ]
      },
      {
        icon: shallowRef(TasksSvg),
        text: 'UI Elements',
        subItems: [
          'Typography',
          'Icons',
          'Tabs',
          'Panels',
          'Widgets',
          'Portlets',
          'Buttons',
          'Alerts',
          'Notifications',
          'Modals',
          'Lightbox',
          'Progress Bars',
          'Sliders',
          'Carousels',
          'Accordions',
          'Nestable',
          'Tree View',
          'Grid System',
          'Charts',
          'Animations',
          'Extra'
        ]
      },
      {
        icon: shallowRef(FormSvg),
        text: 'Forms',
        subItems: ['Basic', 'Advanced', 'Validation', 'Layouts', 'Wizard', 'Code Editor']
      },
      {
        icon: shallowRef(TableSvg),
        text: 'Tables',
        subItems: ['Basic', 'Advanced', 'Responsive', 'Editable', 'Ajax', 'Pricing']
      },
      {
        icon: shallowRef(MapPinSvg),
        text: 'Maps',
        subItems: ['Basic', 'Map Builder', 'Vector']
      },
      {
        icon: shallowRef(LayoutSvg),
        text: 'Layouts',
        subItems: ['Default', 'Boxed', 'Menu Collapsed', 'Scroll']
      },
      {
        icon: shallowRef(MenuLevelsSvg),
        text: 'Menu Levels',
        subItems: ['First Level', 'Second Level']
      },
      {
        icon: shallowRef(LinkExternalSvg),
        text: 'Front-End',
        extra: '(Not Included)'
      }
    ] as SideMenuNavigationItem[],
    menuProjectItems: [
      {
        color: 'red',
        text: 'JSOFT HTML5 Template'
      },
      {
        color: 'blue',
        text: 'Tucson Template'
      },
      {
        color: 'green',
        text: 'JSOFT Admin'
      }
    ] as SideMenuProjectItem[],
    menuStatsItems: [
      {
        text: 'Stat 1',
        progress: 85
      },
      {
        text: 'Stat 2',
        progress: 70
      },
      {
        text: 'Stat 3',
        progress: 2
      }
    ] as SideMenuStatItem[]
  })
});
</script>

<style scoped></style>
