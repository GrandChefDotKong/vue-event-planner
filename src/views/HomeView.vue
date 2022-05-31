<template>
  <Calendar />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Calendar from '@/components/Calendar.vue';


const date = ref(new Date());
</script>
