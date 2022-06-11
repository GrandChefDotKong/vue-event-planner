<template>
  <div class="flex flex-col items-center flex-grow justify-start my-2">
    <h2 class="text-cyan text-center h-12 mt-2" v-if="user">
     {{ user.displayName.toUpperCase() }} Page</h2>
    <h3 class="text-primary w-fit mb-2">Event I created : </h3>
    <div class="flex flex-col justify-center" v-if="createdByUser && createdByUser.length">
      <div class="flex flex-row justify-start rounded-md shadow-md bg-white 
      text-primary p-2 m-3" v-for="event in createdByUser">
        <h3 class="basis-2/3">
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </h3>
        <router-link class="w-fit text-xs mx-2 p-1 shadow-md text-white rounded-md bg-cyan" 
        :to="{ name: 'update-event', params: { id: event.id } }">
          Update
        </router-link>
        <button class="mx-2 px-1 text-white rounded-md shadow-md bg-cyan" @click="() => handleDelete(event)">
          <img class="h-4 w-4" src="@/assets/trash.svg" alt="trash">
        </button>
      </div>
    </div>
    <div v-else>You haven't created any event yet.<br>
      Create you first event :<br>
      <div class="bg-violet text-xs mt-2 mx-auto w-fit px-2 py-1 border-violet border-2 rounded-md shadow-md text-white">
        <router-link :to="{ name: 'create-event' }">
          <img class="h-7 w-7 mx-auto" src="@/assets/create.svg" alt="create">Create An Event
        </router-link>
      </div>
    </div>
    <h3 class="text-primary w-fit mt-4">Event I joined : </h3>
    <div class="flex flex-row flex-wrap justify-center" 
    v-if="joinedByUser && joinedByUser.length">
      <div class="flex flex-row rounded-md shadow-md bg-white 
      text-primary w-fit p-2 m-3" v-for="event in joinedByUser">
        <h3 class="w-fit">
          <router-link :to="{ name: 'event-details', params: { id: event.id } }">
            {{ event.title }}
          </router-link>
        </h3>
      </div>
    </div>
    <div v-else>You haven't joined any events yet.<br>
      Check the event available  
    </div>
  </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';
import Event from '@/interface/Event';
import { computed } from '@vue/reactivity';
import { doc } from 'firebase/firestore';
import { projectStore } from '@/firebase/config';

  const props = defineProps<{ id: string }>();

  const { user } = getUser();
  const { sendToParticipants } = useNotifications();

  const { docs, error } = getCollection('events');

  const createdByUser = computed(() => {
    if(!docs.value ) return null;

    return docs.value.filter((doc: Event) => {
      return doc.creatorId === user.value?.uid;
    });
  });

  const joinedByUser = computed(() => {
    if(!docs.value) return null;
    if(!user.value) return null;

    const docRef = doc(projectStore, 'users', user.value.uid);


    return docs.value.filter((document: Event) => {
      return document.participants.find((participant) => 
        participant.path === docRef.path);
    })
  });

  const handleDelete = async (event: Event) => {
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
