<template>
  <form @submit.prevent="handleClick">
      <h4>{{ props.formTitle }} Event</h4>
      <input type="text" placeholder="Event Title" v-model="title" required>
      <textarea placeholder="Event Description" v-model="description" required></textarea>
      <input type="text" placeholder="Event Location" v-model="location" required>
      <v-date-picker v-model="dates" mode="dateTime" timezone="" /><br>
    <!--
      <label>Upload event image</label>
      <input type="file" @change="handleChange" required>
      <div v-if="fileError" class="error">{{ fileError }}</div>
    -->
      <button v-if="!isPending">{{ props.formTitle }}</button>
      <button v-else disabled>Loading</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Event from '@/interface/Event';
import { Timestamp } from 'firebase/firestore';
import { timestamp } from '@/firebase/config';
//import useStorage from '@/composables/useStorage';

    const props = defineProps<{
      formTitle: string,
      event?: Event,
      handleSubmit: Function
    }>();

    const title = ref(props.event ? props.event.title : '' );
    const description = ref(props.event ? props.event.description : '' );
//    const file = ref(null);
//    const fileError = ref<string | null>(null);
    const dates = ref<Date>(props.event ? props.event.dates.toDate() : timestamp.now().toDate());
    const location = ref<string>(props.event ? props.event.location : '' );
    const isPending = ref(false);

    const handleClick = () => {

      props.handleSubmit(
        title.value,
        description.value,
        //imageUrl: url.value,
        //filePath: filePath.value,
        location.value,
        dates.value,
      );
    }
/*
    const types = ['image/png', 'image/jpeg'];
    const handleChange = (e: any) => {
        fileError.value = null;
        const selected = e.target.files[0];
        if(selected && types.includes(selected.type)) {
            file.value = selected;
        } else {
            file.value = null;
            fileError.value = "Please select an image file (png or jpeg)."
        }
    }
*/
</script>

<style>
  form {
    background: white;
  }
  input[type="file"] {
    border: 0;
    padding: 0;
  }
  label {
    font-size: 12px;
    display: block;
    margin-top: 30px;
  }
  button {
    margin-top: 20px;
  }
</style>