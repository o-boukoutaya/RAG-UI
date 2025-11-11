// src/lib/http-axios.js
import axios from 'axios'
import { useNetStore } from '@/stores/net'

export const httpAxios = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
  timeout: 30000,
})

// Intercepteur requête : ID + horodatage
httpAxios.interceptors.request.use((config) => {
  config.metadata = { t0: performance.now() }
  // Ajoute un X-Request-Id pour corrélation (si votre back ne le génère pas déjà)
  if (!config.headers) config.headers = {}
  if (!config.headers['X-Request-Id']) {
    config.headers['X-Request-Id'] = crypto.randomUUID()
  }
  return config
})

// Intercepteur réponse : latence + mise à jour store
httpAxios.interceptors.response.use(
  (resp) => {
    const ms = performance.now() - (resp.config.metadata?.t0 ?? performance.now())
    const net = useNetStore()
    net.addRequest({
      url: resp.config.url,
      status: resp.status,
      ms,
      id: resp.headers?.['x-request-id'] ?? resp.config.headers?.['X-Request-Id'],
    })
    return resp
  },
  (err) => {
    const cfg = err.config || {}
    const ms = performance.now() - (cfg.metadata?.t0 ?? performance.now())
    const net = useNetStore()
    net.addRequest({
      url: cfg.url,
      status: 'ERR',
      ms,
      id: err.response?.headers?.['x-request-id'] ?? cfg.headers?.['X-Request-Id'],
    })
    return Promise.reject(err)
  },
)
