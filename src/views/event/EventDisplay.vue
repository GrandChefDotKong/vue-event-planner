<template>
  <div v-if="event" class="event">
      <h3>{{ event?.title }}</h3>
      <p>{{ event.description }}</p>
      <p>Location : {{ event.location }}</p>
      <div>
        <ul v-if="event.participants.length">
          <h3>Participants :</h3>
          <li v-for="participants in event.participants">
            {{ participants }}
          </li>
        </ul>
        <div v-else>No participants yet</div>
        <button v-if="!isParticipating" @click="addParticipant">Click to join</button>
        <button v-else @click="removeParticipant">Click to unjoin</button>
      </div>
  </div>
  <div>
    <chatroom :id="props.id" />
  </div>
</template>

<script setup lang="ts">
import getDocument from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import Chatroom from '@/components/chat/Chatroom.vue';
import { computed, Ref } from 'vue';

  const props = defineProps<{ id: string }>();
  const { document: event, error }: { document: Ref<Event>, error: Ref } = getDocument('events', props.id);
  const { updateDocument } = useDocument('events', props.id);

  const { user } = getUser();

  const isParticipating = computed<Boolean>(() => {
    if(!user.value?.displayName || !event.value?.participants.length) return false;

    return event.value.participants.includes(user.value.displayName);
  })

  const addParticipant = async () => {
    if(!user.value?.displayName || !event.value) return;

    if(isParticipating.value){ 
      console.log('is participating')
      return;
    }

      await updateDocument({ 
        participants: [...event.value.participants, user.value.displayName]
      });
  }

  const removeParticipant = async () => {
    if(!user.value?.displayName || !event.value) return;

    if(!isParticipating.value) return;

    const newPraticipants = event.value.participants.filter(
      (name) => name != user.value?.displayName
    )
    await updateDocument({ 
      participants: newPraticipants
    });
  }

</script>

<style scoped>
</style>