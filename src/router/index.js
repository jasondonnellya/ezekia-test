import { createRouter, createWebHistory } from 'vue-router'
import SpacePage from '../views/SpacePage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Space Page',
      component: SpacePage
    }
  ]
})

export default router
