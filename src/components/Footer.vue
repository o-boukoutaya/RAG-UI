<template>
  <footer
    class="w-full py-3 px-8 flex items-center justify-between bg-gray-800 text-gray-400 border-t border-gray-700"
  >
    <span>État général :</span>
    <StatusLamp :state="lamp"/>
    <slot />
  </footer>
</template>

<script setup>
// Pas d’état pour l’instant : placeholder WebSocket/REST
  import { computed } from "vue";
  import { useStatusStore } from "@/stores/status";
  import StatusLamp from "@/components/common/StatusLamp.vue";
  const status = useStatusStore();
  const lamp = computed(() => status.lamp);
</script>
