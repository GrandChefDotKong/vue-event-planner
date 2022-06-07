<template>
  <div class="w-screen 
  h-fit m-0 py-1 rounded-b-lg bg-cyan text-white">
    <nav class="flex flex-row justify-around py-2">
      <router-link :to="{ name: 'home' }" class="basis-1/4">
        <img class="h-9 w-9 ml-4" src="@/assets/calendar.svg" alt="logo">
      </router-link>
      <div class="links basis-2/3 text-secondary">
        <div class="flex h-full flex-row items-center justify-around" v-if="user">
          <router-link class="" :to="{ name: 'user-events', params: { id: user.uid } }">
            <img class="h-7 w-7" src="@/assets/user.svg" alt="user">
          </router-link>
          <router-link :to="{ name: 'create-event' }">
            <img class="h-7 w-7" src="@/assets/create.svg" alt="create">
          </router-link>
          <button v-if="!isPending" @click="handleSignout">
            <img class="h-7 w-7" src="@/assets/logout.svg" alt="logout">
          </button>
          <button v-else disabled>Loading</button>

          <button @click="handleClick"><img class="h-7 w-7" src="@/assets/bell.svg" alt=""></button>

        </div>
        <div class="flex h-full flex-row items-center justify-around" v-else>
          <router-link class="btn" :to="{ name: 'signin' }">
            <img class="h-7 w-7" src="@/assets/login.svg" alt="Login">
          </router-link>
          <router-link class="btn" :to="{ name: 'signup' }">
            <img class="h-7 w-7" src="@/assets/signup.svg" alt="Sign up">
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

  const emit = defineEmits(['toggleDrawer', 'closeDrawer']);
  const handleClick = () => {
    emit('toggleDrawer');
  }


  const handleSignout = async () => {
      await signout();
      if(!error.value) {
          user.value = null;
          emit('closeDrawer');
          router.push({ name: 'signin' });
      }
  }
</script>

<style scoped>
</style>