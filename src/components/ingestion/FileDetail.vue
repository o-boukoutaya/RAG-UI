<script setup>
const props = defineProps({
  file: { type: Object, required: true },
})
</script>

<template>
  <div class="p-4 space-y-4">
    <h2 class="text-lg font-semibold">Fichier</h2>
    <div class="card p-4 space-y-1">
      <div><span class="text-gray-400 text-sm">Nom :</span> {{ file.name }}</div>
      <div><span class="text-gray-400 text-sm">Taille :</span> {{ file.size ?? '—' }}</div>
      <div><span class="text-gray-400 text-sm">Créé le :</span> {{ file.created ?? '—' }}</div>
    </div>
    <div class="flex gap-2">
      <button
        class="btn rounded p-1 px-4 outline bg-slate-600 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-blue-400 cursor-pointer"
      >
        Re-extract
      </button>
      <button
        class="btn rounded p-1 px-4 outline bg-slate-800 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-red-400 cursor-pointer"
      >
        Supprimer
      </button>
    </div>
  </div>
</template>
