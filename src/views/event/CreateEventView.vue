<template>
  <event-form  formTitle="Create" :handleSubmit="handleSubmit" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
//import useStorage from '@/composables/useStorage';
import { projectStore, timestamp } from '@/firebase/config';
import useCollection from '@/composables/useCollection';
import getUser from '@/composables/auth/getUser';
import EventForm from '@/components/forms/EventForm.vue';
import useNotifications from '@/composables/useNotifications';
import { useRouter } from 'vue-router';
import { doc, Timestamp } from 'firebase/firestore';
import { Notifications, NotificationsType } from '@/interface/Notifications';

  const router = useRouter();

  //const { uploadImage, url, filePath } = useStorage();
  const { error, addToCollection: addToEvent } = useCollection('events');
  const { addToCollection: addToChats } = useCollection('chats');
  const { sendToAll } = useNotifications();
  const { user } = getUser();
  const isPending = ref(false);

//  const types = ['image/png', 'image/jpeg'];

  const handleSubmit = async ( 
    title: string, 
    description: string,
    location: string,
    dates: Timestamp,

  ) => {
  /*
    if(!file.value) {
        fileError.value = "No file selected !!"
        return;
    }
  */
    if(!user.value?.displayName) return;

    isPending.value = true;
  /*
    await uploadImage(file.value);
  */  
    const res: any =  await addToEvent({
      title: title,
      description: description,
      //imageUrl: url.value,
      //filePath: filePath.value,
      location: location,
      participants: [doc(projectStore, 'users', user.value.uid)],
      creatorId: user.value.uid,
      creatorName: user.value.displayName,
      dates: dates,
    });

    isPending.value = false;
    if(!error.value) {
      
      sendToAll({
        type: NotificationsType.event_create,
        content: `New Event : ${title} has been created`,
        link: `/events/${res.id}`
      });

      addToChats({
        messages: [{
          createdAt: timestamp.now(),
          message: 'Welcome to the chat',
          userId: user.value.uid,
          userName: user.value.displayName,
        }],
      }, res.id)
      
      router.push({ name: 'home'});

    } else {
      console.log(error.value);
    }
  }
/*
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
