<template>
  <form class="flex flex-col items-center mt-4 bg-inherit" 
  @submit.prevent="() => props.handleSubmit(email, password, displayName)">
    <h2 class="text-cyan">{{ submitText }}</h2>
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Display Name" v-model="displayName">
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Email" v-model="email">
    <input class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="password" placeholder="Password" v-model="password">
    <div v-if="error" class="error">{{ error }}</div>
    <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
    text-white border-2 p-2 mt-3">{{ props.submitText }}</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import getUser from '@/composables/auth/getUser';

  const props = defineProps<{
    handleSubmit: Function,
    submitText: string 
  }>();

  const { user } = getUser();

  const email = ref(user.value?.email || '');
  const password = ref('');
  const displayName = ref(user.value?.displayName || '');

  const error = ref<string | null>(null);

</script>