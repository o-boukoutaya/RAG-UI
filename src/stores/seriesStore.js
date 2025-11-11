import { defineStore } from 'pinia';
import { API } from '@/api';

export const useSeriesStore = defineStore('series', {
  state: () => ({ all: [], loading: false, error: null, selected: null }),
  actions: {
    async refresh() {
      this.loading = true; this.error = null;
      try { this.all = (await API.corpus.series()).series || []; }
      catch (e) { this.error = e; }
      finally { this.loading = false; }
    },
    select(seriesId) { this.selected = seriesId; }
  }
});
