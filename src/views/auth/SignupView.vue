<template>
    <form @submit.prevent="handleSubmit">
        <h3>Sign Up</h3>
        <input type="text" placeholder="Display Name" v-model="displayName">
        <input type="text" placeholder="Email" v-model="email">
        <input type="password" placeholder="password" v-model="password">
        <div v-if="error" class="error">{{ error }}</div>
        <button v-if="!isPending">Sign Up</button>
        <button v-if="isPending" disabled>Loading</button>
    </form>
</template>

<script setup lang="ts">
import { ref } from '@vue/reactivity';
import useSignup from '@/composables/auth/useSignup';
import { useRouter } from 'vue-router';
        const { signup, error, isPending } = useSignup();
        const email = ref('');
        const password = ref('');
        const displayName = ref('');
        const router = useRouter();

        const handleSubmit = async () => {
            const res = await signup(email.value, password.value, displayName.value);
            if(!error.value) {
              router.push({ name: 'home' });
            }
        }
</script>

<style>

</style>