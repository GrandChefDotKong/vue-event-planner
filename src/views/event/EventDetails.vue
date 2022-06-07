<template>
  <div class="px-6 h-full grow flex flex-col justify-around py-3" >
    <div v-if="event" class="basis-1/3 flex flex-col justify-between text-primary">
      <h3 class="self-center px-2 mb-2 py-1 text-lg w-fit rounded-md bg-primary text-white shadow-sm">{{ event?.title }}</h3>
      <p>What : {{ event.description }}</p>
      <p v-if="event.dates">When : {{ event.dates.toDate().toDateString() }}
      at : {{ event.dates.toDate().toLocaleTimeString() }}
      </p>
      <p v-else>When : not decided yet</p>
      <p>Where : {{ event.location }}</p>
      <h3 class="mb-1">List of participants : </h3>
      <ul class="flex flex-row mb-1" v-if="participants.length">
        <li class="ml-2 text-violet" v-for="participant in participants">
          {{ participant.displayName }}, 
        </li>
      </ul>
      <div v-else>No participants</div>
      <div class="self-center">
        <button class="text-sm border-solid shadow-md border-cyan rounded-md bg-cyan 
      text-white border-2 p-2" v-if="!isParticipating" @click="addParticipant">Click to join</button>
        <button class="text-sm shadow-md border-solid border-cyan rounded-md bg-cyan 
      text-white border-2 p-2" v-else @click="removeParticipant">Click to unjoin</button>
      </div>
    </div>
    <div class="basis-2/3 pt-4">
      <chatroom :id="props.id" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { getDocument } from '@/composables/getDocument';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/auth/getUser';
import Event from '@/interface/Event';
import Chatroom from '@/components/chat/Chatroom.vue';
import { computed, Ref, ref, watch } from 'vue';
import User from '@/interface/User';
import { doc,getDoc } from 'firebase/firestore';
import { projectStore } from '@/firebase/config';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';

  const props = defineProps<{ id: string }>();
  const { document: event, error }: { document: Ref<Event>, error: Ref } = getDocument('events', props.id);
  const { updateDocument } = useDocument('events', props.id);
  const { sendToParticipants } = useNotifications();

  const { user } = getUser();

  const isParticipating = computed<Boolean>(() => {
    if(!user.value || !participants.value.length) return false;

    return participants.value.some((participant) => {
      if(user.value?.uid) {
        return participant.uid === user.value.uid;
      }
    })
  })

  const participants = ref<User[]>([]);

  watch(event, () => {
    participants.value = [];

    if(!event.value.participants.length) return;

    event.value.participants.forEach(async(userRef) => {
    //  const { document: user }: { document: Ref<User> } = await getDocumentWithRef(userRef);
      const userSnap = await getDoc(userRef);
      if(userSnap.exists()) {
        
        participants.value.push({ ...userSnap.data(), uid: userSnap.id  } as User);
      }
    })
  })

  const addParticipant = async () => {
    if(!user.value || !event.value || isParticipating.value) return;

    sendToParticipants({
      type: NotificationsType.event_update,
      content: `${user.value.displayName} is joining ${event.value.title}`,
      link: `/events/${event.value.id}`,
    }, event.value.participants);

    await updateDocument({ 
      participants: [...event.value.participants, doc(projectStore,'users', user.value.uid)]
    });

  }

  const removeParticipant = async () => { 
    if(!user.value || !event.value) return;

    if(!isParticipating.value) return;

    const newPraticipants = event.value.participants.filter(ref => {
      if(user.value) {
        return ref.path !== `users/${user.value.uid}`
      }
    });
  
    sendToParticipants({
      type: NotificationsType.event_update,
      content: `${user.value.displayName} won't join ${event.value.title}`,
      link: `/events/${event.value.id}`,
    }, newPraticipants);
  
    await updateDocument({ 
      participants: newPraticipants
    });
  }

</script>

<style scoped>
</style>