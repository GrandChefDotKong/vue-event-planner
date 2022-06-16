<template>
  <div class="px-6 h-full flex flex-col justify-start py-3" >
    <div v-if="event" class="flex-grow flex
    flex-col justify-between text-primary">
      <h3 class="self-center px-2 mb-2 py-1 text-lg w-fit rounded-md 
      text-primary border-2 border-primary shadow-sm">
        {{ event.title }}
      </h3>
      <p class="text-center">{{ event.description }}</p>
      <p v-if="event.dates">When : {{ event.dates.toDate().toDateString() }}
      at : {{ event.dates.toDate().toLocaleTimeString() }}
      </p>
      <p v-else>When : not decided yet</p>
      <p>Where : {{ event.location }}</p>
      <h3 class="text-primary w-fit ml-2">Participants :</h3>
      <div class="h-fit p-4 rounded-2xl bg-primary_bg flex flex-row gap-2 
      justify-start items-start overflow-x-auto" v-if="participants.length">
        <div class="w-fit min-w-[4rem] h-full flex flex-col items-center rounded-md shadow-md bg-white 
        border border-primary text-primary p-2" v-for="member in participants">
          <img class="h-9 w-9 rounded-lg" v-if="member.photoURL" :src="member.photoURL" alt="avatar">  
          <img class="w-auto h-9 rounded-lg" v-else src="@/assets/default-avatar.svg" alt="avatar">  
          <span class="text-center my-auto text-sm h-fit w-full">{{ member.displayName }}</span>
        </div>
      </div>
      <div v-else>No participants</div>
      <div class="mx-auto w-fit m-2">
        <button class="mr-2 text-sm border-solid shadow-md border-cyan rounded-md bg-cyan 
      text-white border-2 p-2" v-if="!isParticipating" @click="addParticipant">Click to join</button>
        <button class="mr-2 text-sm shadow-md border-solid border-cyan rounded-md bg-cyan 
      text-white border-2 p-2" v-else @click="removeParticipant">Click to unjoin</button>
       <button class="text-sm border-solid shadow-md border-cyan rounded-md bg-white 
      text-cyan border-2 p-2" v-if="true" @click="handleInterested">Interested</button>
        <button class="text-sm shadow-md border-solid border-cyan rounded-md bg-cyan 
      text-white border-2 p-2" v-else @click="">Unflollow</button>
      </div>
    </div>
    <chatroom :id="props.id" />
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

  const handleInterested = () => {
    alert('Coming soon ...');
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