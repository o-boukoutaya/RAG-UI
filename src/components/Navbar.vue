<script setup>
import { useThemeStore } from '@/stores/themeStore'
import { useRoute } from 'vue-router'
import { Moon, Sun } from 'lucide-vue-next'
import { computed } from 'vue'

const theme = useThemeStore()

// route est réactive : il change à chaque navigation
const route = useRoute()

// Le titre provient du meta de la route
const pageTitle = computed(() => route.meta.title ?? '— No Title —')

</script>

<template>
  <header class="h-10 flex items-center px-4 bg-layer border-b border-stroke/60">
    <span class="text-sm font-medium truncate">{{ pageTitle }}</span>
    <button @click="theme.toggle()" class="ml-auto p-1 rounded hover:bg-stroke/40 cursor-pointer">
      <Sun v-if="!theme.dark"  class="w-4 h-4" />
      <Moon v-else            class="w-4 h-4" />
    </button>
  </header>
</template>
