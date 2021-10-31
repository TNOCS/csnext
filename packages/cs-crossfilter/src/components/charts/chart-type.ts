import { IWidget } from "@csnext/cs-core";
import crossfilter from 'crossfilter2';
import { ChartOptions, CrossDashboardManager } from '../..';
import { GraphCrossFilter } from '../../../cross-filter';

export interface IChartType {
    id: string;
    title: string;

    verify(widget: IWidget, option: ChartOptions): boolean;

    getFilters(options: ChartOptions): any[][] | undefined;

    draw(state : CrossDashboardManager, element: HTMLElement, widget: IWidget, option: ChartOptions, filter: GraphCrossFilter) : boolean;
}
