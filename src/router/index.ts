/**
 * Vue Router configuration file.
 * Defines application routes and creates router instance.
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

/**
 * Application route configurations.
 * @type {RouteRecordRaw[]}
 * @property {string} path - The URL path pattern
 * @property {string} name - The route name (for named routing)
 * @property {Component} component - The Vue component to render
 */
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/:pathMatch(.*)*', // Catch-all route for 404 pages
    name: 'NotFound',
    // Lazy-loaded component for better performance
    component: () => import('@/views/NotFoundView.vue'),
  },
]

/**
 * Vue Router instance configuration.
 * @type {Router}
 * @property {RouterHistory} history - HTML5 history mode configuration
 * @property {RouteRecordRaw[]} routes - Array of route configurations
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes,
})

export default router
