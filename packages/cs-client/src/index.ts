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
export * from './layout/css-grid/css-grid';
export * from './layout/flex-grid/flex-grid';
export * from './layout/flex-grid/flex-size';
export * from './layout/flex-grid/flex-grid-options';

// datasources
export * from './datasources/webrequest-datasource';

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
export * from './widgets/markdown/md-widget';
export * from './widgets/markdown/md-widget-options';
export * from './widgets/iframe-widget';
export * from './widgets/youtube-background/youtube-background-widget';
export * from './widgets/image-widget';
export * from './widgets/svg-widget';
export * from './widgets/vega-widget';
export * from './widgets/intro/intro-widget';
export * from './widgets/intro/intro-widget-options';

export const csnext = {
  install: (vue) => {
    const a = AppState.Instance;
    vue.component('cs-dashboard', CsDashboard);
    vue.component('cs-widget', CsWidget);
    vue.component('cs-app', CsApp);
    vue.component('cs-sidebar', CsSidebar);
  }
};
