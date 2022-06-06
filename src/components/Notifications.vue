<template>
  <div v-if="user?.notifications.length" class="mx-2 flex flex-col items-center">
    <div class="pl-2 text-violet flex flex-row justify-between items-center my-2 text-sm border-solid 
    border-2 border-violet rounded-md" v-for="notif in user.notifications" :key="user.notifications.indexOf(notif)">
      <router-link v-if="notif.link" :to="notif.link">
        {{ notif.content }}
      </router-link>
      <div v-else>
        {{ notif.content }}
      </div> 
      <button class="mx-2 px-1 text-white rounded-md shadow-md bg-violet" @click="() => handleDelete(notif)">
          <img class="h-4 w-4" src="@/assets/trash.svg" alt="trash">
        </button>
    </div>
    <button class=" py-1 px-2 w-fit text-white rounded-md shadow-md bg-violet" @click="handleDeleteAll">
      Delete All
    </button>
  </div>
  <div class="text-center text-lg" v-else>
    No new notifications
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import { Notifications, NotificationsType } from '@/interface/Notifications';

const { user } = getUser();

const handleDelete = async (notif: Notifications) => {
  
  if(!user.value) return;

  const { updateDocument } = useDocument('users', user.value.uid);

  const currentIndex = user.value.notifications.indexOf(notif);

  const newNotifications: Notifications[] = 
    user.value.notifications.filter(
      (currentValue, index) => index !== currentIndex
    )
  
  await updateDocument({ notifications: newNotifications });

  user.value.notifications = newNotifications;
}

const handleDeleteAll = async () => {
  
  if(!user.value) return;

  const { updateDocument } = useDocument('users', user.value.uid);
  
  await updateDocument({ notifications: [] });

  user.value.notifications = [];
}

</script>

<style scoped>
</style>