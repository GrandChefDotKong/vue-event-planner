<template>
  <div class="w-screen 
  h-full m-0 rounded-b-lg bg-cyan text-white">
    <nav class="flex flex-row justify-around py-2">
      <router-link :to="{ name: 'home' }" class="basis-1/4">
        <img class="h-8 w-8 ml-4" src="@/assets/calendar.svg" alt="logo">
      </router-link>
      <div class="links basis-2/3 text-secondary">
        <div class="flex h-full flex-row items-center justify-around" v-if="user">
          <router-link class="" :to="{ name: 'user-events', params: { id: user.uid } }">
            <img class="h-6 w-6" src="@/assets/user.svg" alt="user">
          </router-link>
          <router-link :to="{ name: 'create-event' }">
            <img class="h-6 w-6" src="@/assets/create.svg" alt="create">
          </router-link>
          <button v-if="!isPending" @click="handleSignout">
            <img class="h-6 w-6" src="@/assets/logout.svg" alt="logout">
          </button>
          <button v-else disabled>Loading</button>
          <div><img class="h-6 w-6" src="@/assets/bell.svg" alt=""></div>

        </div>
        <div class="flex h-full flex-row items-center justify-around" v-else>
          <router-link class="btn" :to="{ name: 'signin' }">
            <img class="h-6 w-6" src="@/assets/login.svg" alt="Login">
          </router-link>
          <router-link class="btn" :to="{ name: 'signup' }">
            <img class="h-6 w-6" src="@/assets/signup.svg" alt="Sign up">
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup lang="ts">
import useSignout from "@/composables/auth/useSignout";
import getUser from "@/composables/auth/getUser";
import { useRouter } from "vue-router";
const { error, signout, isPending } = useSignout();
const { user } = getUser();
const router = useRouter();

const handleSignout = async () => {
    await signout();
    if(!error.value) {
        user.value = null;
        router.push({ name: 'signin' });
    }
}
</script>

<style scoped> /*
  .navbar {
    padding: 16px 10px;
    margin-bottom: 60px;
    background: white;
  }
  nav {
    display: flex;
    align-items: center;
    max-width: 1200px;
    margin: 0 auto;
  }
  nav img {
    max-height: 60px;
  }
  nav h1 {
    margin-left: 20px;
  }
  nav .links {
    margin-left: auto;
  }
  nav .links a, button {
    margin-left: 16px;
    font-size: 14px;
  }
  */
</style>