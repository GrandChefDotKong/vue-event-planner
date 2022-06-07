<template>
  <div class="flex flex-col justify-start max-h-screen">
    <navbar @toggle-drawer="toggleDrawer" @close-drawer="closeDrawer" />
    <aside
      class="transform top-0 left-0 w-64 bg-primary_bg rounded-r-md drop-shadow-lg 
      fixed h-full overflow-auto ease-in-out transition-all duration-300 z-30"
      :class="isOpen ? 'translate-x-0' : '-translate-x-full'">
      <h3 class="text-center text-white bg-violet text-lg py-1 mb-4">Notifications</h3>
      <notifications />
    </aside>
    <router-view />
    <div class="mt-auto mb-2 h-full text-violet text-center text-xs">
      <router-link :to="{ name: 'about' }">copyrigth@adrien.pauchet</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import Navbar from '@/components/Navbar.vue';
import Notifications from './components/Notifications.vue';
import { ref, watch } from 'vue';

  const isOpen = ref(false);

  const toggleDrawer = () => {
    isOpen.value = !isOpen.value;
  }

  const closeDrawer = () => {
    isOpen.value = false;
  }

</script>
