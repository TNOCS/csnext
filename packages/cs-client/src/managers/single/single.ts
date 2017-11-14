
import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { DashboardBase } from './../dashboardbase';
import { Logger, cswidget, AppState } from './../../index';
import Component from 'vue-class-component';

// import './home.scss';
@Component(<any>{
    template: require('./single.html')
})
export class Single extends DashboardBase {

    private widget: Widget | undefined;

    public cswidget = null;

    created() {
        this.created();
        this.L.info('single manager', 'init');
        if (!this.dashboard.widgets || this.dashboard.widgets.length === 0) { return; }
        this.widget = this.dashboard.widgets.find(w => !w.hasOwnProperty('sideNav'));
        if (this.widget) { this.cswidget = this.widget.component; }
    }
}

AppState.Instance.AddDashboardManager(<IManagerConfig>{ id: 'single', name: 'single page', component: Single });
