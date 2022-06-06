<template>
  <div v-if="document" class="bg-white p-4 rounded-3xl h-full flex flex-col justify-between">
    <chat-window :id="props.id" :document="document" />
    <new-chat-form :id="props.id" :document="document"/>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import { getDocument } from "@/composables/getDocument";
import { onUpdated, Ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import NewChatForm from '@/components/chat/NewChatForm.vue';
import ChatWindow from '@/components/chat/ChatWindow.vue';
  
  const props = defineProps<{ id: string }>();

  const { document, error }: { document: Ref<any>, error: Ref } = getDocument("chats", props.id);

  const { user } = getUser();
  const router = useRouter();

  watch(user, () => {
    if(!user.value) {
      router.push({ name: 'home' });
    }
  })
  
</script>

<style>
</style>