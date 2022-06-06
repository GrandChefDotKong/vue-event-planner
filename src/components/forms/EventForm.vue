<template>
  <form class="flex flex-col items-center mt-4 bg-inherit" 
  @submit.prevent="handleClick">
      <h2 class="text-cyan">{{ props.formTitle }} Event</h2>
      <input class="mt-3 px-2 py-1 rounded-md focus:outline-none focus:shadow-md" type="text" 
        placeholder="Event Title" v-model="title" required autofocus>
      <textarea class="mt-3 h-20 px-2 py-1 rounded-md focus:outline-none focus:shadow-md" 
        cols="22" placeholder="Event Description" v-model="description" required></textarea>
      <input class="mt-3 px-2 py-1 rounded-md focus:outline-none focus:shadow-md" type="text" 
        placeholder="Event Location" v-model="location" required>
      <v-date-picker color="teal" class="mt-4 px-2 py-1" v-model="dates" mode="dateTime" timezone="" /><br>
    <!--
      <label>Upload event image</label>
      <input type="file" @change="handleChange" required>
      <div v-if="fileError" class="error">{{ fileError }}</div>
    -->
      <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
    text-white border-2 p-2" v-if="!isPending">{{ props.formTitle }}</button>
      <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
    text-white border-2 p-2" v-else disabled>Loading</button>
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