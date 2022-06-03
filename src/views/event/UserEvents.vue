<template>
  <h3>My Event :</h3>
  <div v-if="docs.length" class="events">
    <div v-for="event in docs" class="event">
      <h3>{{ event.title }}</h3>
      <router-link :to="{ name: 'update-event', params: { id: event.id } }">
        Update
      </router-link>
      <button @click="() => handleDelete(event.id)">Delete</button>
    </div>
  </div>
  <div v-if="error">
    {{ error }}
  </div>
</template>

<script setup lang="ts">
import getCollection from '@/composables/getCollection';
import getUser from '@/composables/auth/getUser';
import useDocument from '@/composables/useDocument';

  const props = defineProps<{ id: string }>();
  const { user } = getUser();

  const { docs, error } = getCollection('events', 
    ['creatorId', '==', props.id]);

  const handleDelete = async (id: string) => {
    const { deleteDocument } = useDocument('events', id);

    await deleteDocument();
  }

</script>

<style scoped>
.event {
  display: flex;
  flex-direction: row;
 }
</style>