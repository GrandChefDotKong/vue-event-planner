<template>
  <div v-if="user" class="flex flex-col items-center flex-grow justify-start my-2">
    <form class="flex flex-col items-center mt-4 bg-inherit" 
    @submit.prevent="() => handleSubmit(email, password, displayName)">
      <h2 class="text-cyan">Update Profile</h2>
      <label class="self-start text-xs" for="displayName">Name :</label>
      <input name="displayName" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Display Name" v-model="displayName">
      <div v-if="provider !== 'google.com'">
        <label class="self-start text-xs" for="email">Email :</label>
        <input name="email" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Email" v-model="email">
        <label class="self-start text-xs" for="password">Password :</label>
        <input name="password" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="password" placeholder="Password" v-model="password">
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
      text-white border-2 p-2 mt-3">Update</button>
    </form> 
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import useUser from '@/composables/auth/useUser';
import { ref } from '@vue/reactivity';


  const { user } = getUser();
  const { updateUser, getProviderId } = useUser();

  const email = ref(user.value?.email || '');
  const password = ref('');
  const displayName = ref(user.value?.displayName || '');

  const error = ref<string | null>(null);

  const provider = getProviderId();

  const handleSubmit = async (email: string, password: string, displayName: string) => {
  
    await updateUser(email, password, displayName)
  }
</script>