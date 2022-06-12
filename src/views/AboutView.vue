<template>
  <div class="flex flex-col items-center mt-5">
    <h1 class="w-fit text-violet text-lg mb-2">About</h1>
    <p>I will publish here all the updates.</p>
    <ul class="text-left mt-4 w-fit list-disc">
      <h3 class="text-center mb-2 underline">To do : </h3>
      <li>Add google map</li>
      <li>Different colors for event</li>
      <li>Animations & Transitions</li>
      <li>Modify name</li>
      <li>Better notifications</li>
      <li>...</li></ul>
      <button class="boder boder-cyan p-1" @click="addNotif">Add notif</button>
  </div>
</template>

<script setup lang="ts">
import { Notifications, NotificationsType } from '@/interface/Notifications';
import useNotifications from '@/composables/useNotifications';
import { projectStore } from '@/firebase/config';
import { doc } from '@firebase/firestore';
import getUser from '@/composables/auth/getUser';

  const { sendToParticipants } = useNotifications();
  const { user } = getUser()

  const addNotif = () => {
    if(!user.value?.uid) return;

    sendToParticipants({
        type: NotificationsType.event_create,
        content: `This is a test, don't worry`,
        link: `/events/trJNLbUy9E3ebNguBeOC`
      }, [doc(projectStore, 'users', user.value.uid),]
      );
  }



</script>
