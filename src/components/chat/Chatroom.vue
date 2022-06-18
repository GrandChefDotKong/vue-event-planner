<template>
  <div v-if="chat" class="bg-primary_bg p-4 rounded-3xl
  flex flex-col justify-start">
    <chat-window :id="props.id" :document="chat" />
    <new-chat-form :id="props.id" :document="chat"/>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import { ref, Ref, watch, watchEffect } from 'vue';
import { useRouter } from 'vue-router';
import NewChatForm from '@/components/chat/NewChatForm.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
import { getDocument } from '@/composables/getDocument';

  const props = defineProps<{ id: string }>();

  const { document: chat } = getDocument('chats', props.id)

  const { user } = getUser();
  const router = useRouter();

  watch(user, () => {
    if(!user.value) {
      router.push({ name: 'home' });
    }
  })
  
</script>