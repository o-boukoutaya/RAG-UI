import { defineStore } from 'pinia';
import { API } from '@/api';

export const useSearchStore = defineStore('search', {
  state: () => ({ mode: 'hybrid', k: 6, hits: [], loading: false, error: null }),
  actions: {
    async run(query, series) {
      this.loading = true; this.error = null;
      try {
        const res = await API.retriever.search({ query, mode: this.mode, k: this.k, series });
        this.hits = res.hits || [];
        return res;
      } catch (e) { this.error = e; }
      finally { this.loading = false; }
    }
  }
});
