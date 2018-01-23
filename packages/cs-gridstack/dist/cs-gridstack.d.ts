import { IWidget, Dashboard, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import '../../../node_modules/gridstack/dist/gridstack.css';
import 'jquery';
import 'lodash';
import 'gridstack/dist/gridstack.all';
import './cs-gridstack.css';
export interface IGridStackOptions extends IDashboardOptions {
    /** height of each cell unit */
    cellHeight?: number;
    /**  vertical gap size (default: 20). */
    verticalMargin?: number;
    /** amount of columns (default: 12) */
    width?: number;
    /** disallows dragging of widgets (default: false). */
    disableDrag?: boolean;
    /** disallows resizing of widgets (default: false). */
    disableResize?: boolean;
    /** maximum rows amount. Default is 0 which means no maximum rows */
    height?: number;
    /** enable floating widgets (default: false) */
    float?: boolean;
    autoposition?: boolean;
    /** makes grid static (default false). If true widgets are not movable/resizable. You don't even need jQueryUI draggable/resizable. A CSS class grid-stack-static is also added to the container. */
    staticGrid?: boolean;
    /** can the user resize widgets */
    resizable?: any;
}
export declare class GridStack extends Vue {
    mode: any;
    dashboard: Dashboard;
    gridoptions: IGridStackOptions;
    grid: any;
    readonly widgets: IWidget[];
    readonly backgroundWidgets: IWidget[];
    initWidget(widget: IWidget): void;
    widgetsChanged(n: IWidget[], old: IWidget[]): void;
    beforeMount(): void;
    created(): void;
}
