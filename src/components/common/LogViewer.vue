<template>
  <pre ref="el" class="bg-black text-green-400 p-2 rounded h-[60vh] overflow-auto">{{ text }}</pre>
</template>
<script setup>
  import { onUpdated, ref, computed } from "vue";
  const props = defineProps({ lines: { type: Array, default: () => [] }});
  const el = ref(null);
  const text = computed(() => props.lines.join('\n'));
  onUpdated(() => { const n = el.value; if (n) n.scrollTop = n.scrollHeight; });
</script>
