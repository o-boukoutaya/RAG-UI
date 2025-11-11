// src/stores/net.js
import { defineStore } from 'pinia'

export const useNetStore = defineStore('net', {
  state: () => ({
    last: null, // dernière requête observée (URL, status, ms, id)
    logs: [], // derniers logs SSE (texte brut)
  }),
  actions: {
    addRequest(r) {
      this.last = r
    },
    addLog(line) {
      this.logs.push(line)
      if (this.logs.length > 200) this.logs.shift()
    },
    clearLogs() {
      this.logs = []
    },
  },
})
