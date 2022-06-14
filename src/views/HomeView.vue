<template>
  <div class="flex-auto">
    <h2 class="text-center text-primary border-2 border-primary mx-4 mt-2 mb-1 text-lg rounded-md">
      Tenshiba Events Calendar
    </h2>
    <p class="text-right text-primary text-xs mx-4">alpha v0.0.05</p>
<!--
    <div class="w-fit mx-auto my-2">
      <button @click="() => showWeek(true)" class="mr-2 bg-violet px-2 py-1 rounded-md shadow-md text-white">
        This Week
      </button>
      <button @click="() => showWeek(false)" class="bg-white px-2 py-1 border-violet border-2 rounded-md shadow-md text-violet">
        This Month
      </button>
    </div>
-->
  </div>
  <div class="h-full flex-auto mt-2">
    <MonthCalendar :events="docs"/>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import WeekCalendar from "@/components/WeekCalendar.vue";
import MonthCalendar from "@/components/MonthCalendar.vue";
import { ref } from "vue";

  const { docs } = getCollection('events');

  const isShowWeek = ref(false);

  const showWeek = (bool: boolean) => {
    isShowWeek.value = bool;
  }

</script>
