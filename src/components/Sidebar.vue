<script setup>
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// Icônes Lucide (tree-shaking) – reste en JS
const route = useRoute()
import { Home, FileText, BookOpen, Brain, Globe, Search, Activity } from 'lucide-vue-next'

const menu = [
  { label: 'Dashboard',     to: '/',          icon: Home },
  { label: 'Ingestion',     to: '/ingestion', icon: FileText },
  { label: 'Embedding',     to: '/embedding', icon: BookOpen },
  { label: 'Indexation',    to: '/indexation',icon: Brain },
  { label: 'Knowledge Graph', to: '/kg',      icon: Globe },
  { label: 'Recherche',     to: '/search',    icon: Search },
  { label: 'Monitoring',    to: '/monitoring',icon: Activity }
]

// Renvoie une computed qui se mettra à jour quand la route change
const isActive = (path) => computed(() => route.path === path)
</script>

<template>
  <aside class="w-56 shrink-0 flex flex-col py-6 px-4 bg-gray-800 text-gray-100 dark:bg-gray-950">
    <h1 class="mb-8 text-2xl font-bold tracking-tight">GraphRAG</h1>

    <nav class="flex-1">
      <ul class="space-y-1 list-none p-0 m-0">
        <li v-for="item in menu" :key="item.to">
          <RouterLink
            :to="item.to"
            class="flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium
                  transition-colors"
            :class="isActive(item.to)
                    ? 'bg-layer text-white'
                    : 'text-gray-300 hover:bg-layer/60 hover:text-white'">
            <component :is="item.icon" class="w-4 h-4" />
            {{ item.label }}
          </RouterLink>

        </li>
      </ul>
    </nav>

    <p class="mt-8 text-xs text-gray-400">&copy; 2025 GraphRAG</p>
  </aside>
</template>
