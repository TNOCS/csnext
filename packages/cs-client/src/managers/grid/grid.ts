import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger, cswidget, AppState } from './../../index';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

import './grid.css';
@Component(<any>{
    template: require('./grid.html'),
    props: {
        dashboard: null
    }
})
export class Grid extends Vue {
    dashboard: Dashboard;
}

AppState.Instance.projectManager.dashboardManager.add((<IManagerConfig>{ id: 'grid', name: 'grid page', component: Grid }));