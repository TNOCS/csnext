// services
import { AppState } from './services/app-state';

// services
export * from './services/app-state';
export * from './services/logger';
export * from './services/datasource-manager';
export * from './services/dashboard-manager';
export * from './services/layout-manager';
export * from './services/dashboard-manager-base';

// data sources
export * from './datasources/log/log-datasource';
export * from './datasources/log/log-item';
export * from './datasources/log/log-manager';

// layout managers
export * from './layout/layout-component';
export * from './layout/single/single';
export * from './layout/grid-layout/grid-layout';
export * from './layout/css-grid/css-grid';
export * from './layout/css-grid/css-grid-templates';
export * from './layout/flex-grid/flex-grid';
export * from './layout/flex-grid/flex-size';
export * from './layout/flex-grid/flex-grid-options';
export * from './layout/tabs/tabs';
export * from './layout/mobile-flow/mobile-flow';
// export * from './layout/drag-grid/drag-layout';
// export * from './layout/drag-grid/drag-layout-options';
export * from './layout/flex-grid/flex-widget-options';

// components
import { CsApp } from './components/cs-app/cs-app';
import { CsWidget } from './components/cs-widget/cs-widget';
import { CsDashboard } from './components/cs-dashboard/cs-dashboard';
import { CsSidebar } from './components/cs-sidebar/cs-sidebar';
import Vue, { VueConstructor } from 'vue';
import { VegaWidget } from './widgets/vega/vega-widget';
import { CardWidget } from './widgets/card/card-widget';
import { HtmlWidget } from './widgets/html-widget/html-widget';

import './components/cs-label';

import '@mdi/font/css/materialdesignicons.css';

// export components
export * from './components/cs-app/cs-app';
export * from './components/cs-widget/cs-widget';
export * from './components/cs-dashboard/cs-dashboard';
export * from './components/cs-settings/cs-settings';
export * from './components/cs-language-switch/cs-language-switch';
export * from './components/cs-toolbar-menus/cs-toolbar-menus';

// widgets
export * from './widgets/widget-base';
export * from './widgets/iframe/iframe-widget';
export * from './widgets/iframe/iframe-widget-options';
export * from './widgets/youtube-background/youtube-background-widget';
export * from './widgets/image-widget';
export * from './widgets/svg-widget';
export * from './widgets/html-widget/html-widget';
export * from './widgets/vega/vega-widget';
export * from './widgets/vega/vega-widget-options';
export * from './widgets/intro/intro-widget';
export * from './widgets/intro/intro-widget-options';
export * from './widgets/card/card-widget';
export * from './widgets/card/card-widget-options';
export * from './components/cs-label';



export const CsNext = {
  install: (vue: VueConstructor): void => {
    const a = AppState.Instance;
    vue.component('cs-dashboard', CsDashboard);
    vue.component('cs-widget', CsWidget);
    vue.component('cs-app', CsApp);
    vue.component('cs-sidebar', CsSidebar);
    vue.component('cs-widget', CsWidget);
    vue.component('vega-widget', VegaWidget);
    vue.component('vega-widget', HtmlWidget);
    vue.component('card-widget', CardWidget);    
  }
};

// // tslint:disable-next-line:interface-name
// export interface Vue {
//   $cs: AppState;
// }
declare module 'vue/types/vue' {
  // tslint:disable-next-line:interface-name
  export interface Vue {
    $cs: AppState;
  }
}

declare global {
  const $cs: AppState;
}

// export type PluginFunction<T> = (Vue: typeof _Vue, options?: T) => void;
export function CsPlugin(vue: typeof Vue, options?: any): void {
  vue.prototype.$cs = AppState.Instance;
  (Window.prototype as any).$cs = AppState.Instance;
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(CsNext);
}

export default CsNext;
