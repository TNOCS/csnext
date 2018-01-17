import { IWidget, Dashboard, IDashboardOptions } from '@csnext/cs-core';
import Vue from 'vue';
import "./muuri.css";
export interface IMuuriOptions extends IDashboardOptions {
}
export declare class MuuriLayout extends Vue {
    mode: any;
    dashboard: Dashboard;
    options: IMuuriOptions;
    grid: any;
    private docElem;
    items: string[];
    private uuid;
    private dragCounter;
    readonly widgets: IWidget[];
    readonly backgroundWidgets: IWidget[];
    initWidget(widget: IWidget): void;
    widgetsChanged(n: IWidget[], old: IWidget[]): void;
    beforeMount(): void;
    created(): void;
    private updateIndices();
}
