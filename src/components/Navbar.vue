<template>
  <div class="navbar">
    <nav>
      <img src="@/assets/logo.png" alt="logo">
      <h1><router-link :to="{ name: 'home' }">Home</router-link></h1>
      <div class="links">
        <div v-if="user">
          <router-link :to="{ name: 'user-events', params: { id: user.uid } }">
            {{ user.displayName }} Event
          </router-link>
          <router-link :to="{ name: 'create-event' }">Create Event</router-link>
          <button v-if="!isPending" @click="handleSignout">Sign Out</button>
          <button v-else disabled>Loading</button>
        </div>
        <div v-else>
          <router-link class="btn" :to="{ name: 'signup' }">Sign Up</router-link>
          <router-link class="btn" :to="{ name: 'signin' }">Sign In</router-link>
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
        console.log("successfully sign out !");
        router.push({ name: 'signin' });
    }
}
</script>

<style scoped>
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
</style>