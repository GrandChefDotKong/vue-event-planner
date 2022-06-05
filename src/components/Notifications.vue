<template>
  <div class="" v-if="user">
    <div class="pl-2 text-violet flex flex-row justify-between items-center my-1 text-sm border-solid 
    border-2 border-violet rounded-md" v-for="notif in user.notifications" :key="user.notifications.indexOf(notif)">
      <router-link v-if="notif.link" :to="notif.link">
        {{ notif.content }}
      </router-link>
      <div v-else>
        {{ notif.content }}
      </div> 
      <button class="bg-violet text-white p-1" @click="() => handleDelete(notif)">
        x
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