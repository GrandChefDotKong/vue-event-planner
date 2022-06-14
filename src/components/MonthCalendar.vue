<template>
  <div class="grow flex flex-col justify-center items-center">
    <h2 class="bg-primary rounded-md text-white px-2 h-fit text-2xl w-fit mt-2 mb-4">
      <button class="h-4 w-4" @click="handlePrevYear">
        <img src="@/assets/arrow-left.svg" alt="arrow left">
      </button>
        {{ month.getFullYear().toString() }}
      <button class="h-4 w-4" @click="handleNextYear">
        <img src="@/assets/arrow-right.svg" alt="arrow left">
      </button>
    </h2>
  </div>
  <div class="h-[34rem] flex flex-col" @touchstart="touchStart">
    <h2 class="h-fit bg-primary font-bold
    text-white px-2 py-1 text-xl text-center flex flex-row items-center justify-between">
      <button class="h-4 w-4" @click="handlePrevMonth">
        <img src="@/assets/arrow-left.svg" alt="arrow left">
      </button>
        {{ month.toLocaleString('default', { month: 'long' }).toLocaleUpperCase() }}
      <button class="h-4 w-4" @click="handleNextMonth">
        <img src="@/assets/arrow-right.svg" alt="arrow left">
      </button>
    </h2>
    <div id="monthContainer" class="flex-auto overflow-y-auto">
      <div class="my-4 mx-2" v-for="day in month.getDate()" :key="day">
        <h3 id="today" class="bg-magenta text-white font-bold border border-primary text-lg text-center"
        v-if="today.getFullYear() === month.getFullYear() && today.getMonth() === month.getMonth() && today.getDate() === day">
          TODAY : {{ new Date(month.getFullYear(), month.getMonth()+1, day).toLocaleDateString(
            'default', { weekday: 'long', day: 'numeric' }
          ) }}
        </h3>
        <h3 v-else class="bg-white text-primary border border-primary text-lg text-center">
          {{ new Date(month.getFullYear(), month.getMonth()+1, day).toLocaleDateString(
            'default', { weekday: 'long', day: 'numeric' }
          ) }}
        </h3>
        <div class="text-center" 
        v-if="isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))?.length"
        >
          <router-link v-for="event in isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))" 
          :to="{ name: 'event-details', params: { id: event.id }}">
            <div class="bg-violet rounded-md shadow-md text-white mx-12 py-1 my-2" 
            >
              {{ `${event.dates?.toDate().toLocaleTimeString('fr-FR',{
                hour: '2-digit',
                minute: '2-digit'
              })} - 
              ${event.title}` }}
            </div>
          </router-link>
        </div>
        <div class="text-center mx-12 my-1" v-else>No event today</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import { onMounted, onUpdated, ref } from 'vue';

  const { user } = getUser();

  const props = defineProps<{ events: Event[] }>();

  const today = new Date();

  const month = ref(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  )


  onUpdated(() => {
    const today = document.getElementById('today');
    if(!today) return;

    today.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });

  })

  
  const handlePrevMonth = () => {
    month.value = new Date(month.value.getFullYear(), month.value.getMonth(), 0);
  }

  const handleNextMonth = () => {
    month.value = new Date(month.value.getFullYear(), month.value.getMonth() + 2, 0);
  }

  const handlePrevYear = () => {
    month.value = new Date(month.value.getFullYear() - 1, month.value.getMonth() + 1, 0);
  }

  const handleNextYear = () => {
    month.value = new Date(month.value.getFullYear() + 1, month.value.getMonth() + 1, 0);
  }

  const touchEnd = (touchEvent: any, posXStart: number) => {
    if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
      return;
    }
    
    const posXEnd = touchEvent.changedTouches[0].clientX;
    if (posXStart + 150 < posXEnd) {
      handlePrevMonth();
    } else if (posXStart - 150 > posXEnd) {
      handleNextMonth();
    }
  }

  const touchStart = (touchEvent: any) => {
    if (touchEvent.changedTouches.length !== 1) { // We only care if one finger is used
      return;
    }
    const posXStart = touchEvent.changedTouches[0].clientX;
    addEventListener('touchend', (touchEvent) => touchEnd(touchEvent, posXStart), {once: true});
  };

  const isEventOnThisDay = (day: Date) => {
    if(!props.events) return;
    return props.events.filter((event) => {
        return event.dates?.toDate().toDateString() === day.toDateString();
    })
  }
</script> 

<style scoped>
</style>