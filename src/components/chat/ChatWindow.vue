<template>
  <div class="chat-window">
      <div v-if="document" class="messages" ref="messages">
        <div v-for="doc in formatedDoc" class="single"> <!--:key=""-->
          <span class="created-at">{{ doc.createdAt }}</span>
          <span class="name">{{ doc.userName }}</span>
          <span class="message">{{ doc.message }}</span>
        </div>
      </div>
  </div>  
</template>

<script setup lang="ts">
import { formatDistanceToNow } from 'date-fns';
import { computed, onUpdated, ref } from '@vue/runtime-core';
import Message from "@/interface/Message";

  const props = defineProps<{ id: string, document: any }>();


  const formatedDoc = computed(() => {
      if(props.document?.messages ) {
        return props.document.messages as Message[];
      }
  });

  const messages = ref<HTMLElement | null>(null);

  onUpdated(() => {
    if(messages.value?.scrollTop) {
      messages.value.scrollTop = messages.value.scrollHeight;
    }
  });
        
</script>

<style scoped>
  .chat-window {
    background: #fafafa;
    padding: 30px 20px;
  }
  .single {
    margin: 18px 0;
  }
  .created-at {
    display: block;
    color: #999;
    font-size: 12px;
    margin-bottom: 4px;
  }
  .name {
    font-weight: bold;
    margin-right: 6px;
  }
  .messages {
    max-height: 400px;
    overflow: auto;
  }
</style>