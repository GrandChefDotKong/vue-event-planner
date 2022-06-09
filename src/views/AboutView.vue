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
      <li>...</li>
      <button @click="handleActivate">Active Notifications</button><br>
      <button @click="handleSend">send Notifications</button>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import useNotifications from '@/composables/useNotifications';
  const { activateNotification, sendNotification } = useNotifications();

  const handleActivate = () => {
    activateNotification();
  }

  const handleSend = () => {
    sendNotification();
  }

</script>
