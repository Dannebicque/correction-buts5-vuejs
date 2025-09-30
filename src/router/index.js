import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
        path: '/',
        name: 'home',
        meta: { 
          title: 'Task Manager - Home',
          description: 'Gérez vos tâches facilement avec notre gestionnaire de tâches moderne',
          keywords: 'task, manager, productivité, organisation'
        },
        component: () => import('@/views/TaskListView.vue')
    },
    {
        path: '/task/:id',
        name: 'tache-detail',
        meta: { 
          title: 'Task Manager - Détails de la tâche',
          description: 'Consultez les détails de votre tâche',
          titleTemplate: 'Task Manager - Tâche #{id}'
        },
        component: () => import('@/views/TaskDetailView.vue')
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        meta: { 
          title: 'Task Manager - Page non trouvée',
          description: 'La page que vous recherchez n\'existe pas'
        },
        component: () => import('@/views/NotFoundView.vue')
    }
  ]
})

// Fonction pour mettre à jour les métadonnées
function updateMetadata(route) {
  // Mise à jour du titre
  let title = 'Task Manager'
  if (route.meta.title) {
      title = route.meta.title
  }
  document.title = title

  // Mise à jour de la description
  let descriptionElement = document.querySelector('meta[name="description"]')
  if (route.meta.description) {
    if (descriptionElement) {
      descriptionElement.setAttribute('content', route.meta.description)
    } else {
      descriptionElement = document.createElement('meta')
      descriptionElement.name = 'description'
      descriptionElement.content = route.meta.description
      document.head.appendChild(descriptionElement)
    }
  }
}

// Navigation guard pour mettre à jour les métadonnées
router.beforeEach((to, from, next) => {
  updateMetadata(to)
  next()
})

/* ou router.afterEach((to) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
})*/

export default router