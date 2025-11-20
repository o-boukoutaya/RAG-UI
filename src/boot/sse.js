// src/boot/sse.js
import { useStatusStore } from "@/stores/status";
import { useNetStore } from "@/stores/net";
import { useNotifyStore } from "@/stores/notify";

let es = null;
export function startSSE() {
  const status = useStatusStore();
  const net = useNetStore();
  const notify = useNotifyStore();
  const base = import.meta.env.VITE_API_URL || "http://localhost:8050";
  const stream = import.meta.env.VITE_API_STREAM || "api/dev/logs/stream";

  if (es) es.close();
  es = new EventSource(`${base}/${stream}`);
  es.onopen = () => status.setConnected(true);
  es.onerror = () => status.setConnected(false);
  // es.onmessage = (e) => onMessage?.(e);
  // es.onerror = (e) => { onError?.(e); es?.close(); timer = setTimeout(connect, 2000); };

  es.addEventListener("status", (e) => {
    const snap = JSON.parse(e.data);
    const prev = status.snapshot?.phase;
    status.setSnapshot(snap);
    if (prev && prev !== snap.phase) {
      // petits toasts utiles
      if (snap.phase === "STARTING") notify.info("Backend : démarrage…");
      if (snap.phase === "RUNNING")  notify.success("Backend prêt");
      if (snap.phase === "DEGRADED") notify.warn("Backend dégradé (Neo4j)");
      if (snap.phase === "ERROR")    notify.error("Backend en erreur");
    }
  });

  es.addEventListener("log", (e) => {
    const data = JSON.parse(e.data);
    net.addLog(data.message);
    notify.info(data);
  });

  es.addEventListener("step", (e) => {
    // utilisé en C) pour la timeline
    window.dispatchEvent(new CustomEvent("graphrag-step", { detail: JSON.parse(e.data) }));
    notify.info(`Step: ${e.data}`);
  });

  es.addEventListener("ping", () => status.setConnected(true));
  // notify.info("test message from sse.js");
}

export function stopSSE() { if (es) es.close(); es = null; }
