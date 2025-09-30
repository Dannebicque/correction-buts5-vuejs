/**
 * Configuration globale de l'application
 */

// Configuration de l'API
export const API_CONFIG = {
  // URL de base de l'API - peut être modifiée selon l'environnement
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001',
  
  // Timeout pour les requêtes (en millisecondes)
  TIMEOUT: 10000,
  
  // Headers par défaut
  DEFAULT_HEADERS: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  
  // Endpoints de l'API
  ENDPOINTS: {
    TASKS: 'tasks',
    // Vous pouvez ajouter d'autres endpoints ici
    // USERS: 'users',
    // AUTH: 'auth',
  }
}

// Configuration de l'application
export const APP_CONFIG = {
  // Nom de l'application
  NAME: 'Task Manager',
  
  // Version
  VERSION: '1.0.0',
  
  // Configuration des toasts/notifications
  TOAST_DURATION: 3000,
  
  // Pagination par défaut
  DEFAULT_PAGE_SIZE: 20,
}

// Configuration des erreurs
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Erreur de connexion. Vérifiez votre connexion internet.',
  SERVER_ERROR: 'Erreur serveur. Veuillez réessayer plus tard.',
  VALIDATION_ERROR: 'Données invalides. Vérifiez les informations saisies.',
  NOT_FOUND: 'Ressource non trouvée.',
  UNAUTHORIZED: 'Accès non autorisé.',
  FORBIDDEN: 'Action non autorisée.',
  TIMEOUT: 'La requête a pris trop de temps. Veuillez réessayer.',
}

// Environnements
export const ENVIRONMENTS = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
}

// Environnement actuel
export const CURRENT_ENV = import.meta.env.MODE || ENVIRONMENTS.DEVELOPMENT

// Est en mode développement
export const IS_DEV = CURRENT_ENV === ENVIRONMENTS.DEVELOPMENT

// Est en mode production
export const IS_PROD = CURRENT_ENV === ENVIRONMENTS.PRODUCTION