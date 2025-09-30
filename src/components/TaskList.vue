<template>
  <div class="max-w-2xl mx-auto p-6">
    <!-- En-tête -->
    <div class="mb-8 text-center">
      <h1 class="text-3xl font-bold text-gray-800 mb-2">Gestionnaire de Tâches</h1>
      <p class="text-gray-600">Organisez et suivez vos tâches facilement</p>
    </div>

    <div v-if="errorMessage" class="mb-4 p-4 bg-red-100 text-red-700 border border-red-300 rounded-lg">
      {{ errorMessage }}
    </div>

    <!-- Formulaire d'ajout de tâche -->
    <div class="mb-6 bg-white rounded-lg shadow-md p-6 border border-gray-200">
      <h2 class="text-lg font-semibold text-gray-800 mb-4">Ajouter une nouvelle tâche</h2>
      <form @submit.prevent="_addTask" class="flex space-x-3">
        <input v-model="newTaskText" type="text" placeholder="Entrez votre tâche..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
          required>
        <button type="submit"
          class="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors">
          Ajouter
        </button>
      </form>
    </div>

    <!-- Statistiques -->
    <div class="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="bg-blue-50 rounded-lg p-4 text-center border border-blue-200">
        <div class="text-2xl font-bold text-blue-600">{{ totalTasks }}</div>
        <div class="text-sm text-blue-800">Total</div>
      </div>
      <div class="bg-yellow-50 rounded-lg p-4 text-center border border-yellow-200">
        <div class="text-2xl font-bold text-yellow-600">{{ pendingTasks }}</div>
        <div class="text-sm text-yellow-800">En cours</div>
      </div>
      <div class="bg-green-50 rounded-lg p-4 text-center border border-green-200">
        <div class="text-2xl font-bold text-green-600">{{ completedTasks }}</div>
        <div class="text-sm text-green-800">Terminées</div>
      </div>
    </div>

    <!-- Filtres -->
    <div class="mb-6 flex justify-center space-x-2">
      <button v-for="filter in filters" :key="filter.value" @click="currentFilter = filter.value" :class="{
        'bg-blue-600 text-white': currentFilter === filter.value,
        'bg-gray-200 text-gray-700 hover:bg-gray-300': currentFilter !== filter.value
      }" class="px-4 py-2 rounded-lg font-medium transition-colors">
        {{ filter.label }}
      </button>
    </div>

    <!-- Liste des tâches -->
    <div class="space-y-3">
      <div v-if="filteredTasks.length === 0" class="text-center py-12">
        <div class="text-gray-400 text-6xl mb-4">📝</div>
        <p class="text-gray-500 text-lg">
          {{ currentFilter === 'all' ? 'Aucune tâche pour le moment' : 'Aucune tâche dans cette catégorie' }}
        </p>
        <p class="text-gray-400 text-sm mt-2">
          {{ currentFilter === 'all' ? 'Commencez par ajouter votre première tâche !' : 'Essayez un autre filtre' }}
        </p>
      </div>

      <Task v-for="task in filteredTasks" :key="task.id" :task="task" @toggle-complete="toggleTaskComplete(task.id)"
        @delete-task="deleteTask(task.id)" @view-details="openModal(task)" />
    </div>
  </div>

  <!-- Modal de détail de tâche -->
  <TaskModal :is-open="isModalOpen" :task="selectedTask" @close="closeModal" @toggle-complete="toggleTaskComplete" />
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import Task from './Task.vue'
import TaskModal from './TaskModal.vue'


// Composable pour gérer les tâches
import useTask from '../composables/useTask'

const { tasks, fetchTasks, addTask, errorMessage } = useTask()

onMounted(() => {
  fetchTasks()
})

const _addTask = () => {
  addTask(newTaskText.value)
  newTaskText.value = ''
}
// fin composable

const newTaskText = ref('')
const currentFilter = ref('all')

// Variables pour la modal
const isModalOpen = ref(false)
const selectedTask = ref(null)

const filters = [
  { value: 'all', label: 'Toutes' },
  { value: 'pending', label: 'En cours' },
  { value: 'completed', label: 'Terminées' }
]

// Calculs des statistiques
const totalTasks = computed(() => tasks.value.length)
const completedTasks = computed(() => tasks.value.filter(task => task.completed).length)
const pendingTasks = computed(() => tasks.value.filter(task => !task.completed).length)

// Filtrage des tâches
const filteredTasks = computed(() => {
  switch (currentFilter.value) {
    case 'completed':
      return tasks.value.filter(task => task.completed)
    case 'pending':
      return tasks.value.filter(task => !task.completed)
    default:
      return tasks.value
  }
})

// Ajouter une nouvelle tâche


// Basculer l'état de completion d'une tâche
const toggleTaskComplete = (taskId) => {
  const task = tasks.value.find(t => t.id === taskId)
  if (task) {
    task.completed = !task.completed
  }
}

// Supprimer une tâche
const deleteTask = (taskId) => {
  tasks.value = tasks.value.filter(t => t.id !== taskId)
}

// Fonctions pour gérer la modal
const openModal = (task) => {
  selectedTask.value = task
  isModalOpen.value = true
}

const closeModal = () => {
  isModalOpen.value = false
  selectedTask.value = null
}
</script>