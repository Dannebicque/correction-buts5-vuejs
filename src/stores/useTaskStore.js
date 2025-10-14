import { defineStore } from "pinia";
import { ref, computed } from "vue";
import taskService from "@/services/taskService";


export const useTaskStore = defineStore("task",() => {
    const tasks = ref([])
    const nbTasks = computed(() => tasks.value.length)

    // Indique si les tâches ont déjà été chargées
    const loaded = ref(false)
    const isLoading = ref(false)
    const error = ref(null)

    const getAllTasks = async (force = false) => {
        // Si déjà chargé et non forcé, retourner la liste locale
        if (loaded.value && !force) {
            return tasks.value
        }

        isLoading.value = true
        error.value = null
        try {
            const data = await taskService.getAllTasks()
            tasks.value = data || []
            loaded.value = true
            return tasks.value
        } catch (err) {
            error.value = err
            // Rethrow si besoin ou retourner tableau vide
            console.error('Erreur getAllTasks:', err)
            return []
        } finally {
            isLoading.value = false
        }
    }

    const addTask = async (taskData) => {
        const newTask = await taskService.createTask(taskData)
        tasks.value.push(newTask)
        // Si on ajout une tâche manuellement, considérer le store comme chargé
        loaded.value = true
    }

    return { tasks, nbTasks, getAllTasks, addTask, loaded, isLoading, error }

})