<template>
  <Notifications />
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
