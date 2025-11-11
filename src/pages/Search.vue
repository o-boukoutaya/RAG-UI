<script setup>
import { ref } from 'vue';
import { useSeriesStore } from '@/stores/seriesStore';
import { useSearchStore } from '@/stores/searchStore';

const seriesStore = useSeriesStore(); seriesStore.refresh();
const searchStore = useSearchStore();

const q = ref('');
const series = ref('');
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">Recherche</h1>

    <div class="flex flex-wrap gap-2 items-end">
      <input v-model="q" placeholder="Votre question…" class="bg-gray-800 border border-gray-700 rounded px-3 py-2 w-96" />
      <select v-model="series" class="bg-gray-800 border border-gray-700 rounded px-3 py-2">
        <option value="">(toutes / défaut)</option>
        <option v-for="s in seriesStore.all" :key="s" :value="s">{{ s }}</option>
      </select>
      <select v-model="searchStore.mode" class="bg-gray-800 border border-gray-700 rounded px-3 py-2">
        <option value="hybrid">hybrid</option>
        <option value="kg">kg</option>
        <option value="dense">dense</option>
      </select>
      <input type="number" min="1" max="20" v-model.number="searchStore.k" class="w-20 bg-gray-800 border border-gray-700 rounded px-3 py-2" />
      <button class="btn-primary" :disabled="searchStore.loading" @click="searchStore.run(q, series)">Chercher</button>
    </div>

    <div v-if="searchStore.error" class="text-red-400 text-sm">
      {{ searchStore.error.data?.detail || searchStore.error.message }}
    </div>

    <ul class="divide-y divide-gray-800">
      <li v-for="h in searchStore.hits" :key="h.id" class="py-3">
        <div class="text-sm text-gray-400">{{ h.filename }} — p.{{ h.page }} — score: {{ h.score?.toFixed?.(3) }}</div>
        <div class="mt-1">{{ h.text }}</div>
      </li>
    </ul>
  </div>
</template>
