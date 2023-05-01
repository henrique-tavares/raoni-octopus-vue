<template>
  <div class="flex w-full flex-col gap-4 bg-neutral-900 py-4 text-sm text-neutral-400">
    <button
      class="p-2 md:hidden"
      @click="$emit('close')"
    >
      <CloseSvg class="h-5 w-5" />
    </button>
    <span class="px-4 uppercase">Upcoming Tasks</span>
    <DatePicker
      borderless
      transparent
      expanded
      locale="en"
    />
    <hr class="border-neutral-700" />
    <div class="flex flex-col gap-4">
      <div
        v-for="(appointment, i) in appointments"
        :key="i"
        class="flex flex-col items-start px-4"
      >
        <span class="text-xs text-neutral-500">{{
          formatDate(appointment.date, 'MM/DD/YYYY')
        }}</span>
        <span class="text-neutral-100"> {{ appointment.text }} </span>
      </div>
    </div>
    <div class="flex flex-col gap-4">
      <span class="px-4 uppercase">Friends</span>
      <div
        v-for="(friend, i) in friends"
        :key="i"
        class="flex flex-row items-center gap-3 px-4"
      >
        <div class="relative h-8 w-8 rounded-full bg-neutral-300">
          <div
            :class="[
              'absolute right-1 top-1 h-3.5 w-3.5 -translate-y-1/2 translate-x-1/2 rounded-full border-2 border-neutral-900',
              {
                'bg-red-600': friend.status == 'offline',
                'bg-green-600': friend.status == 'online'
              }
            ]"
          />
        </div>
        <div class="flex flex-col items-start">
          <span class="text-neutral-100"> {{ friend.name }} </span>
          <span class="text-xs text-neutral-500"> {{ friend.extra }} </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { DatePicker } from 'v-calendar';
import dayjs from 'dayjs';

import CloseSvg from '@/assets/svg/close.svg?component';

type Appointment = {
  date: string;
  text: string;
};

type Friend = {
  name: string;
  extra: string;
  status: 'online' | 'offline';
};

export default defineComponent({
  components: {
    DatePicker,
    CloseSvg
  },
  setup() {
    return {};
  },
  data: () => ({
    appointments: [
      {
        date: '2014-04-19',
        text: 'Company Meeting'
      }
    ] as Appointment[],
    friends: [
      {
        name: 'Joseph Doe Junior',
        extra: 'Hey, how are you?',
        status: 'online'
      },
      {
        name: 'Joseph Doe Junior',
        extra: 'Hey, how are you?',
        status: 'online'
      },
      {
        name: 'Joseph Doe Junior',
        extra: 'Hey, how are you?',
        status: 'offline'
      },
      {
        name: 'Joseph Doe Junior',
        extra: 'Hey, how are you?',
        status: 'offline'
      }
    ] as Friend[]
  }),
  methods: {
    formatDate(date: string, format: string) {
      return dayjs(date).format(format);
    }
  }
});
</script>

<style scoped></style>
