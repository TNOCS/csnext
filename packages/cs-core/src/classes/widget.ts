import { Dashboard } from "../index";

export enum WidgetType {
    component,
    html
}


export interface WidgetOptions {
    card?: boolean;
    class?: string;
    width?: number;
    height?: number;
    x?: number;
    y?: number;
    background?: boolean;
}

export interface Widget {
    id?: string;
    title?: string;
    type?: WidgetType;
    reference?: string;
    component?: any;
    data?: any;
    options?: WidgetOptions;
    _dashboard?: Dashboard;

}