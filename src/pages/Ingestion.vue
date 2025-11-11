<script setup>
import { onMounted, ref, computed, watch } from 'vue'
import LayoutShell from '@/components/LayoutShell.vue'
import HeaderBar from '@/components/page-gride/HeaderBar.vue'
import ListPane from '@/components/page-gride/ListPane.vue'

import { useIngestionStore } from '@/stores/useIngestionStore'
import SeriesDetail from '@/components/ingestion/SeriesDetail.vue'
import FileDetail from '@/components/ingestion/FileDetail.vue'
import UploadDialog from '@/components/ingestion/UploadDialog.vue'

const store = useIngestionStore()
onMounted(() => store.bootstrap())

const showUpload = ref(false)

// Items dans le volet gauche selon l’état
const listItems = computed(() => store.listItems)
const listTitle = computed(() => {
  if (store.level === 'series')
    return store.tab === 'files' ? 'Séries (Files)' : 'Séries (Vector stores)'
  return store.tab === 'files'
    ? `Fichiers — ${store.selectedSeriesId}`
    : `Vector stores — ${store.selectedSeriesId}`
})

const selected = computed(() => store.selectedItem)
const isSeriesLevel = computed(() => store.level === 'series')
const canBack = computed(() => store.level === 'items')

function onOpen(id) {
  if (store.level === 'series') store.openSeries(id)
}
function onSelect(id) {
  store.selectItem(id)
}

function openUpload() {
  showUpload.value = true
}
function closeUpload() {
  showUpload.value = false
}

watch(
  () => store.tab,
  () => {
    // quand on change d'onglet, on remonte au niveau séries
    store.backToSeries()
  },
)
</script>

<template>
  <LayoutShell>
    <!-- Header -->
    <template #header>
      <HeaderBar
        v-model="store.tab"
        :tabs="[
          { id: 'files', label: 'Files' },
          { id: 'vectors', label: 'Vector stores' },
        ]"
      >
        <template #title>Ingestion</template>

        <template #actions>
          <button
            v-if="canBack"
            class="rounded p-1 px-4 outline bg-slate-800 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-blue-400 cursor-pointer"
            @click="store.backToSeries()"
          >
            Back
          </button>

          <button
            class="btn rounded p-1 px-4 outline bg-slate-600 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-blue-400 cursor-pointer"
            @click="openUpload"
          >
            Upload
          </button>
        </template>
      </HeaderBar>
    </template>

    <!-- Liste (colonne 1/3) -->
    <template #list>
      <ListPane
        :items="listItems"
        :selected-id="store.selectedItemId"
        :title="listTitle"
        :empty-cta-label="store.tab === 'files' ? 'Créer une série' : 'Aucune donnée'"
        @select="onSelect"
        @open="onOpen"
        @create="openUpload"
      >
        <template #item="{ item }">
          <!-- Rendu custom des lignes -->
          <div class="flex items-center justify-between">
            <div class="truncate">{{ item.name }}</div>
            <div v-if="item.size" class="text-xs text-gray-400 ml-2">{{ item.size }}</div>
          </div>
        </template>
      </ListPane>
    </template>

    <!-- Détails (colonne 2/3) -->
    <template #detail>
      <div v-if="store.level === 'series'" class="h-full grid place-items-center text-gray-400">
        Sélectionnez une série ou double‑cliquez pour ouvrir.
      </div>

      <template v-else>
        <!-- Files mode -->
        <FileDetail v-if="store.tab === 'files' && selected && selected.name" :file="selected" />

        <!-- Series detail for Vector stores (ou synthèse Files) -->
        <SeriesDetail
          v-else
          :series-id="store.selectedSeriesId"
          :status="store.statusBySeries[store.selectedSeriesId]"
          @add-files="showUpload = true"
        />
      </template>
    </template>
  </LayoutShell>

  <!-- Dialog Upload (nouvelle série OU ajout à la série ouverte) -->
  <UploadDialog
    :open="showUpload"
    :series-context="store.level === 'items' ? store.selectedSeriesId : ''"
    @close="closeUpload"
  />
</template>
