// stores/useIngestionStore.js
import { defineStore } from 'pinia'
export const useIngestionStore = defineStore('ingestion', {
  state: () => ({
    items: [],          // liste fichiers / vector-stores
    selected: null
  }),
  actions: {
    async fetch() { /* call API */ },
    select(id) { this.selected = id }
  }
})
