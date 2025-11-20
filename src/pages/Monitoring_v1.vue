<template>
  <div class="p-4 space-y-4">
    <h2 class="text-xl font-bold">Monitoring</h2>

    <div v-if="net.last" class="p-3 rounded border">
      <div class="font-semibold">Dernière requête</div>
      <div>URL : {{ net.last.url }}</div>
      <div>Statut : {{ net.last.status }}</div>
      <div>Durée : {{ Math.round(net.last.ms) }} ms</div>
      <div>X-Request-Id : {{ net.last.id }}</div>
    </div>

    <div class="space-y-2">
      <div class="flex items-center justify-between">
        <div class="font-semibold">Logs (SSE)</div>
        <button class="px-2 py-1 border rounded" @click="net.clearLogs()">Effacer</button>
      </div>
      <pre class="bg-black text-green-400 p-2 rounded h-[60vh] overflow-auto"
        >{{ net.logs.join('\n') }}
      </pre>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue'
import { useNetStore } from '@/stores/net'

const net = useNetStore()

let es = null
onMounted(() => {
  const base = import.meta.env.VITE_API_URL || 'http://localhost:8050'
  es = new EventSource(`${base}/api/dev/logs/stream`)
  es.onmessage = (e) => {
    try {
      const data = JSON.parse(e.data)
      net.addLog(data.message)
    } catch (err) {
      console.error('SSE parse error:', err)
    }
  }
})
onBeforeUnmount(() => {
  if (es) es.close()
})
</script>
