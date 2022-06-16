<template>
  <div v-if="user" class="flex flex-col items-center flex-grow justify-start my-2">
    <form class="flex flex-col items-center mt-4 bg-inherit" 
    @submit.prevent="handleSubmit">
      <h2 class="text-cyan">Update Profile</h2>
      <label class="self-start text-xs" for="displayName">Name :</label>
      <input name="displayName" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Display Name" v-model="displayName">
      <div v-if="provider !== 'google.com'">
        <label class="self-start text-xs" for="email">Email :</label>
        <input name="email" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="text" placeholder="Email" v-model="email">
        <label class="self-start text-xs" for="password">Password :</label>
        <input name="password" class="mt-3 shadow rounded-md px-2 py-1 focus:outline-none focus:shadow-md" type="password" placeholder="Password" v-model="password">
        <label class="cursor-pointer bg-cyan rounded-md shadow-md p-1 mb-2">
          <img class="w-7 h-7 mx-auto" src="@/assets/photo.svg" alt="picture">
          <div class="text-white w-fit mt-1 mx-auto">Select a picture</div>
          <input class="hidden" type="file" @change="handleChange" required>
        </label>
        <img v-if="file" id="avatar" class="w-auto h-28 mx-auto" :src="file" :alt="file">
      </div>
      <div v-if="error" class="error">{{ error }}</div>
      <button class="border-solid shadow-md border-cyan rounded-md bg-cyan 
      text-white border-2 p-2 mt-3">Update</button>
    </form> 
  </div>
</template>

<script setup lang="ts">
import getUser from '@/composables/auth/getUser';
import useUser from '@/composables/auth/useUser';
import { ref } from '@vue/reactivity';
import useStorage from  '@/composables/useStorage';
import { useRouter } from 'vue-router';

  const { user } = getUser();
  const { updateUser, getProviderId } = useUser();
  const router = useRouter();

  const email = ref(user.value?.email || '');
  const password = ref('');
  const displayName = ref(user.value?.displayName || '');

  const { uploadImage, url, filePath } = useStorage();

  const file = ref(user.value?.photoURL || null);
  const fileError = ref<string | null>(null);

  const types = ['image/png', 'image/jpeg'];

  const error = ref<string | null>(null);

  const provider = getProviderId();

  const handleChange = (e: any) => {
    fileError.value = null;
    const selected = e.target.files[0];
    if(selected && types.includes(selected.type)) {
      file.value = selected;

      const oFReader = new FileReader();
      oFReader.readAsDataURL(selected);
      oFReader.onload = function (oFREvent) {
        const avatarEl = document.getElementById("avatar") as HTMLImageElement;
        avatarEl.src = oFREvent.target?.result ? oFREvent.target.result.toString() : '';
      };

    } else {
      file.value = null;
      fileError.value = "Please select an image file (png or jpeg)."
    }
  }

  const handleSubmit = async () => {
    
    if(file.value && user.value) {
      await uploadImage(file.value, user.value.uid);
      if(!url.value ||  !filePath.value) return;
    }

    await updateUser(email.value, password.value, displayName.value, 
    url.value, filePath.value);

    router.push({ name: 'user-events' })

  }
</script>