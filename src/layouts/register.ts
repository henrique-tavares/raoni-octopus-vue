import type { App } from 'vue';
import type { ModuleNamespace } from 'vite/types/hot';

export function registerLayouts(app: App<Element>) {
  const layouts = import.meta.glob<true, string, ModuleNamespace>('./*.vue', {
    eager: true
  });

  Object.entries(layouts).forEach(([, layout]) => {
    app.component(layout?.default?.name, layout?.default);
  });
}
