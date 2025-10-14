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
    <span class="fixed top-4 right-4 bg-blue-100 text-blue-800 px-4 py-2 rounded-full shadow-lg">
    {{ taskStore.nbTasks }}
    </span>
  </div>
  <div class="min-h-screen bg-gray-100 py-8">
    <router-view />
  </div>
</template>

<style scoped></style>
