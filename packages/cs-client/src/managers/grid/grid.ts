import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { DashboardBase } from './../dashboardbase';
import { Logger, cswidget, AppState } from './../../index';
import Component from 'vue-class-component';

// import './home.scss';
@Component(<any>{
    template: require('./grid.html')   
})
export class Grid extends DashboardBase {


    public cswidget: any;
    public mode: any;

    created() {
        this.created();
        this.cswidget = cswidget;
        this.L.info('grid manager', 'init');
        // if (!this.$route.meta || !this.$route.meta.widgets) return;
        // this.dashboard = this.$route.meta;

    }

}

AppState.Instance.AddDashboardManager(<IManagerConfig>{ id: 'grid', name: 'grid page', component: Grid });