<template>
  <div class="flex flex-col justify-between h-screen max-h-screen">
    <navbar @toggle-drawer="toggleDrawer" @close-drawer="closeDrawer" />
    <aside
      class="transform top-0 left-0 w-screen max-w-screen rounded-r-md 
      drop-shadow-lg flex flex-row 
      fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex-grow flex bg-white flex-col">
        <h3 class="text-center text-white bg-violet text-lg py-1 mb-4">
          Notifications
        </h3>
        <notifications />
      </div>
      <div @click="closeDrawer" class="w-20 bg-transparent"></div>
    </aside>
    <router-view />
    <div class="h-fit mt-auto mb-1 text-violet text-center text-xs">
      <router-link :to="{ name: 'about' }">copyright@adrien.pauchet</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Notifications from './components/Notifications.vue';
import { onUpdated, ref } from 'vue';

  const isOpen = ref(false);

  const toggleDrawer = () => {
    isOpen.value = !isOpen.value;
  }

  const closeDrawer = () => {
    isOpen.value = false;
  }

</script>
