<template>
  <div class="rounded border bg-white/5 p-4">
    <div class="text-sm text-white/70">{{ title }}</div>
    <div class="text-2xl font-semibold">{{ value }}</div>
    <div v-if="subtitle" class="text-xs text-white/50 mt-1">{{ subtitle }}</div>
  </div>
</template>
<script setup>
defineProps({ title: String, value: [String,Number], subtitle: String });
</script>
