// src/stores/status.js
import { defineStore } from "pinia";

export const useStatusStore = defineStore("status", {
  state: () => ({
    connected: false,
    lastHeartbeatAt: 0,
    snapshot: null,   // BackendStatus complet renvoyé par /api/dev/status et SSE 'status'
  }),
  getters: {
    // Couleur de la lampe : 'ok' | 'warn' | 'error' | 'off'
    lamp(state) {
      if (!state.connected) return 'off';
      const s = state.snapshot;
      if (!s) return 'warn';
      if (s.phase === 'RUNNING' && s.neo4j?.connected) return 'ok';
      if (s.phase === 'STARTING' || s.phase === 'DEGRADED') return 'warn';
      if (s.phase === 'ERROR' || s.phase === 'STOPPED') return 'error';
      return 'warn';
    },
    uptimeText(state) {
      const s = state.snapshot; if (!s) return '';
      const sec = Math.floor(s.uptime_s ?? 0);
      const h = Math.floor(sec/3600), m = Math.floor((sec%3600)/60), s2 = sec%60;
      return `${h}h ${m}m ${s2}s`;
    }
  },
  actions: {
    setConnected(v) { this.connected = v; if (!v) this.snapshot = null; },
    setSnapshot(s) { this.snapshot = s; this.lastHeartbeatAt = Date.now(); },
  }
});
