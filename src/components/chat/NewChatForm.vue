<template>
  <form class="self-center mt-1 p-0 shadow-md rounded-lg w-full flex flex-row 
  justify-around ">
    <input
      type="text" 
      placeholder="Type your message here"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
      class="w-full bg-white rounded-l-lg pl-2 
      focus:outline-none focus:shadow-md"
    >
    <button @click.prevent="handleSubmit" class="border-solid border-cyan 
    rounded-r-md bg-cyan text-white text-sm border-2 p-1">Send</button>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { timestamp } from '@/firebase/config';
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import Message from '@/interface/Message';
import { getSnapDocument } from '@/composables/getDocument';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';
import Event from '@/interface/Event';

  const props = defineProps<{ id: string, document: any }>();

  const message = ref('');
  const { user } = getUser();
  const { error, updateDocument } = useDocument('chats', props.id);
  const event = ref<Event | null>(null);

  getSnapDocument('events', props.id).then((res) => {
    event.value = res.document.value as Event;
  });

  const { sendToParticipants } = useNotifications();

  const handleSubmit = async () => {

    if(!user.value?.displayName || !message.value) return;

    const newMessage: Message = {
        message: message.value,
        userName: user.value.displayName,
        userId: user.value.id,
        createdAt: timestamp.now()
    }

    await updateDocument({ messages: [...props.document.messages, newMessage] });

    if(!error.value || event.value) {
      sendToParticipants({
        type: NotificationsType.chat_new,
        content: `${user.value.displayName} posted a message in ${event.value?.title}`,
        link: `/events/${event.value?.id}`,
      }, event.value?.participants || [])

      message.value = '';
    }
  }
</script>

<style scoped>
</style>