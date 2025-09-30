/**
 * Point d'entrée pour tous les services
 * Facilite l'importation des services dans l'application
 */

// Services
export { default as httpService } from './httpService.js'
export { default as taskService } from './taskService.js'

// Configuration
export * from '../config/index.js'