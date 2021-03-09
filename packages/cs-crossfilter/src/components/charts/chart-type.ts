import { IWidget } from "@csnext/cs-core";
import { ChartOptions, CrossDashboardManager } from '../..';

export interface IChartType {
    id: string;
    title: string;

    verify(widget: IWidget, option: ChartOptions): boolean;

    getFilters(options: ChartOptions): any[][] | undefined;

    draw(state : CrossDashboardManager, element: HTMLElement, widget: IWidget, option: ChartOptions) : boolean;
}
