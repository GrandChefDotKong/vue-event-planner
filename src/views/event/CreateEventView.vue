<template>
  <form @submit.prevent="handleSubmit">
      <h4>Create New Event</h4>
      <input type="text" placeholder="Event Title" v-model="title" required>
      <textarea placeholder="Event Description" v-model="description" required></textarea>
      <input type="text" placeholder="Event Location" v-model="location" required>
      <v-date-picker v-model="dates" mode="dateTime" timezone="" /><br>
    <!--
      <label>Upload event image</label>
      <input type="file" @change="handleChange" required>
      <div v-if="fileError" class="error">{{ fileError }}</div>
    -->
      <button v-if="!isPending">Create</button>
      <button v-else disabled>Loading</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import useStorage from '@/composables/useStorage';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/auth/getUser';
import { useRouter } from 'vue-router';

    const title = ref('');
    const description = ref('');
    const file = ref(null);
    const fileError = ref<string | null>(null);
    const dates = ref<Date>(new Date());
    const location = ref<string>('');

    const router = useRouter();

    //const { uploadImage, url, filePath } = useStorage();
    const { error, addToCollection: addToEvent } = useCollection('events');
    const { addToCollection: addToChats } = useCollection('chats');
    const { user } = getUser();
    const isPending = ref(false);

    const types = ['image/png', 'image/jpeg'];

    const handleSubmit = async () => {
    /*
        if(!file.value) {
            fileError.value = "No file selected !!"
            return;
        }
    */
        if(!user.value) return;
        if(!user.value.displayName) return;

        isPending.value = true;
    /*
        await uploadImage(file.value);
    */  
        const res: any =  await addToEvent({
            id: '',
            title: title.value,
            description: description.value,
            //imageUrl: url.value,
            //filePath: filePath.value,
            location: location.value,
            participants: [user.value.displayName],
            creatorId: user.value.uid,
            creatorName: user.value.displayName,
            dates: dates.value,
        });

        isPending.value = false;
        if(!error.value) {
          console.log(`event created !!`);

          console.log(res)

          router.push({ name: 'home'});

        } else {
            console.log(error.value);
        }
    }

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