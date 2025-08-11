<script setup>
// import { RouterLink, RouterView } from 'vue-router'
import { computed, watchEffect } from 'vue'
import HelloWorld from './components/HelloWorld.vue'
import { useThemeStore } from '@/stores/themeStore'

// Composants structurels
import Sidebar from '@/components/Sidebar.vue'
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'

const themeStore = useThemeStore()
/*
 * Synchronise la préférence « dark » avec :
 *   1. Le localStorage pour la persistance (clé : theme)
 *   2. L'élément <html> pour activer le mode sombre Tailwind (strategy "class")
 */
watchEffect(() => {
  const isDark = themeStore.dark
  document.documentElement.classList.toggle('dark', isDark)
  localStorage.setItem('theme', isDark ? 'dark' : 'light')
})
// Classe utilitaire appliquée au conteneur racine
const rootThemeClass = computed(() => (themeStore.dark ? 'dark' : 'light'))

</script>

<template>
  <!-- Conteneur global -->
  <div :class="[rootThemeClass, 'min-h-screen w-screen flex bg-gray-900 text-gray-100']">
    <!-- Sidebar gauche (largeur fixe, scroll indépendant) -->
    <Sidebar class="fixed inset-y-0 left-0 z-40 shadow-lg" />

    <!-- Wrapper principal (décalé de la largeur du sidebar) -->
    <div class="flex-1 pl-56 flex flex-col min-h-screen">
      <!-- Barre de navigation haute -->
      <Navbar class="sticky top-0 z-30 bg-gray-800 border-b border-gray-700 shadow-md" />

      <!-- Zone de contenu (router-view injecte les pages) -->
      <main class="flex-1 flex flex-col p-6 overflow-auto bg-gray-900">
        <!-- Les pages peuvent elles‑mêmes gérer un layout 1/3‑2/3 via slots -->
        <router-view class="flex-1" />
      </main>

      <!-- Pied de page -->
      <Footer class="bg-gray-800 border-t border-gray-700 text-gray-400" />
    </div>
  </div>
  <!-- <RouterView /> -->
</template>

<style scoped>

</style>
