<script setup>
import { ref, computed, onMounted } from 'vue';
import { API } from '@/api';
import { useSeriesStore } from '@/stores/seriesStore';

const seriesStore = useSeriesStore();
const seriesId = ref('');
const files = ref([]);
const busy = ref(false);
const logs = ref([]);

onMounted(() => seriesStore.refresh());

function log(line) { logs.value.unshift(`[${new Date().toLocaleTimeString()}] ${line}`); }

async function doImport() {
  if (!files.value?.length) return log('Choisir des fichiers.');
  busy.value = true;
  try {
    const rep = await API.corpus.import(seriesId.value, files.value);
    seriesId.value = rep.series;
    log(`Import OK: ${rep.accepted?.length||0} fichiers acceptés, ${rep.rejected?.length||0} rejetés.`);
    seriesStore.refresh();
  } catch (e) {
    log(`Erreur import: ${e?.data?.detail || e.message}`);
  } finally { busy.value = false; }
}

async function doExtract() {
  if (!seriesId.value) return log('Choisir une série.');
  busy.value = true;
  try {
    await API.corpus.extractSerie({ series: seriesId.value, run_async: true, mode: 'auto' });
    log('Extraction lancée (async).');
  } catch (e) { log(`Erreur extraction: ${e?.data?.detail || e.message}`); }
  finally { busy.value = false; }
}

async function doChunk() {
  if (!seriesId.value) return log('Choisir une série.');
  busy.value = true;
  try {
    await API.corpus.chunk({ series: seriesId.value, strategy: 'sentence', size: 800, overlap: 150, run_async: true });
    log('Chunking lancé (async).');
  } catch (e) { log(`Erreur chunking: ${e?.data?.detail || e.message}`); }
  finally { busy.value = false; }
}

async function doEmbed() {
  if (!seriesId.value) return log('Choisir une série.');
  busy.value = true;
  try {
    await API.corpus.embed(seriesId.value, 1536);
    log('Embedding terminé (ou lancé selon impl).');
  } catch (e) { log(`Erreur embedding: ${e?.data?.detail || e.message}`); }
  finally { busy.value = false; }
}
</script>

<template>
  <div class="p-6 space-y-6">
    <h1 class="text-2xl font-bold">Indexation</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div class="card p-4 space-y-4">
        <label class="block text-sm text-gray-400">Série</label>
        <select v-model="seriesId" class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2">
          <option value="">— nouvelle série (auto) —</option>
          <option v-for="s in seriesStore.all" :key="s" :value="s">{{ s }}</option>
        </select>

        <label class="block text-sm text-gray-400 mt-4">Fichiers</label>
        <input type="file" multiple class="w-full" @change="e => files = e.target.files" />

        <div class="flex gap-2 mt-4">
          <button class="btn-primary" :disabled="busy" @click="doImport">Uploader</button>
          <button class="btn-secondary" :disabled="busy || !seriesId" @click="doExtract">Extraire</button>
          <button class="btn-secondary" :disabled="busy || !seriesId" @click="doChunk">Chunker</button>
          <button class="btn-secondary" :disabled="busy || !seriesId" @click="doEmbed">Embed</button>
        </div>
      </div>

      <div class="md:col-span-2 card p-4">
        <h2 class="font-semibold mb-2">Journal</h2>
        <ul class="space-y-1 max-h-80 overflow-auto text-sm">
          <li v-for="(l, i) in logs" :key="i" class="text-gray-400">{{ l }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
