// src/lib/http.js
import { httpAxios } from "@/lib/http-axios";

export const http = {
  // All types of requests here : GET, POST, PUT, DELETE, PATCH, OPTIONS, HEAD, etc.
  get: (url, cfg) => httpAxios.get(url, cfg).then(r => r.data), // role : fetch data from the server
  post: (url, data, cfg) => httpAxios.post(url, data, cfg).then(r => r.data), // role : send data to the server to create a new resource
  put: (url, data, cfg) => httpAxios.put(url, data, cfg).then(r => r.data), // role : update an existing resource on the server
  delete: (url, cfg) => httpAxios.delete(url, cfg).then(r => r.data), // role : delete a resource from the server
  patch: (url, data, cfg) => httpAxios.patch(url, data, cfg).then(r => r.data), // role : partially update a resource on the server
  options: (url, cfg) => httpAxios.options(url, cfg).then(r => r.data), // role : describe the communication options for the target resource
  head: (url, cfg) => httpAxios.head(url, cfg).then(r => r.data), // role : fetch headers for a resource without the body
};


// Try with fetch API :
// const BASE = (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');

// function buildUrl(path, params) {
//   const url = new URL(`${BASE}${path}`, BASE.startsWith('http') ? undefined : window.location.origin);
//   if (params) Object.entries(params).forEach(([k,v]) => (v ?? v===0) && url.searchParams.set(k, String(v)));
//   return url.toString();
// }

// async function request(path, { method='GET', params, body, headers } = {}) {
//   const init = { method, headers: { Accept: 'application/json', ...(headers||{}) } };
//   if (body instanceof FormData) {
//     init.body = body; // boundary géré par le navigateur
//   } else if (body !== undefined) {
//     init.headers['Content-Type'] = 'application/json';
//     init.body = JSON.stringify(body);
//   }
//   const res = await fetch(buildUrl(path, params), init);
//   const ct = res.headers.get('content-type') || '';
//   const data = ct.includes('application/json') ? await res.json() : await res.text();
//   if (!res.ok) {
//     const err = new Error(`HTTP ${res.status}`);
//     err.status = res.status; err.data = data;
//     throw err;
//   }
//   return data;
// }

// export const http = {
//   get:  (p, o)        => request(p, { ...o, method:'GET' }),
//   post: (p, body, o)  => request(p, { ...o, method:'POST', body }),
// };


