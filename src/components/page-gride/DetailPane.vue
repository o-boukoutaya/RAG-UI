<script setup>
const props = defineProps({ label:String })
</script>

<template>
  <div class="flex flex-col items-center justify-center text-center gap-4 h-full">
    <div class="text-gray-400">Nothing here yet</div>
    <button class="btn-primary" @click="$emit('click')">{{ label }}</button>
  </div>
</template>
