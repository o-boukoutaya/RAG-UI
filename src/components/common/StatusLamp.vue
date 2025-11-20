<template>
  <div class="inline-flex items-center gap-2">
    <span :class="dotClass" class="inline-block w-3 h-3 rounded-full"></span>
    <span class="text-xs">{{ label }}</span>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({ state: { type: String, default: 'off' } });

const dotClass = computed(() => ({
  'bg-gray-400 animate-pulse': props.state === 'off',
  'bg-green-500': props.state === 'ok',
  'bg-yellow-400': props.state === 'warn',
  'bg-red-500': props.state === 'error'
}));

const label = computed(() => ({
  off: 'Déconnecté',
  ok: 'OK',
  warn: 'Dégradé',
  error: 'Erreur'
}[props.state] || '…'));
</script>
