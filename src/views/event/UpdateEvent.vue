<template>
  <div v-if="event">
    <event-form  formTitle="Update" :event="event" :handleSubmit="handleSubmit" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import useDocument from '@/composables/useDocument';
import getUser from '@/composables/auth/getUser';
import getDocument from '@/composables/getDocument';
import EventForm from '@/components/forms/EventForm.vue';
import { useRouter } from 'vue-router';
import { Timestamp } from 'firebase/firestore';
import useNotifications from '@/composables/useNotifications';

  const props = defineProps<{ id: string }>();

  const { updateDocument, error } = useDocument('events', props.id)
  const { document: event } = getDocument('events', props.id);

  const router = useRouter();
  const { user } = getUser();
  const isPending = ref(false);
  const { sendToParticipants } = useNotifications();

  const handleSubmit = async ( 
    title: string, 
    description: string,
    location: string,
    dates: Timestamp,
  ) => {

    if(!user.value) return;
    if(!user.value.displayName) return;

    isPending.value = true;

    const res: any =  await updateDocument({
      title: title,
      description: description,
      location: location,
      dates: dates
    });

    isPending.value = false;
    if(!error.value) {
      
      sendToParticipants(`Event ${title} has been updated !`, event.value.participants)

      router.push({ name: 'event-details', params: { id: props.id }});

    } else {
      console.log(error.value);
    }
  }
</script>