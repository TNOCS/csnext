
import { Widget, Dashboard } from '@csnext/cs-core';
import Vue from 'vue';
import { DashboardBase } from './../dashboardbase';
import { Logger, cswidget } from './../../index';
import Component from 'vue-class-component';

// import './home.scss';
@Component(<any>{
    template: require('./single.html')
})
export class Single extends DashboardBase {

    private widget: Widget | undefined;

    public cswidget: any;

    constructor() {
        super();
        // this.cswidget = cswidget;

    }

    created() {
        this.created();
        this.L.info('single manager', 'init');

        if (!this.dashboard.widgets || this.dashboard.widgets.length === 0) { return; }

        this.widget = this.dashboard.widgets.find(w => !w.hasOwnProperty('sideNav'));
        if (this.widget) { this.cswidget = this.widget.component; }
    }


}