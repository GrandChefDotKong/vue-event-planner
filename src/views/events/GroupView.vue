<template>
  <div class="flex flex-col items-center flex-grow justify-start my-2">
    <h2 class="text-cyan text-center h-12 mt-2">
      Tenshiba Group Page
    </h2>
    <h3 class="text-primary w-fit mb-2 text-xl">Members List :</h3>
    <div class="h-44 w-5/6 p-4 rounded-md bg-primary_bg grid gap-2 grid-cols-2 
    overflow-y-auto" 
    v-if="members.length">
      <div class="w-full flex flex-row justify-start items-center rounded-md shadow-md bg-white 
      border border-primary text-primary p-2" v-for="member in members">
        <img class="w-8 h-8 rounded-lg" v-if="member.photoURL" :src="member.photoURL" alt="avatar">  
        <span class="text-center w-full">{{ member.displayName }}</span>
      </div>
    </div>
    <h3 class="text-primary w-fit text-xl mt-2">Events List :</h3>
    <p class="mx-4 my-2">Events whitout a date are in :
      <span class="border border-violet rounded-md p-1 text-xs text-violet">violet</span>
    </p>
    <div class="h-80 mx-4 rounded-md text-sm text-center bg-primary_bg overflow-y-auto grid grid-cols-3" v-if="events.length">
      <div v-for="event in events">
        <div class="w-fit flex flex-row justify-start rounded-md shadow-md bg-white 
        border border-primary text-primary p-2 m-3" v-if="event.dates">
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </div>
        <div class="w-fit flex flex-row justify-start rounded-md shadow-md bg-white 
      text-violet border border-violet p-2 m-3" v-else>
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </div>
      </div>
    </div>
    <div v-else>You have no event yet.<br>
      Create you first event :<br>
      <div class="bg-violet text-xs mt-2 mx-auto w-fit px-2 py-1 border-violet border-2 rounded-md shadow-md text-white">
        <router-link :to="{ name: 'create-event' }">
          <img class="h-7 w-7 mx-auto" src="@/assets/create.svg" alt="create">Create An Event
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/auth/getUser';
import useNotifications from '@/composables/useNotifications';
import { computed } from 'vue';
import User from '@/interface/User';

  const { user } = getUser();

  const { docs: events, error } = getCollection('events');
  const { docs: members } = getCollection('users');

</script>
