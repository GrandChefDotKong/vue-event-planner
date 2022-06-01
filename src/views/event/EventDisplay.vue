<template>
  <div v-if="document" class="event">
      <h3>{{ document?.title }}</h3>
      <p>{{ document.description }}</p>
      <p>Location : {{ document.location }}</p>
  </div>
</template>

<script setup lang="ts">
import getDocument from '@/composables/getDocument';

  const props = defineProps<{ id: string }>();
  const { document, error } = getDocument('events', props.id);

</script>

<style scoped>
</style>