<script setup>
import { useThemeStore } from '@/stores/themeStore'
import { useRoute } from 'vue-router'
import { Moon, Sun } from 'lucide-vue-next'
import { computed, watch } from 'vue'

const theme = useThemeStore()

// route est réactive : il change à chaque navigation
const route = useRoute()

// Le titre provient du meta de la route
const pageTitle = computed(() => route.meta.title ?? '—')

</script>

<template>
  <header class="h-10 flex items-center px-4 bg-layer border-b border-stroke/60">
    <span class="text-sm font-medium truncate">{{ pageTitle }}</span>
    <button @click="theme.toggle()" class="ml-auto p-1 rounded hover:bg-stroke/40">
      <Sun v-if="!theme.dark"  class="w-4 h-4" />
      <Moon v-else            class="w-4 h-4" />
    </button>
  </header>

  <!-- <header class="flex items-center h-16 px-8 border-b shadow-md bg-gray-800 text-gray-100 border-gray-700">
    <h2 class="text-lg font-semibold flex items-center gap-2">
      <slot name="icon" />
      {{ pageTitle }}
    </h2>

    <div class="ml-auto flex items-center gap-4">
      <button
        @click="theme.toggle"
        class="p-2 rounded-full hover:bg-gray-700 focus:ring-2 focus:ring-primary-500 transition"
        :title="theme.dark ? 'Mode clair' : 'Mode sombre'"
      >
        <Sun v-if="!theme.dark" class="w-5 h-5 text-gray-400" />
        <Moon v-else class="w-5 h-5 text-gray-400" />
      </button>

      <span class="text-sm text-gray-400">
        <slot name="status" />
      </span>
    </div>
  </header> -->
</template>
