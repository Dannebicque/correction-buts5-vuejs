<template>
  <div class="flex items-center justify-between p-4 bg-white rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow">
    <div class="flex items-center space-x-3 flex-1 cursor-pointer" @click="viewDetails">
      <input 
        type="checkbox" 
        :checked="task.completed" 
        @change="toggleComplete"
        @click.stop
        class="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 focus:ring-2"
      >
      <span 
        :class="{ 
          'line-through text-gray-500': task.completed, 
          'text-gray-800': !task.completed 
        }"
        class="text-lg font-medium"
      >
      <router-link :to="`/task/${task.id}`">
        {{ task.text }}
        </router-link>
      </span>
    </div>
    
    <div class="flex items-center space-x-2">
      <span 
        v-if="task.completed" 
        class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full font-semibold"
      >
        Terminée
      </span>
      <span 
        v-else 
        class="text-xs px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full font-semibold"
      >
        En cours
      </span>
      
      <button 
        @click="viewDetails"
        class="p-2 text-blue-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
        title="Voir les détails"
      >
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
      </button>
      
      <button 
        @click="deleteTask"
        class="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
        title="Supprimer la tâche"
      >
        <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clip-rule="evenodd" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['toggle-complete', 'delete-task', 'view-details'])

const toggleComplete = () => {
  emit('toggle-complete')
}

const deleteTask = () => {
  emit('delete-task')
}

const viewDetails = () => {
  emit('view-details')
}
</script>