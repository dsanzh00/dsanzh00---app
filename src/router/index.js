import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/documents',
    name: 'documetns',
    
    component: () => import('../views/DocumentsView.vue')
  },
  {
    path: '/menu',
    name: 'menu',
    
    component: () => import('../views/MenuView.vue')
  },
  {
    path: '/newDocument',
    name: 'newDocument',
    
    component: () => import('../views/NewDocumentView.vue')
  },
  {
    path: '/newLabel',
    name: 'newLabel',
    
    component: () => import('../views/NewLabelView.vue')
  },
  {
    path: '/prueba',
    name: 'prueba',
    
    component: () => import('../views/pruebaView.vue')
  },
  {
    path: '/projects',
    name: 'projects',
    
    component: () => import('../views/ProjectsView.vue')
  },
  {
    path: '/categories',
    name: 'categories',
    
    component: () => import('../views/CategoriesView.vue')
  },
  {
    path: '/labels',
    name: 'labels',
    
    component: () => import('../views/LabelsView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
