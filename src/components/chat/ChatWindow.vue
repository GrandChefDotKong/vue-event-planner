<template>
  <div class="h-80 overflow-y-auto" v-if="user">
    <div v-if="document" ref="scrollAuto">
      <div v-for="mess in formatedMess" :key="formatedMess.indexOf(mess)" 
      class="mt-1 flex flex-col items-start">
        <div class="w-fit self-end" v-if="mess.userId === user.uid">
          <div class="text-primary text-sm ml-1">{{ user.displayName }}</div>
          <div class="text-white text-center shadow-md bg-cyan rounded-2xl px-2 py-1">{{ mess.message }}</div>
          <div class="text-xs text-right mr-1">{{ mess.createdAt }} ago</div>
        </div>
        <div class="w-fit" v-else>
          <div class="text-primary text-sm ml-1">{{ getMessageAuthor(mess.userId)?.displayName }}</div>
          <div class="text-slate-600 text-center bg-white rounded-2xl px-2 py-1">{{ mess.message }}</div>
          <div class="text-xs text-right mr-1">{{ mess.createdAt }} ago</div>
        </div>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated, ref } from '@vue/runtime-core';
import Message from "@/interface/Message";
import { watch } from 'vue';
import getUser from '@/composables/auth/getUser';
import getCollection from '@/composables/getCollection';
import User from '@/interface/User';

  const props = defineProps<{ id: string, document: any }>();
  const { user } = getUser();

  const { docs: users } = getCollection('users');

  const getMessageAuthor = (id: string) => {
    if(users.value) {
      return users.value.find((us) => us.id === id) as User;
    }
  }

  const formatedMess = computed(() => {
    if(props.document) {
      return props.document.messages.map((message: Message) => {
        let time = formatDistanceToNow(message.createdAt.toDate());
        return { ...message, createdAt: time}
      })
    }
  });

  const scrollAuto = ref<HTMLElement | null>(null);

  onUpdated(() => {
    if(scrollAuto.value?.scrollTop) { 
      scrollAuto.value.scrollTop = scrollAuto.value?.scrollHeight;
    }
  })

  watch(props.document, () => {
    console.log('changed')
  })
</script>

<style scoped>
</style>