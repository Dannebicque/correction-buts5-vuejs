import httpService from './httpService.js'

/**
 * Service API pour la gestion des tâches
 * Contient toutes les opérations CRUD pour les tâches
 */
class TaskService {
  constructor() {
    this.endpoint = 'tasks'
  }

  async getAllTasks() {
    try {
      const tasks = await httpService.get(this.endpoint) // ou fetch('http://localhost:3001/tasks)
      return tasks
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des tâches: ${error.message}`)
    }
  }

  async getTaskById(id) {
    try {
      const task = await httpService.get(`${this.endpoint}/${id}`)
      return task
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de la tâche ${id}: ${error.message}`)
    }
  }

  async createTask(taskData) {
    try {
      // Validation des données
      if (!taskData.text || typeof taskData.text !== 'string' || !taskData.text.trim()) {
        throw new Error('Le texte de la tâche est requis')
      }

      // Préparation des données avec valeurs par défaut
      const task = {
        text: taskData.text.trim(),
        completed: taskData.completed || false,
        createdAt: taskData.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      const createdTask = await httpService.post(this.endpoint, task)
      return createdTask
    } catch (error) {
      throw new Error(`Erreur lors de la création de la tâche: ${error.message}`)
    }
  }

  async updateTask(id, taskData) {
    try {
      // Ajouter la date de mise à jour
      const updatedTaskData = {
        ...taskData,
        updatedAt: new Date().toISOString()
      }

      const updatedTask = await httpService.put(`${this.endpoint}/${id}`, updatedTaskData)
      return updatedTask
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour de la tâche ${id}: ${error.message}`)
    }
  }

  async patchTask(id, partialData) {
    try {
      // Ajouter la date de mise à jour
      const patchData = {
        ...partialData,
        updatedAt: new Date().toISOString()
      }

      const updatedTask = await httpService.patch(`${this.endpoint}/${id}`, patchData)
      return updatedTask
    } catch (error) {
      throw new Error(`Erreur lors de la mise à jour partielle de la tâche ${id}: ${error.message}`)
    }
  }

  async toggleTaskCompletion(id) {
    try {
      // Récupérer d'abord la tâche actuelle
      const currentTask = await this.getTaskById(id)
      
      // Basculer le statut
      const updatedTask = await this.patchTask(id, {
        completed: !currentTask.completed
      })
      
      return updatedTask
    } catch (error) {
      throw new Error(`Erreur lors du basculement du statut de la tâche ${id}: ${error.message}`)
    }
  }

  async deleteTask(id) {
    try {
      await httpService.delete(`${this.endpoint}/${id}`)
    } catch (error) {
      throw new Error(`Erreur lors de la suppression de la tâche ${id}: ${error.message}`)
    }
  }

  async getTasksByStatus(completed) {
    try {
      const allTasks = await this.getAllTasks()
      return allTasks.filter(task => task.completed === completed)
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des tâches par statut: ${error.message}`)
    }
  }

  async getPendingTasks() {
    return this.getTasksByStatus(false)
  }

  async getCompletedTasks() {
    return this.getTasksByStatus(true)
  }
}

// Instance singleton
const taskService = new TaskService()

export default taskService