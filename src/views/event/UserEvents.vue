<template>
  <div class="flex flex-col justify-center my-2">
    <h2 class="text-cyan text-center" v-if="user">{{ user.displayName.toUpperCase() }} Event :</h2>
    <div class="flex flex-col justify-center" v-if="docs.length">
      <div class="flex flex-row justify-start rounded-md bg-white 
      text-primary p-2 m-2" v-for="event in docs">
        <h3 class="basis-2/3">{{ event.title }}</h3>
        <router-link class="basis-1/4" :to="{ name: 'update-event', params: { id: event.id } }">
          Update
        </router-link>
        <button class="mx-2 px-1 text-white rounded-md bg-cyan" @click="() => handleDelete(event)">
          <img class="h-4 w-4" src="@/assets/trash.svg" alt="trash">
        </button>
      </div>
    </div>
    <div v-if="error">
      {{ error }}
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

  const props = defineProps<{ id: string }>();

  const { user } = getUser();
  const { sendToParticipants } = useNotifications();

  const { docs, error } = getCollection('events', 
    ['creatorId', '==', props.id]);

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

<style scoped>
.event {
  display: flex;
  flex-direction: row;
 }
</style>