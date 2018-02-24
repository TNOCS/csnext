// services
import { AppState } from './services/app-state';

// utils
export { guidGenerator, idGenerator} from './utils/guid';

// services
export * from './services/app-state';
export * from './services/logger';
export * from './services/project-manager';
export * from './services/datasource-manager';
export * from './services/dashboard-manager';
export * from './services/layout-manager';

// layout managers
export * from './layout/single/single';
export * from './layout/grid/grid';

// datasources
export * from './datasources/webrequest-datasource';
export * from './datasources/geojson-datasource-processor';

// components
import { CsApp } from './components/cs-app/cs-app';
import { CsWidget } from './components/cs-widget/cs-widget';
import { CsDashboard } from './components/cs-dashboard/cs-dashboard';
import { CsSidebar } from './components/cs-sidebar/cs-sidebar';

export * from './components/cs-app/cs-app';
export * from './components/cs-widget/cs-widget';
export * from './components/cs-dashboard/cs-dashboard';
export * from './components/cs-settings/cs-settings';

// widgets
export * from './widgets/widget-base';
export * from './widgets/md-widget';
export * from './widgets/iframe-widget';
export * from './widgets/youtube-background/youtube-background-widget';
export * from './widgets/image-widget';

export const csnext = {
  install: (Vue) => {
    const a = AppState.Instance;
    Vue.component('cs-dashboard', CsDashboard);
    Vue.component('cs-widget', CsWidget);
    Vue.component('cs-app', CsApp);
    Vue.component('cs-sidebar', CsSidebar);
  }
};
