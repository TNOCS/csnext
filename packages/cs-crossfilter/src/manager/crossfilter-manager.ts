import Vue from 'vue';
import { IDashboardManagerConfig, Dashboard, IDashboardManager, IWidget } from "@csnext/cs-core";
import { setInterval } from 'timers';
import { CrossChart, CrossOptions, ChartOptions } from './../';
import {  } from './crossfilter-options';
import _ from 'lodash';

declare var crossfilter;

export class CrossFilterManager implements IDashboardManagerConfig, IDashboardManager {

    getInstance = () => { return new CrossFilterManager() }

    public id = "crossfilter"
    public name: string;
    public dashboard: Dashboard;
    public ndx: any;
    public data: any[];
    public options: CrossOptions = {
        charts: [
            { title: 'year', key: 'year', type: 'row' },
            { title: 'num', key: 'num', type: 'row' }
        ]
    }

    public start(dashboard: Dashboard) {
        this.dashboard = dashboard;
        setInterval(() => {
            let id = new Date().getTime().toString();
            this.AddChart({ title: id, key: id, type: 'row' });
        }, 3000);
    }

    public stop(dashboard: Dashboard) {

    }

    public AddChart(chart: ChartOptions) {
        this.options.charts.push(chart);
        this.InitChart(chart);
    }

    public InitChart(c: ChartOptions) {
        if (this.dashboard.widgets && this.dashboard.widgets.filter(w => w.id === c.key).length === 0) {
            c._dimension = this.ndx.dimension((d: any) => { return d[c.key]; });
            c._group = c._dimension.group().reduceSum((d: any) => { return d[c.key]; });
            if (this.dashboard.widgets) {
                this.dashboard.widgets.push(<IWidget>{ id: c.key, Component: CrossChart, options: { width: 2, height: 2 } })
            };
        }
    }

    public initCharts() {
        this.options.charts.forEach(c => {
            this.InitChart(c);
        });
    }

    public parseData() {
        this.ndx = crossfilter(this.data);
    }

    public dataLoaded(d: any[]) {
        this.data = d;
        this.parseData();
        this.initCharts();
    }
}

