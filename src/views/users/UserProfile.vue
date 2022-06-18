<template>
  <div v-if="userProfile" class="flex flex-col items-center flex-grow justify-start my-2">
    <img class="shadow-md h-32 w-auto rounded-2xl" v-if="userProfile.photoURL" :src="userProfile.photoURL" alt="user-avatar">
    <img class="h-32 w-auto" v-else src="@/assets/default-avatar.svg" alt="user-avatar">
    <h2 class="text-cyan text-center h-12 mt-2" >
      {{ userProfile.displayName.toUpperCase() }}
    </h2>
    <h3 class="text-primary w-fit mb-2">Next Event : </h3>
    <router-link v-if="nextEvent" :to="{ name: 'event-details', params: { id: nextEvent.id } }">
      <div class="bg-violet text-white text-lg px-2 py-1 rounded-md">
        {{ `${nextEvent.dates?.toDate().toLocaleDateString('default', { day: 'numeric', month: 'long' })} - 
        ${nextEvent.title}` }}
      </div>
    </router-link>
    <h3 class="text-primary w-fit my-2">Event {{ isUserProfile ? 'You' : userProfile.displayName }} created : </h3>
    <div class="max-h-40 flex flex-col justify-start bg-primary_bg rounded-2xl overflow-y-auto" v-if="createdByUser && createdByUser.length">
      <div class="flex border border-primary flex-row justify-start rounded-md shadow-md bg-white 
      text-primary p-2 m-3" v-for="event in createdByUser">
        <h3 class="basis-2/3">
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </h3>
        <router-link v-if="isUserProfile" class="w-fit text-xs mx-2 p-1 shadow-md text-white rounded-md bg-cyan" 
        :to="{ name: 'update-event', params: { id: event.id } }">
          Update
        </router-link>
        <button v-if="isUserProfile" class="mx-2 px-1 text-white rounded-md shadow-md bg-cyan" @click="() => handleDelete(event)">
          <img class="h-4 w-4" src="@/assets/trash.svg" alt="trash">
        </button>
      </div>
    </div>
    <div v-else>
      <div>
        {{ isUserProfile ? 'You' : userProfile.displayName }} haven't created any event yet.<br>
        <div v-if="isUserProfile" class="bg-cyan text-xs mt-2 mx-auto w-fit px-2 py-1 rounded-md shadow-md text-white">
          <router-link :to="{ name: 'create-event' }">
            <img class="h-7 w-7 mx-auto" src="@/assets/create.svg" alt="create">Create An Event
          </router-link>
        </div>
      </div>
    </div>
    <h3 class="text-primary w-fit mt-4">Event {{ isUserProfile ? 'You' : userProfile.displayName }} joined : </h3>
    <div class="max-h-36 flex mx-4 rounded-2xl flex-row flex-wrap justify-center bg-primary_bg overflow-y-auto" 
    v-if="joinedByUser && joinedByUser.length">
      <div class="flex flex-row rounded-md shadow-md bg-white 
      text-primary w-fit h-fit p-2 m-3" v-for="event in joinedByUser">
        <h3 class="w-fit">
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </h3>
      </div>
    </div>
    <div v-else>
      {{ isUserProfile ? 'You' : userProfile.displayName }} haven't joined any events yet.<br>
    </div>
    <div v-if="isUserProfile">
    <h3 class="text-primary w-fit mt-4">Edit my profile :</h3>
    <div class="bg-cyan text-xs mt-2 mx-auto w-fit px-2 py-1 rounded-md shadow-md text-white">
        <router-link :to="{ name: 'update-user' }">
          <img class="h-7 w-7 mx-auto" src="@/assets/edit.svg" alt="create">Update
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import { getSnapDocument } from '@/composables/getDocument';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';
import Event from '@/interface/Event';
import { computed, ComputedRef, ref, Ref } from '@vue/reactivity';
import { doc } from 'firebase/firestore';
import { projectStore } from '@/firebase/config';
import User from '@/interface/User';
import { onMounted, onUpdated, watch } from 'vue';

  const props = defineProps<{ id?: string }>();

  console.log(props.id);

  const { user } = getUser();
  const { sendToParticipants } = useNotifications();

  const { docs, error } = getCollection('events');

  const userProfile = ref<User | null>(null);

  if(props.id) {
    getSnapDocument('users', props.id).then((res) => {
      userProfile.value = res.document.value;
    });
  }

  onMounted(() => {
    console.log('mounted');
    if(props.id) return;

    userProfile.value = user.value;
  })
  
  const isUserProfile = computed(() => {
    if(!props.id || !user.value) return true;

    return props.id === user.value.id;
  });

  const createdByUser = computed(() => {
    if(!docs.value ) return null;

    return docs.value.filter((doc: Event) => {
      return doc.creatorId === userProfile.value?.id;
    });
  });

  const joinedByUser = computed(() => {
    if(!docs.value) return null;
    if(!userProfile.value) return null;

    const docRef = doc(projectStore, 'users', userProfile.value.id);

    return docs.value.filter((document: Event) => {
      return document.participants.find((participant) => 
        participant.path === docRef.path);
    })
  });

  const nextEvent: ComputedRef<Event | null> = computed(() => {
    if(!docs.value || !userProfile.value) return null;

    const docRef = doc(projectStore, 'users', userProfile.value.id);
    const today = new Date();

    let nextEvent: Event | null | undefined = null;

    docs.value.sort((a, b) => a.dates - b.dates);
    
    docs.value.forEach((document: Event) => {
      if(!document.dates || document.dates.toDate() < today || nextEvent) return;

      if(document.participants.find((participant) => 
      participant.path === docRef.path )) {
        nextEvent = document;
      }
    });

    return nextEvent;
  });

  const handleDelete = async (event: Event) => {
    if(!isUserProfile) return;

    const { deleteDocument: deleteEvent } = useDocument('events', event.id);
    const { deleteDocument: deleteChat } = useDocument('chats', event.id);
  
    await deleteEvent();
    await deleteChat();

    sendToParticipants({
      type: NotificationsType.event_delete,
      content: `${event.title} has been deleted.`,
    }, event.participants)

  }
</script>
