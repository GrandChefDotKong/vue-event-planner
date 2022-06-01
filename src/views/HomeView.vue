<template>
  <div v-if="docs">
    <Calendar :events="docs"/>
  </div>
</template>

<script setup lang="ts">
import getCollection from "@/composables/getCollection";
import Calendar from '@/components/Calendar.vue';
import { onUpdated } from "vue";
  
  const { docs } = getCollection('events');

</script>
