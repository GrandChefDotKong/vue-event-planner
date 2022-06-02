<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign In</h3>
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign In</button>
        <button v-if="isPending" disabled>Loading</button>
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