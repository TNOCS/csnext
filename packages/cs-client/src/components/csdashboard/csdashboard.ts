import { Watch } from 'vue-property-decorator';
import { Project, Dashboard, Widget } from '@csnext/cs-core';
import Vue from 'vue';
import Component from 'vue-class-component';
import { AppState, Logger, cswidget } from '../../index';

@Component(<any>{
    name: 'dashboard',
    template: '<component :is="component"></component>',
    props: {
        d: Dashboard
    }
})

// tslint:disable-next-line:class-name
export class csdashboard extends Vue {
    public app = AppState.Instance;

    public dashboard: Dashboard;
    public component: Vue;

    @Watch('$attrs.dashboard')
    dashboardChanged(data: any) {
        // alert('changed');
    }

    beforeMount() {     
        if (!this.app.isInitialized) { this.app.Init(); }
        if (this.$attrs.hasOwnProperty('dashboard')) { this.dashboard = <Dashboard>(<any>this.$attrs['dashboard']); }
        if (this.dashboard && this.dashboard.manager) {
            if (this.app.dashboardManagers.hasOwnProperty(this.dashboard.manager)) {
                this.component = this.app.dashboardManagers[this.dashboard.manager].component;
            }
        }
    }

}
