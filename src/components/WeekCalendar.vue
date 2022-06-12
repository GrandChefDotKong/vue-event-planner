<template>
  <div v-if="thisWeekEvents">
    <div class="my-4 mx-2" v-for="index in 7" :key="index">
      <h3 class="bg-primary text-white text-lg text-center">
        {{ index === 1 ? 'Today' : nextDay(index).toDateString() }}
      </h3>
      <div class="text-center" v-if="isEventToday(nextDay(index))?.length">
        <div class="bg-violet rounded-md shadow-md text-white mx-12 py-1 my-2" v-for="event in isEventToday(nextDay(index))">
          <router-link :to="{ name: 'event-details', params: { id: event.id }}">
            {{ event.title }}
          </router-link>
        </div>
      </div>
      <div class="text-center mx-12 my-1" v-else>No event today</div>
    </div>
  </div> 
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import { computed } from 'vue';

  const { user } = getUser();

  const props = defineProps<{ events: Event[] }>();

  const today = new Date();

  const thisWeekEvents = computed(() => {

    return props.events.filter((event) => {
      if(!event.dates) return;

      return (event.dates.toDate().getDate() <= today.getDate() + 6 &&
        event.dates.toDate().getDate() >= today.getDate());
    })
  })

  const isEventToday = (today: Date) => {
    if(!props.events) return;
    return props.events.filter((event) => {
        return event.dates?.toDate().toDateString() === today.toDateString();
    })
  }

  const nextDay = (index: number) => {
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + index - 1);

    return tomorrow;
  }



</script> 

<style scoped>
</style>