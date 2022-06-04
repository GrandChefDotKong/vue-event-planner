<template>
  <div v-if="event" class="event">
      <h3>{{ event?.title }}</h3>
      <p>{{ event.description }}</p>
      <p>When ? : {{ event.dates.toDate() }}</p>
      <p>Location : {{ event.location }}</p>
      <ul v-if="participants.length">
        <li v-for="participant in participants">
          {{ participant.displayName }}
        </li>
      </ul>
      <div v-else>No participants</div>
      <div>
        <button v-if="!isParticipating" @click="addParticipant">Click to join</button>
        <button v-else @click="removeParticipant">Click to unjoin</button>
      </div>
  </div>
  <div>
    <chatroom :id="props.id" />
  </div>
</template>

<script setup lang="ts">
import { getDocument, getDocumentWithRef } from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import Chatroom from '@/components/chat/Chatroom.vue';
import { computed, onMounted, onUpdated, Ref, ref, watch } from 'vue';
import User from '@/interface/User';
import { getDoc } from 'firebase/firestore';

  const props = defineProps<{ id: string }>();
  const { document: event, error }: { document: Ref<Event>, error: Ref } = getDocument('events', props.id);
  const { updateDocument } = useDocument('events', props.id);

  const { user } = getUser();

  const isParticipating = computed<Boolean>(() => {
    if(!user.value || !event.value?.participants.length) return false;

    return false;
    //return event.value.participants.includes(user.value.uid);
  })

  const participants = ref<User[]>([]);

  watch(event, () => {
    participants.value = [];
    
    if(!event.value.participants.length) return;

    event.value.participants.forEach(async(userRef) => {
    //  const { document: user }: { document: Ref<User> } = await getDocumentWithRef(userRef);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()) {
        
        participants.value.push(userSnap.data() as User);
      }
    }) 
  })


  const addParticipant = async () => {
    if(!user.value || !event.value) return;

    return;

    if(isParticipating.value) return;

      await updateDocument({ 
        participants: [...event.value.participants, user.value?.uid]
      });
  }

  const removeParticipant = async () => { /*
    if(!user.value || !event.value) return;

    if(!isParticipating.value) return;

    const newPraticipants = event.value.participants.filter(
      (name) => name != user.value?.uid
    )
    await updateDocument({ 
      participants: newPraticipants
    }); */
  }

</script>

<style scoped>
</style>