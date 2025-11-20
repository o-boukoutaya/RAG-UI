<template>
  <ol class="relative border-s border-white/10 ms-4">
    <li v-for="(s,i) in steps" :key="i" class="mb-6 ms-4">
      <span class="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full"
            :class="s.done ? 'bg-green-500' : s.active ? 'bg-yellow-400' : 'bg-white/30'"></span>
      <h3 class="text-sm font-medium">{{ s.name }}</h3>
      <p class="text-xs text-white/60">
        {{ s.done ? `✓ ${s.ms} ms` : s.active ? 'en cours…' : 'en attente' }}
      </p>
    </li>
  </ol>
</template>
<script setup>
defineProps({ steps: { type: Array, default: () => [] }});
</script>
