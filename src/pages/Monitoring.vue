<template>
  <div class="p-6 space-y-6">
    <h2 class="text-xl font-bold">Monitoring</h2>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
      <MetricCard title="Phase" :value="status.snapshot?.phase || '—'"/>
      <MetricCard title="Uptime" :value="uptime"/>
      <MetricCard title="Neo4j" :value="status.snapshot?.neo4j?.connected ? 'connecté' : 'déconnecté'"/>
      <MetricCard title="Boot ID" :value="(status.snapshot?.boot_id || '—').slice(0,8)"/>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <h3 class="font-semibold mb-2">Logs (SSE)</h3>
        <LogViewer :lines="net.logs"/>
      </div>
      <div>
        <h3 class="font-semibold mb-2">Timeline pipeline (démo)</h3>
        <ProgressTimeline :steps="demoSteps"/>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount, computed, ref } from "vue";
import { useNetStore } from "@/stores/net";
import { useStatusStore } from "@/stores/status";
import { useSSE } from "@/composables/useSSE";
import MetricCard from "@/components/common/MetricCard.vue";
import LogViewer from "@/components/common/LogViewer.vue";
import ProgressTimeline from "@/components/common/ProgressTimeline.vue";

const net = useNetStore();
const status = useStatusStore();
const demoSteps = ref([
  { name: 'Ingestion', active: false, done: false },
  { name: 'Embedding', active: false, done: false },
  { name: 'Indexation', active: false, done: false },
  { name: 'Graph Build', active: false, done: false },
  { name: 'Retrieval', active: false, done: false },
]);

const uptime = computed(() => status.uptimeText);

let sse;
onMounted(() => {
  sse = useSSE('/api/dev/logs/stream', {
    onEvent: (ev, e) => {
      if (ev === 'log') {
        const data = JSON.parse(e.data);
        net.addLog(data.message);
      } else if (ev === 'status') {
        const data = JSON.parse(e.data);
        status.setConnected(true); status.setSnapshot(data);
      } else if (ev === 'ping') {
        status.setConnected(true);
      }
    },
    onError: () => status.setConnected(false)
  });
});
onBeforeUnmount(() => sse?.close());
</script>
