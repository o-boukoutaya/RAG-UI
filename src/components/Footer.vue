<script setup>
// Pas d’état pour l’instant : placeholder WebSocket/REST
</script>

<template>
  <footer
    class="w-full py-3 px-8 flex items-center justify-between bg-gray-800 text-gray-400 border-t border-gray-700"
  >
    <span>État général :</span>
    <!-- <div class="inline-grid *:[grid-area:1/1]">
      <div class="status status-error animate-ping"></div>
      <div class="status status-error"></div>
      test
    </div> -->
    <span id="app-status" class="ml-2 text-green-400">OK</span>
    <slot />
  </footer>
</template>
