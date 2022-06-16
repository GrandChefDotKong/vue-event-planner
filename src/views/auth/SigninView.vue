<template>
  <form class="flex flex-col items-center mt-4 bg-inherit" 
  @submit.prevent="handleSubmit">
    <h2 class="text-cyan">Sign In Form</h2>
    <input class="mt-3 px-2 shadow rounded-md py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Email" v-model="email">
    <input class="mt-3 px-2 shadow rounded-md py-1 focus:outline-none focus:shadow-md" type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button class="border-solid shadow-md border-cyan rounded-md bg-cyan text-white 
    border-2 p-2 mt-4" v-if="!isPending">Sign In</button>
    <button class="border-solid shadow-md border-cyan rounded-md bg-cyan text-white 
    border-2 p-2 mt-4" v-if="isPending" disabled>Loading</button>
  </form>
  <p class="text-cyan text-center mt-4">or</p>
  <button @click="connectWithGoogle" class="border-solid w-fit text-cyan 
  shadow-md border-cyan rounded-md bg-white self-center border-2 p-2 mt-2">
    Sign with
    <img class="w-6 h-6 inline" src="@/assets/logo-google.svg" alt="google">
  </button>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import useSignin from '@/composables/auth/useSignin';
import { useRouter } from 'vue-router';
import useSignWithGoogle from '@/composables/auth/useSignWithGoogle';

  const { signin, error, isPending } = useSignin();
  const { signWithGoogle } = useSignWithGoogle()

  const email = ref('');
  const password = ref('');

  const router = useRouter();

  const connectWithGoogle = async () => {
    await signWithGoogle();

    router.push({ name: 'home' });
  }

  const handleSubmit = async () => {
    const res = await signin(email.value, password.value);
    if(!error.value) {
      router.push({ name: 'home' });
    }
  }
</script>

<style>

</style>