<template>
  <div v-if="user?.notifications.length" class="mx-2 flex flex-col items-center 
  overflow-y-auto">
    <button class=" py-1 px-2 text-white rounded-md shadow-md bg-violet" @click="handleDeleteAll">
      Delete All
    </button>
    <div class="p-2 text-violet w-full flex flex-row justify-between items-center my-2 text-sm border-solid 
    border-2 border-violet rounded-md" v-for="notif in user.notifications" :key="user.notifications.indexOf(notif)">
      <router-link v-if="notif.link" :to="notif.link">
        {{ notif.content }}
      </router-link>
      <div v-else>
        {{ notif.content }}
      </div> 
      <button class="mx-2 p-1 text-white rounded-md shadow-md bg-violet" @click="() => handleDelete(notif)">
          <img class="h-4 w-4" src="@/assets/trash.svg" alt="trash">
        </button>
    </div>
  </div>
  <div class="text-center text-lg" v-else>
    No new notifications
  </div>
  <!--<button @click="handleActivate">Active Notifications</button>-->
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';
import { Notifications, NotificationsType } from '@/interface/Notifications';
import useNotifications from '@/composables/useNotifications';

  const { user } = getUser();
  const { activateNotification } = useNotifications();

  const handleActivate = () => {
    activateNotification();
  }


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