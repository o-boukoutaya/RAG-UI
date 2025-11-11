// src/lib/http.js
const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

function buildUrl(path, params) {
  const url = new URL(`${BASE}${path}`, BASE.startsWith('http') ? undefined : window.location.origin);
  if (params) Object.entries(params).forEach(([k,v]) => (v ?? v===0) && url.searchParams.set(k, String(v)));
  return url.toString();
}

async function request(path, { method='GET', params, body, headers } = {}) {
  const init = { method, headers: { Accept: 'application/json', ...(headers||{}) } };
  if (body instanceof FormData) {
    init.body = body; // boundary géré par le navigateur
  } else if (body !== undefined) {
    init.headers['Content-Type'] = 'application/json';
    init.body = JSON.stringify(body);
  }
  const res = await fetch(buildUrl(path, params), init);
  const ct = res.headers.get('content-type') || '';
  const data = ct.includes('application/json') ? await res.json() : await res.text();
  if (!res.ok) {
    const err = new Error(`HTTP ${res.status}`);
    err.status = res.status; err.data = data;
    throw err;
  }
  return data;
}

export const http = {
  get:  (p, o)        => request(p, { ...o, method:'GET' }),
  post: (p, body, o)  => request(p, { ...o, method:'POST', body }),
};
