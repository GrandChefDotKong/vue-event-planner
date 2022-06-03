<template>
  <form>
    <textarea 
      placeholder="Type your message and hit enter"
      v-model="message"
      @keypress.enter.prevent="handleSubmit"
    >
    </textarea>
    <div v-if="error" class="error">{{ error }}</div>
  </form>
</template>

<script setup lang="ts">

import { ref } from 'vue';
import { timestamp } from '@/firebase/config';
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import Message from '@/interface/Message';

  const props = defineProps<{ id: string, document: any }>();

  const message = ref('');
  const { user } = getUser();
  const { error, updateDocument } = useDocument('chats', props.id);

  const handleSubmit = async () => {

    if(!user.value?.displayName || !message.value) return;

    const newMessage: Message = {
        message: message.value,
        userName: user.value.displayName,
        userId: user.value.uid,
        createdAt: timestamp.now()
    }

    await updateDocument({ messages: [...props.document.messages, newMessage] });

    if(!error.value) {
      message.value = '';
    }
  }
</script>
<style scoped>
  form {
    margin: 10px;
  }
  textarea {
    width: 100%;
    max-width: 100%;
    margin-bottom: 6px;
    padding: 10px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    font-family: inherit;
    outline: none;
  }
</style>