<script setup>
import { ref, computed, onMounted } from 'vue'

/* Props / Emits */
const props = defineProps({
  tabs:       { type: Array,  required: true },   // [{ id:'files', label:'Files' }, …]
  modelValue: { type: String, required: true }    // id actif
})
const emit = defineEmits(['update:modelValue'])

/* Index actif pour déplacer la pastille */
const activeIdx = computed(() =>
  props.tabs.findIndex(t => t.id === props.modelValue)
)

/* Largeur d’un bouton (troisième ligne = measurement) */
const pillWidth = ref(0)
const container = ref()

onMounted(() => {
  const firstBtn = container.value?.querySelector('button')
  pillWidth.value = firstBtn ? firstBtn.getBoundingClientRect().width : 0
})
</script>

<template>
  <header class="flex items-center h-10 px-4 bg-layer border-b border-grey-200 dark:border-gray-700 pb-3">
    <!-- Titre (slot optionnel) -->
    <!-- <slot name="title">
      <span class="text-sm font-medium">—</span>
    </slot> -->

    <!-- ONGLET SLIDER : Background-black and border-radius -->
     <div ref='container' class="relative inline-flex bg-black rounded-md p-0.5">
      <!-- pastille -->
      <span class="absolute top-0 left-0 h-6 bg-green-500 rounded-md m-1
                  transition-transform duration-300 ease-in-out"
            :style="{
              width: pillWidth + 'px',
              transform: `translateX(${activeIdx * pillWidth}px)`
            }" />
      <!-- pastille -->

      <!-- boutons -->
      <button v-for="t in props.tabs" :key="t.id"
              class="relative z-10 px-4 py-1.5 text-xs font-medium rounded-full
                     transition-colors duration-150"
              :class="t.id===props.modelValue
                        ? 'text-white font-bold'
                        : 'text-gray-400 hover:text-white font-thin'"
              @click="emit('update:modelValue', t.id)">
        {{ t.label }}
      </button>
    </div>

    <!-- Actions facultatives -->
    <div class="ml-auto flex gap-2">
      <slot name="actions"/>
    </div>
  </header>
</template>
