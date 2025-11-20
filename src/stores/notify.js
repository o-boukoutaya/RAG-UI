import { defineStore } from "pinia";
export const useNotifyStore = defineStore("notify", {
  state: () => ({ items: [] }),
  actions: {
    push(kind, text){ this.items.push({ id: crypto.randomUUID(), kind, text }); setTimeout(()=> this.items.shift(), import.meta.env.VITE_NOTIFY_DURATION || 3500); },
    success(t){ this.push("success", t); }, info(t){ this.push("info", t); },
    warn(t){ this.push("warn", t); }, error(t){ this.push("error", t); }
  }
});
