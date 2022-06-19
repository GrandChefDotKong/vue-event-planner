<template>
  <div class="grow flex flex-col justify-center items-center">
    <h2 class="bg-primary rounded-md text-white px-2 h-fit text-2xl w-fit mt-2 mb-1">
      <button class="h-4 w-4" @click="handlePrevYear">
        <img src="@/assets/arrow-left.svg" alt="arrow left">
      </button>
        {{ month.getFullYear().toString() }}
      <button class="h-4 w-4" @click="handleNextYear">
        <img src="@/assets/arrow-right.svg" alt="arrow left">
      </button>
    </h2>
    <button class="self-end bg-cyan text-white px-2 py-0.5 rounded-md shadow-md mr-8 flex flex-row"
    @click="() => gridView = !gridView"
    >
      <img class="h-6 w-6" src="@/assets/touch.svg" alt="touch">
      <span>{{ gridView ? 'Column' : 'Grid' }}</span>
    </button>
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
    <div v-if="!gridView" id="monthContainer" class="flex-auto overflow-y-auto">
      <div class="mx-2 mb-1" v-for="day in month.getDate()" :key="day">
        <h3 id="today" class="bg-magenta text-white font-bold border border-primary text-lg text-center"
        v-if="today.getFullYear() === month.getFullYear() && today.getMonth() === month.getMonth() && today.getDate() === day">
          TODAY : {{ today.toLocaleDateString(
            'default', { weekday: 'long', day: 'numeric' }
          ) }}
        </h3>
        <h3 v-else class="bg-white text-primary border border-primary text-lg text-center">
          {{ new Date(month.getFullYear(), month.getMonth(), day).toLocaleDateString(
            'default', { weekday: 'long', day: 'numeric' }
          ) }}
        </h3>
        <div class="text-center mt-1" 
        v-if="isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))?.length"
        >
          <router-link v-for="event in isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))" 
          :to="{ name: 'event-details', params: { id: event.id }}">
            <div class="bg-violet rounded-md shadow-md text-white mx-12 py-1 mt-1" 
            >
              {{ `${event.dates?.toDate().toLocaleTimeString('fr-FR',{
                hour: '2-digit',
                minute: '2-digit'
              })} - 
              ${event.title}` }}
            </div>
          </router-link>
        </div>
        <div v-else class="w-fit mx-auto mt-1">
          <router-link :to="{ name: 'create-event', params: 
          { date: new Date(month.getFullYear(), month.getMonth(), day).getTime() } }">
            <div class="bg-cyan rounded-md mx-auto shadow-md text-center text-white 
            w-fit px-2 py-1">
              <img class="h-6 w-6 mx-auto" src="@/assets/create.svg" alt="create">
              <span class="text-white text-xs">Add an event</span>
            </div>
          </router-link>
        </div>
      </div>
    </div>
<!-- THis is sparta !!! -->
    <div v-else id="monthContainer" class="grid grid-cols-7 overflow-y-auto">
      <div class="text-center text-primary" v-for="day in weekDay" :key="day">
        {{ day }}
      </div>
      <div id="monthId" :style="`grid-column: 1 / ${firstDay};`">
      </div>
      <div class="m-1" v-for="day in month.getDate()" :key="day">
        <h3 id="today" class="bg-magenta text-white font-bold border border-primary text-lg text-center"
        v-if="today.getFullYear() === month.getFullYear() && today.getMonth() === month.getMonth() && today.getDate() === day">
          {{ day }}
        </h3>
        <h3 v-else class="bg-white text-primary border border-primary text-lg text-center">
          {{ day }}
        </h3>
        <div class="text-center" 
        v-if="isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))?.length"
        >
          <router-link v-for="event in isEventOnThisDay(new Date(month.getFullYear(), month.getMonth(), day))" 
          :to="{ name: 'event-details', params: { id: event.id }}">
            <div class="bg-violet rounded-md shadow-md text-white py-1 my-1" 
            ><img class="h-6 w-6 mx-auto" src="@/assets/event.svg" alt="event"></div>
          </router-link>
        </div>
        <div v-else class="w-fit mx-auto">
          <router-link :to="{ name: 'create-event', params: 
          { date: new Date(month.getFullYear(), month.getMonth(), day).getTime() } }">
            <div class="bg-cyan rounded-md mx-auto shadow-md text-center text-white w-fit px-2 py-1 my-1">
              <img class="h-6 w-6 mx-auto" src="@/assets/create.svg" alt="create">
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import { computed } from '@vue/reactivity';
import { onUpdated, ref, watch } from 'vue';

  const { user } = getUser();

  const props = defineProps<{ events: Event[] }>();

  const today = new Date();

  const month = ref(
    new Date(today.getFullYear(), today.getMonth() + 1, 0)
  )

  const gridView = ref(true);

  const weekDay = computed(() => {

    let weekDay: string[] = Array(7);

    for(let i = 0; i < 7; i++) {
      const date = new Date(month.value.getFullYear(), month.value.getMonth(), i);

      weekDay[date.getDay()] = date.toLocaleDateString('default', { weekday: 'narrow' });
    }

    return weekDay;
  })


  const firstDay = new Date(month.value.getFullYear(), 
    month.value.getMonth(), 1).getDay();

  watch(month,() => {
    let monthEl = document.getElementById('monthId');

    if(!monthEl || !month.value) return;

    const spacing = new Date(month.value.getFullYear(), 
    month.value.getMonth(), 1).getDay();

    if(spacing === 0) {
      monthEl.style.display = 'none';
    } else {
      monthEl.style.display = 'initial';
    }

    monthEl.className = ``;
    monthEl.style.gridColumn = `1 / span ${spacing}`;
  });


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