
// services
import { AppState } from './services/appstate';

export * from './services/appstate';
export * from './services/logger';

// managers
export * from './managers/single/single';
export * from './managers/dashboardbase';
export * from './managers/grid/grid';
export * from './managers/IManagerConfig';

// datasources
export * from './datasources/webrequestdatasource';

// components
import { csapp } from './components/csapp/csapp';
import { cswidget } from './components/cswidget/cswidget';
import { csdashboard } from './components/csdashboard/csdashboard';



export * from './components/csapp/csapp'
export * from './components/cswidget/cswidget';
export * from './components/csdashboard/csdashboard';

// widgets
export * from './widgets/mdwidget';
export * from './widgets/iframewidget';

// export default {
//     install(Vue) {
//         console.log('install csnext');
//     }
// }

// console.log('csclient');

export var csnext =
    {
        install: (Vue) => {
            let a = AppState.Instance;
            a.Init();
            Vue.component('csapp', csapp);
            Vue.component('csdashboard', csdashboard);
            Vue.component('cswidget', cswidget);

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



