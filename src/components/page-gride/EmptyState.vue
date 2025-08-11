<template>
  <div class="empty-state">
    <p class="text-gray-500">No data available</p>
  </div>
</template>

<script>
export default {
  name: 'EmptyState',
};
</script>

<style scoped>
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: 1rem;
}
</style>