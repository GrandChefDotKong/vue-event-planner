<template>
  <div class="w-screen h-fit m-0 py-1 rounded-b-lg bg-cyan text-white">
    <nav class="w-full flex flex-row justify-between py-2 text-xs">
      <button v-if="user" id="notice" class="notif-btn ml-6" @click="handleClick">
        <img class="h-8 w-8 mx-auto" src="@/assets/bell.svg" alt="notifications">Notice
        <span v-if="user.notifications.length"
        class="notif bg-red-500"
        >{{ user.notifications.length }}</span>
      </button>
      <router-link v-if="user" :to="{ name: 'home' }" class="w-fit">
        <img class="h-8 w-8 mx-auto" src="@/assets/calendar.svg" alt="logo">Home
      </router-link>
      <div class="mr-6 w-fit">
        <div v-if="user">
          <img class="h-8 w-8" @click="toggleMenu" src="@/assets/hamburger.svg" alt="Menu">Menu
        </div>
        <div class="flex h-full w-screen flex-row justify-around items-center" v-else>
          <router-link class="mr-2" :to="{ name: 'signin' }">
            <img class="h-8 w-8 mx-auto" src="@/assets/login.svg" alt="Login">Sign In
          </router-link>
          <router-link class="ml-2" :to="{ name: 'signup' }">
            <img class="h-8 w-8 mx-auto" src="@/assets/signup.svg" alt="Sign up">Sign Up
          </router-link>
        </div>
      </div>
    </nav>
  </div>
  <aside class="transform top-0 left-0 w-screen max-w-screen rounded-r-md drop-shadow-lg 
  flex flex-row fixed h-screen overflow-auto ease-in-out transition-all duration-300 z-30"
  :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
    <div id="navbar" v-if="user" class="flex-grow flex bg-cyan flex-col justify-between pb-28 items-center text-white">
      <h3 class="text-2xl w-full text-center bg-white text-cyan">Menu</h3>
      <router-link class="" :to="{ name: 'user-profile' }">
        <img class="h-8 w-8 rounded-xl mx-auto" src="@/assets/user.svg" alt="user">My Page
      </router-link>
      <router-link class="" :to="{ name: 'group', params: { id: user.id } }">
        <img class="h-8 w-8 mx-auto" src="@/assets/group.svg" alt="user">Group Info
      </router-link>
      <router-link :to="{ name: 'create-event' }">
        <img class="h-8 w-8 mx-auto" src="@/assets/create.svg" alt="create">Create An Event
      </router-link>
      <button v-if="!isPending" @click="handleSignout">
        <img class="h-8 w-8 mx-auto" src="@/assets/logout.svg" alt="logout">Sign Out
      </button>
      <button v-else disabled>Loading</button>
    </div>
    <div @click="closeMenu" class="w-20 bg-transparent"></div>
  </aside>
</template>

<script setup lang="ts">
import useSignout from "@/composables/auth/useSignout";
import getUser from "@/composables/auth/getUser";
import { useRouter } from "vue-router";
import { watch, ref } from "vue";

  const { error, signout, isPending } = useSignout();
  const { user } = getUser();
  const router = useRouter();

  const isOpen = ref(false);

  const toggleMenu = () => {
    isOpen.value = !isOpen.value;
  }

  const closeMenu = () => {
    isOpen.value = false;
  }

  const emit = defineEmits(['toggleDrawer', 'closeDrawer']);
  const handleClick = () => {
    emit('toggleDrawer');
  }

  watch(router.currentRoute,() => isOpen.value = false)

  const handleSignout = async () => {
      await signout();
      if(!error.value) {
          user.value = null;
          router.push({ name: 'signin' });
      }
  }
</script>

<style scoped>
.notif-btn {
  position: relative;
}
.notif {
  position: absolute;
  top: 0;
  right: -2px;
  border-radius: 50%;
  padding: 1px 3px;
}
</style>


