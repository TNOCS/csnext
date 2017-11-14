import { GridStackOptions } from './gridstackoptions';
import { Widget, Dashboard, IManagerConfig } from '@csnext/cs-core';
import Vue from 'vue';
import { WidgetBase, DashboardBase, Logger, cswidget, AppState } from '@csnext/cs-client';
import Component from 'vue-class-component';
import * as $ from 'jquery';
import { gridstack } from 'gridstack';

import "./../../../node_modules/gridstack/dist/gridstack.css";
import * as _ from 'lodash';
import 'jquery';
import 'lodash';
import 'gridstack/dist/gridstack.all';
import './gridstack.css';

@Component({
    template: require('./gridstack.html')
})
export class GridStack extends DashboardBase {

    public cswidget = cswidget;
    public mode: any;
    public dashboard: Dashboard;
    public gridoptions: GridStackOptions;    

    get widgets() {
        debugger;
        return this.dashboard.widgets.filter(w => { return !w.options.background; });
    }

    get backgroundWidgets() {
        debugger;
        return this.dashboard.widgets.filter(w => { return w.options.background; });
    }

    beforeMount() {
        this.gridoptions = <GridStackOptions>this.dashboard.options;
        if (this.gridoptions.autoposition === undefined) { this.gridoptions.autoposition = false }        
    }

    created() {
        this.created();
        if (!this.dashboard) { return; }


        Vue.nextTick(() => {
            if (!this.dashboard.options) {
                this.gridoptions = {};
            }

            var options = {
                cellHeight: this.gridoptions.cellHeight | 20,
                verticalMargin: this.gridoptions.verticalMargin | 10,
                width: this.gridoptions.width | 12,
                disableDrag: this.gridoptions.disableDrag || false,
                disableResize: this.gridoptions.disableResize || false,
                height: this.gridoptions.height | 0,
                float: this.gridoptions.float || false,
                staticGrid: this.gridoptions.staticGrid || false,
                resizable: this.gridoptions.resizable || { handles: 'e, se, s, sw, w' }
            };
            let gs = $('#gridstack');
            gs.gridstack(options);
            gs.on('change', (event, items) => {
                items.forEach(i => {
                    if (i.id) {
                        this.gridoptions.autoposition = false;
                        let widget = this.dashboard.widgets.find(k => k.id === i.id);
                        if (widget) {
                            widget.options.width = i.width;
                            widget.options.height = i.height;
                            widget.options.x = i.x;
                            widget.options.y = i.y;
                        }
                    }
                })
                console.log(event);
                console.log(items);
            })


            this.dashboard.widgets.forEach((w: Widget) => {
                console.log(w.id);
            });

        });


        // if (!this.$route.meta || !this.$route.meta.widgets) return;
        // this.dashboard = this.$route.meta;

    }

}

