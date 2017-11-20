import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { Logger, cswidget, AppState, TileDashboardOptions } from './../../index';
import Component from 'vue-class-component';
import { Watch, Prop } from 'vue-property-decorator';

import './tiles.css';



@Component(<any>{
    template: require('./tiles.html'),
    props: {
        dashboard: null
    }
})
export class Tiles extends Vue {
    dashboard: Dashboard;
    public get options() : TileDashboardOptions {
        return this.dashboard.options as TileDashboardOptions;
    }

    public widgetClass(widget: Widget) {
        let width = this.options.tileSize;
        let height = this.options.tileSize;
        if (widget.options) { 
            if (widget.options.width) { width = width * widget.options.width; }
            if (widget.options.height) { height = height * widget.options.height; }
        }
        return { background: 'red', width: width + 'px', float: 'left',  height: height + 'px', margin : '3px' }
    }
}

AppState.Instance.AddDashboardManager(<IManagerConfig>{ id: 'tiles', name: 'tiles page', component: Tiles });