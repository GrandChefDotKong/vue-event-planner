<template>
  <h2 class="text-center text-white mx-4 bg-primary my-2 text-lg">
    Tenshiba Event Calendar
  </h2>
  <p class="text-right text-primary text-xs mx-4">beta version</p>
  <div v-if="docs">  
    <Calendar :events="docs"/>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import Notifications from "@/components/Notifications.vue";
import Notifications1 from "@/components/Notifications.vue";

  const { docs } = getCollection('events');

</script>
