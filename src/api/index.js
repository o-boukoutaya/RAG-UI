// src/api/index.js
import { http } from '@/lib/http';

export const API = {
  health: {
    ping:      () => http.get('/health/'),
    pingDB:    () => http.get('/health/pingDB'),
    settings:  () => http.get('/health/settings'),
  },
  corpus: {
    series:    () => http.get('/corpus/series'),
    files:     (series) => http.get(`/corpus/series/${encodeURIComponent(series)}/files`),
    import:    (series, fileList) => {
      const fd = new FormData();
      if (series) fd.append('series', series);
      [...fileList].forEach(f => fd.append('files', f));
      return http.post('/corpus/import', fd);
    },
    status:    (series) => http.get(`/corpus/series/${encodeURIComponent(series)}/status`),
  },
  pipelines: {
    extract:      (series, opts={ run_async:true, mode:'auto' }) => http.post('/corpus/extract-serie', { series, ...opts }),
    chunk:        (series, opts={ run_async:true, strategy:'sentence', size:800, overlap:150 }) => http.post('/corpus/chunk', undefined, { params: { series, ...opts } }),
    embed:        (series, dimensions=1536) => http.post('/corpus/embed', { series, dimensions }),
    graphBuild:   (series, payload={}) => http.post('/corpus/kg/build', { series, ...payload }),
    step1:        (series, min_conf=0.35) => http.post('/pipelines/step1/canonicalize', { series, min_conf }),
    step2:        (series, min_conf=0.35) => http.post('/pipelines/step2/augment', { series, min_conf }),
    step3:        (series, min_conf=0.35) => http.post('/pipelines/step3/graph_store', { series, min_conf }),
    leiden:       (series, levels=3, resolution=1.2) => http.post('/pipelines/step4/leiden', { series, options:{ community:{ levels, resolution }}}),
    hierarchy:    (series, levels=3, resolution=1.2) => http.post('/pipelines/step5/hierarchy', { series, options:{ community:{ levels, resolution }}}),
  },
};
