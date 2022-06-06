<template>
  <form class="flex flex-col items-center mt-4 bg-inherit" 
  @submit.prevent="handleSubmit">
    <h2 class="text-cyan">Sign Up</h2>
    <input class="mt-3 px-2 py-1" type="text" placeholder="Display Name" v-model="displayName">
    <input class="mt-3 px-2 py-1" type="text" placeholder="Email" v-model="email">
    <input class="mt-3 px-2 py-1" type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button class="border-solid border-cyan rounded-md bg-cyan 
    text-white border-2 p-2 mt-3" v-if="!isPending">Sign Up</button>
    <button class="border-solid border-cyan rounded-md bg-cyan 
    text-white border-2 p-2 mt-3" v-if="isPending" disabled>Loading</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import useSignup from '@/composables/auth/useSignup';
import { useRouter } from 'vue-router';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';

  const { signup, error, isPending } = useSignup();
  const { sendToAll } = useNotifications();

  const email = ref('');
  const password = ref('');
  const displayName = ref('');
  const router = useRouter();

  const handleSubmit = async () => {
    const res = await signup(email.value, password.value, displayName.value);
    if(!error.value) {

      sendToAll({
        type: NotificationsType.user_create,
        content: `${displayName.value} has join the server`,
      })

      router.push({ name: 'home' });
    }
  }
</script>

<style>

</style>