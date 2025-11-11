<script setup>
import { computed } from 'vue'
import { useIngestionStore } from '@/stores/useIngestionStore'
const store = useIngestionStore()

const props = defineProps({
  seriesId: String,
  status: { type: Object, default: () => ({}) },
})
const canRun = computed(() => !!props.seriesId)
</script>

<template>
  <div class="p-4 space-y-4">
    <div class="flex items-center justify-between">
      <h2 class="text-lg font-semibold">Série : {{ seriesId }}</h2>
      <div class="flex gap-2">
        <button class="btn btn-primary" @click="$emit('add-files')">Add files</button>
      </div>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-3">
      <div class="card p-3">
        <div class="text-xs text-gray-400">Files</div>
        <div class="text-xl">{{ status.files?.count ?? '—' }}</div>
      </div>
      <div class="card p-3">
        <div class="text-xs text-gray-400">Chunks</div>
        <div class="text-xl">{{ status.chunks?.count ?? '—' }}</div>
      </div>
      <div class="card p-3">
        <div class="text-xs text-gray-400">Embeddings</div>
        <div class="text-xl">{{ status.embeddings?.count ?? '—' }}</div>
      </div>
      <div class="card p-3">
        <div class="text-xs text-gray-400">Graph</div>
        <div class="text-sm">
          {{ status.graph ? `${status.graph.nodes} nodes / ${status.graph.edges} edges` : '—' }}
        </div>
      </div>
      <div class="card p-3">
        <div class="text-xs text-gray-400">Communities</div>
        <div class="text-sm">
          {{
            status.communities
              ? `L${status.communities.levels} · res=${status.communities.resolution}`
              : '—'
          }}
        </div>
      </div>
      <div class="card p-3">
        <div class="text-xs text-gray-400">Reports</div>
        <div class="text-sm">{{ status.reports?.length ?? 0 }}</div>
      </div>
    </div>

    <div class="card p-4 space-y-2">
      <div class="text-sm text-gray-400">Pipeline</div>
      <div class="flex flex-wrap gap-2">
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runExtract()">
          Extract
        </button>
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runChunk()">Chunk</button>
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runEmbed()">Embed</button>
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runGraph()">
          Build Graph
        </button>
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runLeiden()">
          Leiden
        </button>
        <button class="btn btn-primary" :disabled="!canRun" @click="store.runHierarchy()">
          Hierarchy
        </button>
      </div>
    </div>
  </div>
</template>
