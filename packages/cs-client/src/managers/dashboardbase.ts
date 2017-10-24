import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger, cswidget } from './../index';
import { Widget, Dashboard } from '@csnext/cs-core';

export class DashboardBase extends Vue {
    public app = AppState.Instance;
    protected L = Logger.Instance;
    public dashboard: Dashboard;

    public initNavBars() {
        this.L.info('dashboard', 'init navigation bars');
        this.app.sideBarComponents = [];
        if (this.dashboard.widgets) {
            this.dashboard.widgets.forEach((w: Widget) => {
                if (w.sideBar === 'left') {
                    this.app.sideBarComponents.push(w.component);
                }
            });
        }
    }

    public created() {
        this.L.info('dashboard', 'init dashboard');
        if (this.$route && this.$route.meta && this.$route.meta.widgets) {
            this.dashboard = this.$route.meta;
        } else {
            if (this.$parent.$attrs.hasOwnProperty('dashboard')) { this.dashboard = <Dashboard>(<any>this.$parent.$attrs['dashboard']); }
        }

        this.initNavBars();
    }
} 