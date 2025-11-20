import { createRouter, createWebHistory } from 'vue-router'

export const routes = [
  { path: '/',            component: () => import('@/pages/Dashboard.vue'),       meta: { title: 'Dashboard' } },
  { path: '/ingestion',   component: () => import('@/pages/Ingestion.vue'),       meta: { title: 'Ingestion' } },
  { path: '/embedding',   component: () => import('@/pages/Embedding.vue'),       meta: { title: 'Embedding' } },
  { path: '/indexation',  component: () => import('@/pages/Indexation.vue'),      meta: { title: 'Indexation' } },
  { path: '/kg',          component: () => import('@/pages/KnowledgeGraph.vue'),  meta: { title: 'Knowledge Graph' } },
  { path: '/search',      component: () => import('@/pages/Search.vue'),          meta: { title: 'Recherche' } },
  { path: '/monitoring',  component: () => import('@/pages/Monitoring.vue'),      meta: { title: 'Monitoring' } },
  // { path: '/404',         component: () => import('@/pages/404.vue'),      meta: { title: '404 Not Found' } },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

export default router
