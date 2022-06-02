<template>
  <div v-if="docs.length" class="event">
    <div v-for="event in docs">
      <h3>{{ event.title }}</h3>
    </div>
  </div>
  <div v-if="error">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/auth/getUser';

  const { user } = getUser();

  const props = defineProps<{ id: string }>();
  const { docs, error } = getCollection('events', 
    ['creatorId', '==', props.id]);

</script>

<style scoped>
</style>