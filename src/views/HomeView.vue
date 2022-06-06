<template>
  <h2 class="text-center text-white mx-4 bg-primary my-2 text-lg rounded-md shadow-md">
    Tenshiba Event Calendar
  </h2>
  <p class="text-right text-primary text-xs mx-4">beta version</p>
  <div v-if="docs">  
    <Calendar :events="docs"/>
  </div>
  <div class="flex flex-col items-center text-center text-lg mt-2 text-violet">
    <h3 class="font-bold m-2">Not scheduled events :</h3>
    <div class="bg-violet px-2 py-1 rounded-md shadow-md text-white w-fit" v-for="event in noDateEvent">
      <router-link :to="{ name: 'event-details', params: { id: event.id } }">
        {{ event.title }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import Notifications from "@/components/Notifications.vue";
import Notifications1 from "@/components/Notifications.vue";
import { computed } from "vue";

  const { docs } = getCollection('events');

  const noDateEvent = computed(() => {
    if(!docs.value) return null;

    return docs.value.filter((doc) => {
      return  doc.dates == null;
    })
  })

</script>
