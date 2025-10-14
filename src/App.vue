<script setup>
import { useTaskStore } from '@/stores/useTaskStore'
import { onMounted } from 'vue';
const taskStore = useTaskStore()

onMounted(() => {
  taskStore.getAllTasks()
})
</script>

<template>
  <div>
    {{ taskStore.nbTasks }}
  </div>
  <div class="min-h-screen bg-gray-100 py-8">
    <router-view />
  </div>
</template>

<style scoped></style>
