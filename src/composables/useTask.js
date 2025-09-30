import { ref } from 'vue'
import taskService from '../services/taskService.js'

export default function useTask() {
    const tasks = ref([])
    const errorMessage = ref('')
    const isLoading = ref(false)

    const fetchTasks = async () => {
        errorMessage.value = ''
        isLoading.value = true
        
        try {
            const data = await taskService.getAllTasks()
            tasks.value = data
            return data
        } catch (error) {
            errorMessage.value = error.message
            console.error('Erreur lors de la récupération des tâches:', error)
            return []
        } finally {
            isLoading.value = false
        }
    }

    const addTask = async (newTaskText) => {
        if (!newTaskText || !newTaskText.trim()) {
            errorMessage.value = 'Le texte de la tâche ne peut pas être vide'
            return null
        }

        errorMessage.value = ''
        isLoading.value = true

        try {
            const taskData = {
                text: newTaskText.trim(),
                completed: false,
                createdAt: new Date().toISOString()
            }

            const newTask = await taskService.createTask(taskData)
            
            // Ajouter la nouvelle tâche à la liste locale
            tasks.value.push(newTask)
            
            return newTask
        } catch (error) {
            errorMessage.value = error.message
            console.error('Erreur lors de l\'ajout de la tâche:', error)
            return null
        } finally {
            isLoading.value = false
        }
    }

    const toggleTaskComplete = async (taskId) => {
        errorMessage.value = ''
        
        try {
            const updatedTask = await taskService.toggleTaskCompletion(taskId)
            
            // Mettre à jour la tâche dans la liste locale
            const taskIndex = tasks.value.findIndex(t => t.id == taskId)
            if (taskIndex !== -1) {
                tasks.value[taskIndex] = updatedTask
            }
            
            return updatedTask
        } catch (error) {
            errorMessage.value = error.message
            console.error('Erreur lors de la mise à jour du statut:', error)
            return null
        }
    }

    const deleteTask = async (taskId) => {
        errorMessage.value = ''
        
        try {
            await taskService.deleteTask(taskId)
            
            // Supprimer la tâche de la liste locale
            tasks.value = tasks.value.filter(t => t.id != taskId)
            
            return true
        } catch (error) {
            errorMessage.value = error.message
            console.error('Erreur lors de la suppression:', error)
            return false
        }
    }

    const updateTask = async (taskId, taskData) => {
        errorMessage.value = ''
        
        try {
            const updatedTask = await taskService.updateTask(taskId, taskData)
            
            // Mettre à jour la tâche dans la liste locale
            const taskIndex = tasks.value.findIndex(t => t.id == taskId)
            if (taskIndex !== -1) {
                tasks.value[taskIndex] = updatedTask
            }
            
            return updatedTask
        } catch (error) {
            errorMessage.value = error.message
            console.error('Erreur lors de la mise à jour:', error)
            return null
        }
    }

    return {
        // État réactif
        tasks,
        errorMessage,
        isLoading,
        
        // Actions
        fetchTasks,
        addTask,
        toggleTaskComplete,
        deleteTask,
        updateTask
    }
}