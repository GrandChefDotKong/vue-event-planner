<template>
  <div v-if="user">
    <div v-for="notif in user.notifications" :key="user.notifications.indexOf(notif)">
      <router-link :to="notif.link">
        {{ notif.content }}
      </router-link> 
      <button @click="() => handleDelete(notif)">
        delete
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import { Notifications, NotificationsType } from '@/interface/Notifications';

const { user } = getUser();

const handleDelete = (notif: Notifications) => {
  
  if(!user.value) return;

  const { updateDocument } = useDocument('users', user.value.uid);

  const currentIndex = user.value.notifications.indexOf(notif);

  const newNotifications: Notifications[] = 
    user.value.notifications.filter(
      (currentValue, index) => index !== currentIndex
    )
  
  updateDocument({ notifications: newNotifications });

  user.value.notifications = newNotifications;
}

</script>

<style scoped>
</style>