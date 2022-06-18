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
import { projectStore } from '@/firebase/config';
import { doc, collection, onSnapshot } from 'firebase/firestore';
  
  const props = defineProps<{ id: string }>();

  const chat = ref<any>(null);
  const error = ref<string | null>(null);

  const docRef = doc(collection(projectStore, 'chats'), props.id); 

  const unsub = onSnapshot(docRef,
    (snap) => {
      if(!snap.data()) {
        error.value = 'That document does not exist :/';
        return;
      }

      chat.value = { ...snap.data(), id: snap.id };
      error.value = null;

    }, (err) => {
      console.log(err.message);
      error.value = 'Coul not fetch data from the server :/';
      chat.value = null;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub())
  });

  const { user } = getUser();
  const router = useRouter();

  watch(user, () => {
    if(!user.value) {
      router.push({ name: 'home' });
    }
  })
  
</script>