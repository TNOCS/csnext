// services
import { AppState } from './services/appstate';

// utils
export * from './utils/guid';

// services
export * from './services/appstate';
export * from './services/logger';
export * from './services/notification';
export * from './services/project-manager';
export * from './services/datasource-manager';
export * from './services/dashboard-manager';

// managers
export * from './managers/single/single';
export { Tiles} from './managers/tiles/tiles';
export { TileDashboardOptions } from './managers/tiles/tiledashboardoptions';
export * from './managers/grid/grid';

// datasources
export * from './datasources/webrequestdatasource';

// components
import { csapp } from './components/csapp/csapp';
import { cswidget } from './components/cswidget/cswidget';
import { csdashboard } from './components/csdashboard/csdashboard';

export * from './components/csapp/csapp'
export * from './components/cswidget/cswidget';
export * from './components/csdashboard/csdashboard';
export * from './components/cssettings/cssettings';

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
            a.Init();
            Vue.component('csdashboard', csdashboard);
            Vue.component('cswidget', cswidget);
            Vue.component('csapp', csapp);

            console.log('install csnext');

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
