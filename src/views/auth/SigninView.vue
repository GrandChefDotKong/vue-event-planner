<template>
    <form class="flex flex-col items-center mt-4 bg-inherit" 
    @submit.prevent="handleSubmit">
        <h2 class="text-cyan">Sign In Form</h2>
        <input class="mt-3 px-2 py-1" type="text" placeholder="Email" v-model="email">
        <input class="mt-3 px-2 py-1" type="password" placeholder="Password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button class="border-solid border-cyan rounded-md bg-cyan text-white 
        border-2 p-2 mt-4" v-if="!isPending">Sign In</button>
        <button class="border-solid border-cyan rounded-md bg-cyan text-white 
        border-2 p-2 mt-4" v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import useSignin from '@/composables/auth/useSignin';
import { useRouter } from 'vue-router';

const { signin, error, isPending } = useSignin();
const email = ref('');
const password = ref('');

const router = useRouter();

const handleSubmit = async () => {
    const res = await signin(email.value, password.value);
    if(!error.value) {
      router.push({ name: 'home' });
    }
}
</script>

<style>

</style>