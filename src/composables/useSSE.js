// src/composables/useSSE.js
export function useSSE(url, { onMessage, onEvent, onError } = {}) {
  let es = null; let timer = null;

  const connect = () => {
    const u = (import.meta.env.VITE_API_URL || "http://localhost:8050") + url;
    es = new EventSource(u);

    es.onmessage = (e) => onMessage?.(e);
    es.onerror = (e) => { onError?.(e); es?.close(); timer = setTimeout(connect, 2000); };

    // écoute d'événements nommés (status, log, ping…)
    if (onEvent) {
      ['status','log','ping'].forEach(ev => {
        es.addEventListener(ev, (e) => onEvent(ev, e));
      });
    }
  };
  const close = () => { if (timer) clearTimeout(timer); es?.close(); };

  connect();
  return { close };
}
