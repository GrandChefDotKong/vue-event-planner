<template>
  <h2 class="text-center text-primary border-2 border-primary mx-4 my-2 text-lg rounded-md">
    Tenshiba Events Calendar
  </h2>
  <p class="text-right text-primary text-xs mx-4">alpha v0.0.02</p>
  <div v-if="docs">  
    <Calendar :events="docs"/>
  </div>
  <div v-if="noDateEvent?.length" class="flex flex-col items-center text-sm m-2 text-violet">
    <h3 class="font-bold text-base m-2">Not scheduled events :</h3>
    <div class="flex flex-row gap-y-2 justify-between flex-wrap w-full overflow-y-auto">
      <div class="bg-violet px-2 py-1 rounded-md shadow-md text-white" v-for="event in noDateEvent">
        <router-link :to="{ name: 'event-details', params: { id: event.id } }">
          {{ event.title }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import { computed } from "vue";

  const { docs } = getCollection('events');

  const noDateEvent = computed(() => {
    if(!docs.value) return null;

    return docs.value.filter((doc) => {
      return  doc.dates == null;
    })
  })

</script>
