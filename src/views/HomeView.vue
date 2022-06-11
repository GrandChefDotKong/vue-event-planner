<template>
  <h2 class="text-center text-primary border-2 border-primary mx-4 mt-2 mb-1 text-lg rounded-md">
    Tenshiba Events Calendar
  </h2>
  <p class="text-right text-primary text-xs mx-4">alpha v0.0.03</p>
  <div class="w-fit mx-auto my-2">
    <span class="mr-2 bg-violet px-2 py-1 rounded-md shadow-md text-white">
      This Week
    </span>
    <span class="bg-white px-2 py-1 border-violet border-2 rounded-md shadow-md text-violet">
      This Month
    </span>
  </div>
  <div class="mt-2" v-if="docs">  
    <Calendar :events="docs"/>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import { computed } from "vue";

  const { docs } = getCollection('events');

</script>
