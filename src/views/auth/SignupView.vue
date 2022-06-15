<template>
  <form class="flex flex-col items-center mt-4 bg-inherit" 
  @submit.prevent="handleSubmit">
    <h2 class="text-cyan">Sign Up</h2>
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Display Name" v-model="displayName">
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Email" v-model="email">
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="password" placeholder="Password" v-model="password">
    <label>Upload profile picture</label>
    <input type="file" @change="handleChange" required>
    <div v-if="fileError" class="error">{{ fileError }}</div>
    <div v-if="error" class="error">{{ error }}</div>
    <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
    text-white border-2 p-2 mt-3" v-if="!isPending">Sign Up</button>
    <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
    text-white border-2 p-2 mt-3" v-if="isPending" disabled>Loading</button>
  </form>
  <button @click="connectWithGoogle" 
  class="border-solid w-fit text-cyan shadow-md border-cyan rounded-md 
  bg-white self-center border-2 p-2 mt-5">
    Sign with
    <img class="w-6 h-6 inline" src="@/assets/logo-google.svg" alt="google">
  </button>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import useSignup from '@/composables/auth/useSignup';
import { useRouter } from 'vue-router';
import useNotifications from '@/composables/useNotifications';
import { NotificationsType } from '@/interface/Notifications';
import useSignWithGoogle from '@/composables/auth/useSignWithGoogle';

  const { signup, error, isPending } = useSignup();
  const { sendToAll } = useNotifications();
  const { signWithGoogle } = useSignWithGoogle();

  const email = ref('');
  const password = ref('');
  const displayName = ref('');
  const router = useRouter();

  const file = ref(null);
  const fileError = ref<string | null>(null);

  const types = ['image/png', 'image/jpeg'];


  const connectWithGoogle = async () => {
    await signWithGoogle();
    router.push({ name: 'home' });
  }

  const handleChange = (e: any) => {
    fileError.value = null;
    const selected = e.target.files[0];
    if(selected && types.includes(selected.type)) {
        file.value = selected;
    } else {
        file.value = null;
        fileError.value = "Please select an image file (png or jpeg)."
    }
  }

  const handleSubmit = async () => {
    if(!file.value) {
      fileError.value = "No file selected !!"
      return;
    }
    
    const res = await signup(email.value, password.value, displayName.value, file.value);

    if(!error.value) {

      sendToAll({
        type: NotificationsType.user_create,
        content: `${displayName.value} has join the server`,
      });

      router.push({ name: 'home' });
    }
  }
</script>
