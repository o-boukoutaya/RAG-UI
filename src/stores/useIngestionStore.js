// stores/useIngestionStore.js
import { defineStore } from 'pinia';
import { API } from '@/api';

export const useIngestionStore = defineStore('ingestion', {
  state: () => ({
    tab: 'files',                  // 'files' | 'vectors'
    level: 'series',               // 'series' | 'items' (files ou vector stores)
    series: [],                    // [{ id, name }]
    filesBySeries: {},             // { [seriesId]: [{id,name,size,created}] }
    statusBySeries: {},            // { [seriesId]: { files, chunks, embeddings, graph, communities, reports } }
    selectedSeriesId: null,
    selectedItemId: null,          // fileId ou vsId
    busy: false,
    error: null,
  }),

  getters: {
    listItems(state) {
      if (state.level === 'series') {
        return state.series;
      }
      if (state.tab === 'files') {
        return state.filesBySeries[state.selectedSeriesId] || [];
      }
      // vectors
      const st = state.statusBySeries[state.selectedSeriesId];
      if (!st) return [];
      // A gauche on liste les “ressources VS” sous forme d’items cliquables
      const items = [];
      if (st.chunks?.count) items.push({ id:'chunks',    name:`Chunks (${st.chunks.count})` });
      if (st.embeddings?.count) items.push({ id:'embeds', name:`Embeddings (${st.embeddings.count})` });
      if (st.graph?.nodes) items.push({ id:'graph',     name:`Graph ${st.graph.nodes}N/${st.graph.edges}E` });
      if (Array.isArray(st.reports)) items.push({ id:'reports', name:`Reports (${st.reports.length})` });
      if (st.communities?.levels) items.push({ id:'communities', name:`Communities (L${st.communities.levels})` });
      return items;
    },
    selectedItem(state) {
      if (state.level === 'series') {
        return state.series.find(s => s.id === state.selectedItemId) || null;
      }
      if (state.tab === 'files') {
        return (state.filesBySeries[state.selectedSeriesId] || []).find(f => f.id === state.selectedItemId) || null;
      }
      return { id: state.selectedItemId }; // vectors
    },
    breadcrumb(state) {
      if (state.level === 'series') return [];
      return [{ label: 'Series', id: null }, { label: state.selectedSeriesId, id: state.selectedSeriesId }];
    },
  },

  actions: {
    async bootstrap() {
      await this.refreshSeries();
    },

    async refreshSeries() {
      this.error = null; this.busy = true;
      try {
        const res = await API.corpus.series();
        const list = Array.isArray(res?.series) ? res.series : res;
        this.series = list.map(s => ({ id: s, name: s }));
      } catch (e) { this.error = e; }
      finally { this.busy = false; }
    },

    async openSeries(seriesId) {
      this.selectedSeriesId = seriesId;
      this.level = 'items';
      this.selectedItemId = null;
      if (this.tab === 'files') {
        await this.refreshFiles(seriesId);
      } else {
        await this.refreshStatus(seriesId);
      }
    },

    backToSeries() {
      this.level = 'series';
      this.selectedSeriesId = null;
      this.selectedItemId = null;
    },

    async refreshFiles(seriesId) {
      this.error = null; this.busy = true;
      try {
        const data = await API.corpus.files(seriesId);
        this.filesBySeries[seriesId] = data || [];
      } catch (e) { this.error = e; }
      finally { this.busy = false; }
    },

    async refreshStatus(seriesId) {
      this.error = null; this.busy = true;
      try {
        const st = await API.corpus.status(seriesId);
        this.statusBySeries[seriesId] = st || {};
      } catch (e) { this.error = e; }
      finally { this.busy = false; }
    },

    selectItem(id)   { this.selectedItemId = id; },
    selectSeries(id) { this.selectedSeriesId = id; },

    // Upload: nouvelle série ou ajout à une série existante
    async upload({ series, files }) {
      this.error = null; this.busy = true;
      try {
        const rep = await API.corpus.import(series, files);
        // Normaliser la série renvoyée
        const seriesId = rep.series || series;
        if (!this.series.find(s => s.id === seriesId)) {
          this.series.unshift({ id: seriesId, name: seriesId });
        }
        // Rafraîchir si on est “dans” cette série
        if (this.tab === 'files') {
          await this.refreshFiles(seriesId);
        } else {
          await this.refreshStatus(seriesId);
        }
        return rep;
      } catch (e) { this.error = e; throw e; }
      finally { this.busy = false; }
    },

    // Actions pipelines déclenchées depuis SeriesDetail
    async runExtract()   { await API.pipelines.extract(this.selectedSeriesId);   await this.refreshStatus(this.selectedSeriesId); },
    async runChunk()     { await API.pipelines.chunk(this.selectedSeriesId);     await this.refreshStatus(this.selectedSeriesId); },
    async runEmbed()     { await API.pipelines.embed(this.selectedSeriesId);     await this.refreshStatus(this.selectedSeriesId); },
    async runGraph()     { await API.pipelines.graphBuild(this.selectedSeriesId);await this.refreshStatus(this.selectedSeriesId); },
    async runLeiden()    { await API.pipelines.leiden(this.selectedSeriesId);    await this.refreshStatus(this.selectedSeriesId); },
    async runHierarchy() { await API.pipelines.hierarchy(this.selectedSeriesId); await this.refreshStatus(this.selectedSeriesId); },
  }
});
