import { INotification } from './services/notification';
// services
import { AppState } from './services/app-state';

// utils
export * from './utils/guid';

// services
export * from './services/app-state';
export * from './services/logger';
export { INotification } from './services/notification';
export * from './services/project-manager';
export * from './services/datasource-manager';
export * from './services/dashboard-manager';
export * from './services/layout-manager';

// layout managers
export * from './layout/single/single';
export { Tiles } from './layout/tiles/tiles';
export { ITileDashboardOptions } from './layout/tiles/tiledashboardoptions';
export * from './layout/grid/grid';

// datasources
export * from './datasources/webrequest-datasource';
export * from './datasources/geojson-datasource-processor';

// components
import { CsApp } from './components/cs-app/cs-app';
import { CsWidget } from './components/cs-widget/cs-widget';
import { CsDashboard } from './components/cs-dashboard/cs-dashboard';

export * from './components/cs-app/cs-app';
export * from './components/cs-widget/cs-widget';
export * from './components/cs-dashboard/cs-dashboard';
export * from './components/cs-settings/cs-settings';

// widgets
export * from './widgets/widgetbase';
export * from './widgets/mdwidget';
export * from './widgets/iframewidget';
export * from './widgets/youtubebackgroundwidget';
export * from './widgets/imagewidget';

// export default {
//     install(Vue) {
//         console.log('install csnext');
//     }
// }

// console.log('csclient');

export const csnext = {
  install: (Vue) => {
    const a = AppState.Instance;
    // a.init();
    Vue.component('cs-dashboard', CsDashboard);
    Vue.component('cs-widget', CsWidget);
    Vue.component('cs-app', CsApp);

    // console.log('install csnext');

    // this.g = {};

    // var $notify = function (group, text, type, time) { if (self.g[group]) self.g[group](text, type, time); };

    // Object.defineProperty(Vue.prototype, '$notify', { get: function () { return $notify; } });
  }
};

// Vue.use(csnext);

// //auto install
// if (typeof window !== 'undefined' && window.Vue) {
//     // window.Vue.use(Formly);
//     // //expose formly functions if auto installed
//     // window.Vue.$formly = { getTypes, addType, addValidationMessage };
// }
