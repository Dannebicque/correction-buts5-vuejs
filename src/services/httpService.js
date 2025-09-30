import { ERROR_MESSAGES } from '../config/index.js'

/**
 * Service HTTP global pour toutes les requêtes API
 * Centralise la configuration et la gestion d'erreurs
 */
class HttpService {
  constructor() {
    this.baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001'
  }

  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.text()
      throw new Error(
        `HTTP ${response.status}: ${response.statusText}. ${errorData || ''}`
      )
    }

    // Vérifie si la réponse contient du JSON
    const contentType = response.headers.get('content-type')
    if (contentType && contentType.includes('application/json')) {
      return await response.json()
    }
    
    return await response.text()
  }

  handleError(error) {
    if (error.name === 'AbortError') {
      throw new Error(ERROR_MESSAGES.TIMEOUT)
    }
    
    if (error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
    }
    
    throw error
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseURL}/${endpoint}`
    
    // Configuration par défaut
    const config = {
      ...options,
    }

    try {
      const response = await fetch(url, config)
      return await this.handleResponse(response)
    } catch (error) {
      this.handleError(error)
    }
  }

  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  async patch(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  async delete(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'DELETE',
      ...options,
    })
  }
}

// Instance singleton
const httpService = new HttpService()

export default httpService