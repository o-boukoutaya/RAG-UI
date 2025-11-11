<script setup>
import { computed, onMounted, ref, watchEffect } from 'vue'

const props = defineProps({
  tabs: { type: Array, required: true }, // [{ id:'files', label:'Files' }, { id:'vectors', label:'Vector stores' }]
  modelValue: { type: String, required: true },
})
const emit = defineEmits(['update:modelValue'])

const activeIdx = computed(() => props.tabs.findIndex((t) => t.id === props.modelValue))
const container = ref(null)
const indicatorStyle = ref({ transform: 'translateX(0)', width: '0px' })

function syncIndicator() {
  if (!container.value) return
  const buttons = Array.from(container.value.querySelectorAll('button[data-tab]'))
  const el = buttons[activeIdx.value]
  if (!el) return
  const { offsetLeft, offsetWidth } = el
  indicatorStyle.value = { transform: `translateX(${offsetLeft}px)`, width: `${offsetWidth}px` }
}
onMounted(() => {
  syncIndicator()
})
watchEffect(() => {
  syncIndicator()
})
</script>

<template>
  <header class="flex items-center gap-4">
    <h1 class="text-xl font-semibold"><slot name="title">Ingestion</slot></h1>

    <div ref="container" class="relative flex bg-gray-800 rounded-lg p-1 select-none">
      <!-- sliding pill -->
      <div
        class="absolute top-1 bottom-1 rounded-md bg-gray-700 transition-all"
        :style="indicatorStyle"
      />
      <div class="relative flex">
        <button
          v-for="t in tabs"
          :key="t.id"
          :data-tab="t.id"
          class="px-3 py-1.5 rounded-md text-sm z-10"
          :class="t.id === modelValue ? 'text-white font-medium' : 'text-gray-400 hover:text-white'"
          @click="emit('update:modelValue', t.id)"
        >
          {{ t.label }}
        </button>
      </div>
    </div>

    <div class="ml-auto flex items-center gap-2">
      <slot name="actions" />
    </div>
  </header>
</template>
