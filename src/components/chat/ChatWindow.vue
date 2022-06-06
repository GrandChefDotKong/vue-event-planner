<template>
  <div class="">
    <div v-if="document" class="messages" ref="scrollAuto">
      <div v-for="mess in formatedMess" :key="formatedMess.indexOf(mess)" 
      class="mt-1 w-fit">
        <div class="text-primary text-sm ml-1">{{ mess.userName }}</div>
        <div class="text-white text-center shadow-md bg-cyan rounded-2xl px-2 py-1">{{ mess.message }}</div>
        <div class="text-xs text-right mr-1">{{ mess.createdAt }} ago</div>
      </div>
    </div>
  </div>  
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated, ref } from '@vue/runtime-core';
import Message from "@/interface/Message";
import { watch } from 'vue';

  const props = defineProps<{ id: string, document: any }>();

  const formatedMess = computed(() => {
    if(document) {
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