<script setup>
import { ref, computed } from 'vue'
import LayoutShell  from '@/components/LayoutShell.vue'
import HeaderBar    from '@/components/page-gride/HeaderBar.vue'
import ListPane     from '@/components/page-gride/ListPane.vue'
import DetailPane   from '@/components/page-gride/DetailPane.vue'

/* ------------------------------------------------------------------
   1.  Données factices – remplace-les par ton store Pinia plus tard
   ------------------------------------------------------------------*/
const files = ref([
  { id: 1, name: 'BROCHURE-ADDOHA-MRE-1.pdf', size: '4 MB', created: '2025-06-06 03:31' },
  { id: 2, name: 'BROCHURE-ADDOHA-MRE-2.pdf', size: '4 MB', created: '2025-06-06 03:30' }
])

const vectorStores = ref([])          // vide  ⇒ EmptyState
const activeTab   = ref('files')      // 'files' | 'vectors'
const selectedId  = ref(null)

/* ------------------------------------------------------------------
   2.  Données dérivées
   ------------------------------------------------------------------*/
const listItems = computed(() =>
  activeTab.value === 'files' ? files.value : vectorStores.value
)

const selectedItem = computed(() =>
  listItems.value.find(i => i.id === selectedId.value) || null
)

/* ------------------------------------------------------------------
   3.  Actions
   ------------------------------------------------------------------*/
function handleSelect (id)   { selectedId.value = id }
function handleCreate ()     { alert('TODO : ouvrir un modal') }
</script>

<template>
  <LayoutShell>
    <!-- 🄰 HEADER -------------------------------------------------- -->
    <template #header>
      <HeaderBar v-model="activeTab"
                 :tabs="[
                   { id:'files',   label:'Files' },
                   { id:'vectors', label:'Vector stores' }
                 ]">
        <template #title>Ingestion</template>

        <template #actions>
          <button class="btn-primary" @click="handleCreate">
            {{ activeTab === 'files' ? 'Upload' : 'Create' }}
          </button>
        </template>
      </HeaderBar>
    </template>

    <!-- 🄱 LISTE (colonne 1/3) ------------------------------------ -->
    <template #list>
      <ListPane
        :items="listItems"
        :selected-id="selectedId"
        :empty-cta-label="activeTab==='files' ? 'Upload file' : 'Create store'"
        @select="handleSelect"
        @create="handleCreate">

        <!-- Personnalisation d'un item -->
        <template #item="{ item }">
          <p class="text-sm font-medium truncate">{{ item.name }}</p>
          <p class="text-xs text-gray-400">
            {{ activeTab==='files' ? item.size : '0 KB' }}
          </p>
        </template>
      </ListPane>
    </template>

    <!-- 🄲 DÉTAIL (colonne 2/3) ----------------------------------- -->
    <template #detail>
      <DetailPane :item="selectedItem" :mode="activeTab" />
    </template>
  </LayoutShell>
</template>

<style scoped>
/* Aucun style : tout passe via les utilitaires Tailwind et tes classes .card / .btn */
</style>
