<script setup>
import { useNotifyStore } from "@/stores/notify";
import { Check, Info, TriangleAlert, CircleX } from 'lucide-vue-next'
const notify = useNotifyStore();
const cls = {
  success: "bg-green-600 text-white", info: "bg-blue-600 text-white",
  warn: "bg-yellow-500 text-black",    error: "bg-red-600 text-white",
};
const icon = {
  success: Check, info: Info, warn: TriangleAlert, error: CircleX
};
</script>
<template>
  <div class="fixed top-4 right-4 space-y-2 z-50 w-80 animate-fade-ease-in-out">
    <div v-for="t in notify.items" :key="t.id"
         class="px-3 py-2 rounded shadow text-sm"
         :class="cls[t.kind]">
          <component :is="icon[t.kind]" class="w-4 h-4" />
          {{ t.text }}</div>
  </div>
</template>
