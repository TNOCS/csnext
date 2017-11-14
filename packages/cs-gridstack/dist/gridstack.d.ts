import { GridStackOptions } from './gridstackoptions';
import { Widget, Dashboard } from '@csnext/cs-core';
import { DashboardBase, cswidget } from '@csnext/cs-client';
import "./../../../node_modules/gridstack/dist/gridstack.css";
import 'jquery';
import 'lodash';
import 'gridstack/dist/gridstack.all';
import './gridstack.css';
export declare class GridStack extends DashboardBase {
    cswidget: typeof cswidget;
    mode: any;
    dashboard: Dashboard;
    gridoptions: GridStackOptions;
    readonly widgets: Widget[];
    readonly backgroundWidgets: Widget[];
    beforeMount(): void;
    created(): void;
}
