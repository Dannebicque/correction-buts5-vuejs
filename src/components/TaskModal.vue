<template>
  <div 
    v-if="isOpen" 
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    @click="closeModal"
  >
    <div 
      class="bg-white rounded-lg shadow-xl max-w-lg w-full mx-4 transform transition-all"
      @click.stop
    >
      <!-- En-tête de la modal -->
      <div class="flex items-center justify-between p-6 border-b border-gray-200">
        <h3 class="text-xl font-semibold text-gray-800">Détails de la tâche</h3>
        <button 
          @click="closeModal"
          class="text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>

      <!-- Contenu de la modal -->
      <div class="p-6" v-if="task">
        <!-- Statut -->
        <div class="mb-4">
          <div class="flex items-center space-x-3">
            <div 
              :class="{
                'bg-green-100 text-green-800': task.completed,
                'bg-yellow-100 text-yellow-800': !task.completed
              }"
              class="px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ task.completed ? 'Terminée' : 'En cours' }}
            </div>
            <div 
              :class="{
                'bg-green-500': task.completed,
                'bg-yellow-500': !task.completed
              }"
              class="w-3 h-3 rounded-full"
            ></div>
          </div>
        </div>

        <!-- Titre de la tâche -->
        <div class="mb-6">
          <h4 class="text-lg font-medium text-gray-800 mb-2">Titre</h4>
          <p 
            :class="{ 'line-through text-gray-500': task.completed }"
            class="text-gray-700 bg-gray-50 p-3 rounded-lg"
          >
            {{ task.text }}
          </p>
        </div>

        <!-- Informations détaillées -->
        <div class="space-y-4">
          <div>
            <h5 class="text-sm font-medium text-gray-600 mb-1">ID de la tâche</h5>
            <p class="text-gray-800 font-mono text-sm bg-gray-50 p-2 rounded">{{ task.id }}</p>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-600 mb-1">Date de création</h5>
            <p class="text-gray-800">{{ formatDate(task.createdAt) }}</p>
          </div>

          <div>
            <h5 class="text-sm font-medium text-gray-600 mb-1">Durée depuis la création</h5>
            <p class="text-gray-800">{{ getTimeSinceCreation(task.createdAt) }}</p>
          </div>
        </div>
      </div>

      <!-- Pied de page de la modal -->
      <div class="flex justify-end space-x-3 p-6 border-t border-gray-200 bg-gray-50 rounded-b-lg">
        <button
          @click="closeModal"
          class="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          Fermer
        </button>
        <button
          v-if="task"
          @click="toggleComplete"
          :class="{
            'bg-green-600 hover:bg-green-700': !task.completed,
            'bg-yellow-600 hover:bg-yellow-700': task.completed
          }"
          class="px-4 py-2 text-white rounded-lg transition-colors"
        >
          {{ task.completed ? 'Marquer comme non terminée' : 'Marquer comme terminée' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  task: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['close', 'toggle-complete'])

const closeModal = () => {
  emit('close')
}

const toggleComplete = () => {
  if (props.task) {
    emit('toggle-complete', props.task.id)
  }
}

const formatDate = (date) => {
  if (!date) return 'Date inconnue'
  return new Intl.DateTimeFormat('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(date))
}

const getTimeSinceCreation = (date) => {
  if (!date) return 'Durée inconnue'
  
  const now = new Date()
  const created = new Date(date)
  const diffMs = now - created
  
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  
  if (diffDays > 0) {
    return `Il y a ${diffDays} jour${diffDays > 1 ? 's' : ''}`
  } else if (diffHours > 0) {
    return `Il y a ${diffHours} heure${diffHours > 1 ? 's' : ''}`
  } else if (diffMinutes > 0) {
    return `Il y a ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''}`
  } else {
    return 'Il y a moins d\'une minute'
  }
}
</script>