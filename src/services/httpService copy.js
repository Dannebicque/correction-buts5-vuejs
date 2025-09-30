import { API_CONFIG, ERROR_MESSAGES } from '../config/index.js'

/**
 * Service HTTP global pour toutes les requêtes API
 * Centralise la configuration et la gestion d'erreurs
 */
class HttpService {
  constructor() {
    this.baseURL = API_CONFIG.BASE_URL
    this.timeout = API_CONFIG.TIMEOUT
    this.defaultHeaders = API_CONFIG.DEFAULT_HEADERS
  }

  /**
   * Construit l'URL complète
   * @param {string} endpoint - L'endpoint de l'API
   * @returns {string} URL complète
   */
  buildUrl(endpoint) {
    // Enlève le slash au début si présent
    const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint
    return `${this.baseURL}/${cleanEndpoint}`
  }

  /**
   * Gère les réponses HTTP
   * @param {Response} response - Réponse fetch
   * @returns {Promise} Données parsées ou erreur
   */
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

  /**
   * Gère les erreurs réseau et timeout
   * @param {Error} error - Erreur capturée
   * @throws {Error} Erreur formatée
   */
  handleError(error) {
    if (error.name === 'AbortError') {
      throw new Error(ERROR_MESSAGES.TIMEOUT)
    }
    
    if (error.message.includes('fetch')) {
      throw new Error(ERROR_MESSAGES.NETWORK_ERROR)
    }
    
    throw error
  }

  /**
   * Méthode générique pour toutes les requêtes HTTP
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} options - Options de la requête
   * @returns {Promise} Données de la réponse
   */
  async request(endpoint, options = {}) {
    const url = this.buildUrl(endpoint)
    
    // Configuration par défaut
    const config = {
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
      ...options,
    }

    // Gestion du timeout
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    config.signal = controller.signal

    try {
      const response = await fetch(url, config)
      clearTimeout(timeoutId)
      return await this.handleResponse(response)
    } catch (error) {
      clearTimeout(timeoutId)
      this.handleError(error)
    }
  }

  /**
   * Requête GET
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Données de la réponse
   */
  async get(endpoint, options = {}) {
    return this.request(endpoint, {
      method: 'GET',
      ...options,
    })
  }

  /**
   * Requête POST
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Données de la réponse
   */
  async post(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  /**
   * Requête PUT
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Données de la réponse
   */
  async put(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  /**
   * Requête PATCH
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} data - Données à envoyer
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Données de la réponse
   */
  async patch(endpoint, data = null, options = {}) {
    return this.request(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : null,
      ...options,
    })
  }

  /**
   * Requête DELETE
   * @param {string} endpoint - L'endpoint de l'API
   * @param {Object} options - Options supplémentaires
   * @returns {Promise} Données de la réponse
   */
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