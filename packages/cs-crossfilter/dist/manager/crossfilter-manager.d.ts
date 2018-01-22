import { IDashboardManagerConfig, Dashboard, IDashboardManager } from "@csnext/cs-core";
import { CrossOptions, ChartOptions } from './../';
export declare class CrossFilterManager implements IDashboardManagerConfig, IDashboardManager {
    getInstance: () => CrossFilterManager;
    id: string;
    name: string;
    dashboard: Dashboard;
    ndx: any;
    data: any[];
    options: CrossOptions;
    start(dashboard: Dashboard): void;
    stop(dashboard: Dashboard): void;
    AddChart(chart: ChartOptions): void;
    InitChart(c: ChartOptions): void;
    initCharts(): void;
    parseData(): void;
    dataLoaded(d: any[]): void;
}
