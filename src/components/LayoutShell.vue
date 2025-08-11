<script setup>
defineSlots()
// defineSlots<{
//   header: () => any
//   list:   () => any
//   detail: () => any
// }>()
</script>

<template>
  <!-- header area -->
  <slot name="header" />

  <!-- grid 1/3 – 2/3 -->
  <div class="flex gap-4 flex-1 mt-4">
    <aside class="w-1/3 shrink-0 card scroll-y border-r border-grey-200 dark:border-gray-700">
      <slot name="list" />
    </aside>

    <section class="flex-1 card">
      <slot name="detail" />
    </section>
  </div>
</template>
