<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useIngestionStore } from '@/stores/useIngestionStore'
const store = useIngestionStore()

const props = defineProps({
  open: { type: Boolean, default: false },
  // si présent => ajout de fichiers à cette série, sinon => création nouvelle série
  seriesContext: { type: String, default: '' },
})
const emit = defineEmits(['close'])

const seriesName = ref('')
const files = ref([]) // FileList ou Array<File>
const dzActive = ref(false) // état visuel du dropzone

function close() {
  emit('close')
}

watch(
  () => props.open,
  (v) => {
    if (v) {
      seriesName.value = props.seriesContext || ''
      files.value = []
      // empêcher le scroll de fond
      document.documentElement.classList.add('overflow-hidden')
    } else {
      document.documentElement.classList.remove('overflow-hidden')
    }
  },
)

function onBrowse(e) {
  files.value = e.target.files
}

function onDragOver(e) {
  e.preventDefault()
  dzActive.value = true
}
function onDragLeave(e) {
  e.preventDefault()
  dzActive.value = false
}
function onDrop(e) {
  e.preventDefault()
  dzActive.value = false
  files.value = e.dataTransfer?.files || []
}

async function handleSubmit() {
  const series = seriesName.value?.trim() || undefined // undefined => nouvelle série côté back
  await store.upload({ series, files: files.value })
  close()
}

function onEscape(e) {
  if (e.key === 'Escape' && props.open) close()
}
onMounted(() => window.addEventListener('keydown', onEscape))
onBeforeUnmount(() => window.removeEventListener('keydown', onEscape))
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 grid place-items-center">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-black/60"></div>

        <!-- Modal centré, totalement opaque -->
        <div
          role="dialog"
          aria-modal="true"
          class="relative w-[92vw] max-w-xl rounded-xl border border-gray-500 bg-gray-900 shadow-2xl"
        >
          <!-- Header -->
          <div class="flex items-center justify-between px-5 py-4 border-b border-gray-700">
            <h3 class="text-lg font-semibold">
              {{ seriesContext ? 'Ajouter des fichiers' : 'Nouvelle série' }}
            </h3>
            <button class="text-gray-400 hover:text-white" @click="close" aria-label="Fermer">
              ✕
            </button>
          </div>

          <!-- Body -->
          <div class="px-5 py-4 space-y-4">
            <!-- Série -->
            <div class="space-y-1">
              <label class="text-sm text-gray-400">Série</label>
              <input
                v-model="seriesName"
                :readonly="!!seriesContext"
                class="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2"
                :placeholder="seriesContext ? seriesContext : 'ex. v2025-06-06-01'"
              />
              <p v-if="!seriesContext" class="text-xs text-gray-500">
                Laissez vide pour laisser le backend nommer automatiquement la série.
              </p>
            </div>

            <!-- Dropzone -->
            <div class="space-y-2">
              <label class="text-sm text-gray-400">Fichiers</label>

              <label
                for="fileInput"
                class="block w-full h-36 rounded-lg border-2 border-dashed flex items-center justify-center text-center cursor-pointer select-none transition bg-gray-900"
                :class="
                  dzActive ? 'border-blue-400 bg-gray-800' : 'border-gray-600 hover:border-gray-500'
                "
                @dragover="onDragOver"
                @dragleave="onDragLeave"
                @drop="onDrop"
              >
                <div class="px-6">
                  <div class="text-sm">
                    <strong class="underline">Cliquez pour choisir</strong>
                    <span class="text-gray-400"> ou déposez vos fichiers ici</span>
                  </div>
                  <div v-if="files?.length" class="text-xs text-gray-400 mt-2">
                    {{ files.length }} fichier(s) sélectionné(s)
                  </div>
                </div>
              </label>
              <input id="fileInput" type="file" multiple class="hidden" @change="onBrowse" />

              <!-- Liste courte des fichiers -->
              <ul
                v-if="files?.length"
                class="max-h-28 overflow-auto text-sm bg-gray-800/60 rounded border border-gray-700 px-3 py-2 space-y-1"
              >
                <li v-for="f in Array.from(files)" :key="f.name" class="truncate text-gray-300">
                  {{ f.name }}
                  <span class="text-gray-500 text-xs"
                    >({{ (f.size / 1024 / 1024).toFixed(2) }} MB)</span
                  >
                </li>
              </ul>
            </div>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-end gap-2 px-5 py-4 border-t border-gray-700">
            <button
              class="btn rounded p-1 px-4 outline bg-slate-800 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-red-400 cursor-pointer"
              @click="close"
            >
              Annuler
            </button>
            <button
              class="btn rounded p-1 px-4 outline bg-slate-600 shadow-none -outline-offset-1 dark:outline-white/10 hover:bg-gray-700 hover:text-blue-400 cursor-pointer"
              :disabled="!(files && files.length)"
              @click="handleSubmit"
            >
              Uploader
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Transition douce pour le modal */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
