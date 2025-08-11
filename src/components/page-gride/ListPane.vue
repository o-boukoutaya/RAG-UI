<script setup>
import EmptyState from '@/components/page-gride/EmptyState.vue'
components:{ EmptyState }

/* Ajout d’une valeur par défaut pour éviter undefined.length */
const props = defineProps({
  items:          { type: Array, default: () => [] },
  selectedId:     [String, Number],
  emptyCtaLabel:  { type: String, default: 'Create' }
})
const emit = defineEmits(['select', 'create'])
</script>


<template>
  <template v-if="items.length">
    <ul>
      <li v-for="it in items" :key="it.id"
          @click="emit('select', it.id)"
          @dblclick="emit('openDetails', it.id)"
          :class="['cursor-pointer px-4 py-3 border-b border-grey-200 dark:border-gray-700 m-1 rounded-lg bg-gray-800',
                   it.id===selectedId ? 'bg-stroke/30':'hover:bg-stroke/20']">
        <slot name="item" :item="it">
          <div class="flex justify-between items-center">
            <span>{{ it.name || 'Unnamed Item' }}</span>
          </div>
        </slot>
      </li>
    </ul>
  </template>

  <EmptyState v-else :label="emptyCtaLabel" @click="emit('create')"/>
</template>
